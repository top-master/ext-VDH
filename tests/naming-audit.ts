import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "vitest";

interface NamingConflict {
  identifierKind: string;
  identifierName: string;
  lineNumber: number;
  relativePath: string;
}

/** Describes one naming-conflict scan result for repository source files. */
class NamingConflictReport {
  /** Single-character naming conflicts keyed by readable source location. */
  namingConflicts: string[] = [];
}

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testDirectory, "..");

const codeFileExtensions = new Set([".d.ts", ".js", ".jsx", ".ts", ".tsx"]);
const ignoredDirectories = new Set([".git", "node_modules"]);
const ignoredFunctionNames = new Set(["catch", "for", "if", "switch", "while"]);

const singleCharacterVariablePattern = /\b(?:const|let|var)\s+([A-Za-z_$])\b/gu;
const singleCharacterLoopPattern =
  /\bfor\s*\(\s*(?:await\s+)?(?:(?:const|let|var)\s+)?([A-Za-z_$])\s*(?:=|in\b|of\b)/gu;
const singleCharacterClassPattern = /\bclass\s+([A-Za-z_$])\b/gu;
const namedSignaturePattern =
  /\b([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*(?::\s*[^=>{]+)?\s*(\{|=>)/gu;
const anonymousArrowPattern = /\(([^)]*)\)\s*(?::\s*[^=>{]+)?\s*=>/gu;
const bareArrowParameterPattern = /(^|[^\w$])([A-Za-z_$])\s*(?::\s*[^=>{]+)?=>/gu;
const catchParameterPattern = /\bcatch\s*\(\s*([A-Za-z_$])\s*\)/gu;

/** Normalizes Windows and POSIX paths into one comparable format. */
function normalizePath(filePath: string): string {
  return filePath.replace(/\\/gu, "/");
}

/** Collects repository code files recursively under one directory. */
function collectCodeFiles(directoryPath: string): string[] {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .flatMap((directoryEntry) => {
      const fullPath = path.join(directoryPath, directoryEntry.name);

      if (directoryEntry.isDirectory()) {
        return ignoredDirectories.has(directoryEntry.name) ? [] : collectCodeFiles(fullPath);
      }

      return codeFileExtensions.has(path.extname(directoryEntry.name)) ? [fullPath] : [];
    })
    .sort();
}

/** Builds a readable matcher failure block for one list of source entries. */
function formatEntries(entries: string[]): string {
  return entries.join("\n");
}

/** Formats one readable naming-conflict entry. */
function formatNamingConflict(conflict: NamingConflict): string {
  return `${conflict.relativePath}:${conflict.lineNumber}: ${conflict.identifierName} ${conflict.identifierKind}.`;
}

/** Reads one code file as source lines. */
function readSourceLines(filePath: string): string[] {
  return fs.readFileSync(filePath, "utf8").split(/\r?\n/gu);
}

/** Replaces comments and strings with whitespace while preserving line layout. */
function stripCommentsAndStrings(sourceText: string): string {
  let sanitizedText = "";
  let parsingState:
    | "block-comment"
    | "code"
    | "double-quote"
    | "line-comment"
    | "single-quote"
    | "template-string" = "code";

  for (let characterIndex = 0; characterIndex < sourceText.length; characterIndex += 1) {
    const currentCharacter = sourceText[characterIndex];
    const nextCharacter = sourceText[characterIndex + 1] || "";

    if (parsingState == "code") {
      if (currentCharacter == "/" && nextCharacter == "/") {
        sanitizedText += "  ";
        parsingState = "line-comment";
        characterIndex += 1;
        continue;
      }

      if (currentCharacter == "/" && nextCharacter == "*") {
        sanitizedText += "  ";
        parsingState = "block-comment";
        characterIndex += 1;
        continue;
      }

      if (currentCharacter == "'") {
        sanitizedText += " ";
        parsingState = "single-quote";
        continue;
      }

      if (currentCharacter == '"') {
        sanitizedText += " ";
        parsingState = "double-quote";
        continue;
      }

      if (currentCharacter == "`") {
        sanitizedText += " ";
        parsingState = "template-string";
        continue;
      }

      sanitizedText += currentCharacter;
      continue;
    }

    if (parsingState == "line-comment") {
      sanitizedText += currentCharacter == "\n" ? "\n" : " ";
      if (currentCharacter == "\n") {
        parsingState = "code";
      }
      continue;
    }

    if (parsingState == "block-comment") {
      if (currentCharacter == "*" && nextCharacter == "/") {
        sanitizedText += "  ";
        parsingState = "code";
        characterIndex += 1;
      } else {
        sanitizedText += currentCharacter == "\n" ? "\n" : " ";
      }
      continue;
    }

    if (parsingState == "single-quote") {
      if (currentCharacter == "\\") {
        sanitizedText += "  ";
        characterIndex += 1;
      } else {
        sanitizedText += currentCharacter == "\n" ? "\n" : " ";
        if (currentCharacter == "'") {
          parsingState = "code";
        }
      }
      continue;
    }

    if (parsingState == "double-quote") {
      if (currentCharacter == "\\") {
        sanitizedText += "  ";
        characterIndex += 1;
      } else {
        sanitizedText += currentCharacter == "\n" ? "\n" : " ";
        if (currentCharacter == '"') {
          parsingState = "code";
        }
      }
      continue;
    }

    if (currentCharacter == "\\") {
      sanitizedText += "  ";
      characterIndex += 1;
    } else {
      sanitizedText += currentCharacter == "\n" ? "\n" : " ";
      if (currentCharacter == "`") {
        parsingState = "code";
      }
    }
  }

  return sanitizedText;
}

/** Builds line-start offsets for one source text. */
function collectLineStarts(sourceText: string): number[] {
  const lineStarts = [0];

  for (let characterIndex = 0; characterIndex < sourceText.length; characterIndex += 1) {
    if (sourceText[characterIndex] == "\n") {
      lineStarts.push(characterIndex + 1);
    }
  }

  return lineStarts;
}

/** Resolves the one-based line number for one character offset. */
function resolveLineNumber(characterOffset: number, lineStarts: number[]): number {
  let lowIndex = 0;
  let highIndex = lineStarts.length - 1;

  while (lowIndex <= highIndex) {
    const middleIndex = Math.floor((lowIndex + highIndex) / 2);
    const lineStart = lineStarts[middleIndex];
    const nextLineStart =
      middleIndex + 1 < lineStarts.length ? lineStarts[middleIndex + 1] : Number.POSITIVE_INFINITY;

    if (characterOffset < lineStart) {
      highIndex = middleIndex - 1;
      continue;
    }

    if (characterOffset >= nextLineStart) {
      lowIndex = middleIndex + 1;
      continue;
    }

    return middleIndex + 1;
  }

  return lineStarts.length;
}

/** Adds one readable conflict entry once per file. */
function addNamingConflict(
  report: NamingConflictReport,
  seenConflicts: Set<string>,
  conflict: NamingConflict,
): void {
  const entry = formatNamingConflict(conflict);
  if (seenConflicts.has(entry)) {
    return;
  }

  seenConflicts.add(entry);
  report.namingConflicts.push(entry);
}

/** Normalizes one parameter segment into its declared identifier name. */
function extractSingleCharacterParameterName(parameterText: string): string | null {
  const normalizedParameterText = parameterText
    .trim()
    .replace(/^\.\.\./u, "")
    .split("=")[0]
    .trim()
    .split(":")[0]
    .trim();

  return /^[A-Za-z_$]$/u.test(normalizedParameterText) ? normalizedParameterText : null;
}

/** Adds single-character parameter conflicts from one comma-separated list. */
function addParameterConflicts(
  report: NamingConflictReport,
  seenConflicts: Set<string>,
  relativePath: string,
  lineNumber: number,
  parameterListText: string,
): void {
  for (const parameterText of parameterListText.split(",")) {
    const parameterName = extractSingleCharacterParameterName(parameterText);
    if (!parameterName) {
      continue;
    }

    addNamingConflict(report, seenConflicts, {
      relativePath,
      lineNumber,
      identifierName: parameterName,
      identifierKind: "parameter",
    });
  }
}

/** Scans one source text for all single-character naming conflicts. */
function scanFileNamingConflicts(
  report: NamingConflictReport,
  filePath: string,
): void {
  const relativePath = normalizePath(path.relative(repoRoot, filePath));
  const sourceLines = readSourceLines(filePath);
  const sourceText = sourceLines.join("\n");
  const sanitizedText = stripCommentsAndStrings(sourceText);
  const lineStarts = collectLineStarts(sanitizedText);
  const seenConflicts = new Set<string>();

  for (const variableMatch of sanitizedText.matchAll(singleCharacterVariablePattern)) {
    addNamingConflict(report, seenConflicts, {
      relativePath,
      lineNumber: resolveLineNumber(variableMatch.index ?? 0, lineStarts),
      identifierName: variableMatch[1],
      identifierKind: "variable",
    });
  }

  for (const loopMatch of sanitizedText.matchAll(singleCharacterLoopPattern)) {
    addNamingConflict(report, seenConflicts, {
      relativePath,
      lineNumber: resolveLineNumber(loopMatch.index ?? 0, lineStarts),
      identifierName: loopMatch[1],
      identifierKind: "variable",
    });
  }

  for (const classMatch of sanitizedText.matchAll(singleCharacterClassPattern)) {
    addNamingConflict(report, seenConflicts, {
      relativePath,
      lineNumber: resolveLineNumber(classMatch.index ?? 0, lineStarts),
      identifierName: classMatch[1],
      identifierKind: "class",
    });
  }

  for (const namedSignatureMatch of sanitizedText.matchAll(namedSignaturePattern)) {
    const functionName = namedSignatureMatch[1];
    const lineNumber = resolveLineNumber(namedSignatureMatch.index ?? 0, lineStarts);

    if (functionName.length == 1 && !ignoredFunctionNames.has(functionName)) {
      addNamingConflict(report, seenConflicts, {
        relativePath,
        lineNumber,
        identifierName: functionName,
        identifierKind: "function",
      });
    }

    addParameterConflicts(
      report,
      seenConflicts,
      relativePath,
      lineNumber,
      namedSignatureMatch[2] || "",
    );
  }

  for (const anonymousArrowMatch of sanitizedText.matchAll(anonymousArrowPattern)) {
    addParameterConflicts(
      report,
      seenConflicts,
      relativePath,
      resolveLineNumber(anonymousArrowMatch.index ?? 0, lineStarts),
      anonymousArrowMatch[1] || "",
    );
  }

  for (const bareArrowParameterMatch of sanitizedText.matchAll(bareArrowParameterPattern)) {
    addNamingConflict(report, seenConflicts, {
      relativePath,
      lineNumber: resolveLineNumber(bareArrowParameterMatch.index ?? 0, lineStarts),
      identifierName: bareArrowParameterMatch[2],
      identifierKind: "parameter",
    });
  }

  for (const catchParameterMatch of sanitizedText.matchAll(catchParameterPattern)) {
    addNamingConflict(report, seenConflicts, {
      relativePath,
      lineNumber: resolveLineNumber(catchParameterMatch.index ?? 0, lineStarts),
      identifierName: catchParameterMatch[1],
      identifierKind: "parameter",
    });
  }
}

/** Scans the repository for all single-character naming conflicts. */
function scanNamingConflicts(): NamingConflictReport {
  const report = new NamingConflictReport();

  for (const filePath of collectCodeFiles(repoRoot)) {
    scanFileNamingConflicts(report, filePath);
  }

  return report;
}

describe("naming audit", () => {
  it("contains no single-character identifiers anywhere in the repository code", () => {
    const report = scanNamingConflicts();
    const pass = report.namingConflicts.length === 0;

    if (!pass) {
      throw new Error(
        ["Naming conflict list:", "", formatEntries(report.namingConflicts)].join("\n"),
      );
    }
  });
});
