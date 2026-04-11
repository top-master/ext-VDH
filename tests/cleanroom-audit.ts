import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "vitest";

interface BlockedPattern {
  label: string;
  pattern: RegExp;
}

interface AuditFinding {
  filePath: string;
  label: string;
  lineNumber: number;
  lineText: string;
}

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testDirectory, "..");

const blockedPatterns: BlockedPattern[] = [
  {
    label: "Upstream product name",
    pattern: /Video DownloadHelper/gi,
  },
  {
    label: "Upstream short name",
    pattern: /\bVDH\b/g,
  },
  {
    label: "Upstream domain",
    pattern: /downloadhelper\.net/gi,
  },
  {
    label: "Upstream repository",
    pattern: /aclap-dev\/video-downloadhelper/gi,
  },
  {
    label: "Chrome store identifier",
    pattern: /lmjnegcaeklhafolokijcfjliaokphfk/gi,
  },
  {
    label: "Edge store identifier",
    pattern: /jmkaglaafmhbcpleggkmaliipiilhldn/gi,
  },
  {
    label: "Upstream native host",
    pattern: /net\.downloadhelper\.coapp/gi,
  },
  {
    label: "Upstream author",
    pattern: /Michel Gutierrez/gi,
  },
];

const textFileExtensions = new Set([
  ".css",
  ".d.ts",
  ".html",
  ".js",
  ".json",
  ".md",
  ".ts",
]);

const ignoredDirectories = new Set([".git", "node_modules"]);

const ignoredRelativePaths = new Set([
  "CLEANROOM_STATUS.md",
  "README.md",
  path.join("tests", "cleanroom-audit.ts"),
  path.join("vitest.config.ts"),
  path.join("package.json"),
  path.join("tsconfig.json"),
  path.join(".yarnrc.yml"),
  path.join(".gitignore"),
]);

function collectTextFiles(directoryPath: string): string[] {
  const collectedFiles: string[] = [];

  for (const directoryEntry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    if (ignoredDirectories.has(directoryEntry.name)) {
      continue;
    }

    const fullPath = path.join(directoryPath, directoryEntry.name);
    if (directoryEntry.isDirectory()) {
      collectedFiles.push(...collectTextFiles(fullPath));
      continue;
    }

    if (textFileExtensions.has(path.extname(directoryEntry.name))) {
      const relativePath = path.relative(repoRoot, fullPath);
      if (!ignoredRelativePaths.has(relativePath)) {
        collectedFiles.push(fullPath);
      }
    }
  }

  return collectedFiles;
}

function readLines(filePath: string): string[] {
  return fs.readFileSync(filePath, "utf8").split(/\r?\n/u);
}

function findBlockedMatches(filePath: string, lines: string[]): AuditFinding[] {
  const findings: AuditFinding[] = [];

  lines.forEach((lineText, lineIndex) => {
    for (const blockedPattern of blockedPatterns) {
      blockedPattern.pattern.lastIndex = 0;
      if (blockedPattern.pattern.test(lineText)) {
        findings.push({
          filePath,
          label: blockedPattern.label,
          lineNumber: lineIndex + 1,
          lineText: lineText.trim(),
        });
      }
    }
  });

  return findings;
}

function runCleanRoomAudit(rootDirectoryPath: string): AuditFinding[] {
  return collectTextFiles(rootDirectoryPath).flatMap((filePath) =>
    findBlockedMatches(filePath, readLines(filePath)),
  );
}

function formatFindings(findings: AuditFinding[]): string {
  return findings
    .map((finding) => {
      const relativePath = path.relative(repoRoot, finding.filePath);
      return `${relativePath}:${finding.lineNumber} [${finding.label}] ${finding.lineText}`;
    })
    .join("\n");
}

describe("clean-room audit", () => {
  it("contains no blocked upstream fingerprints", () => {
    const findings = runCleanRoomAudit(repoRoot);

    if (findings.length > 0) {
      throw new Error(
        [
          "Clean-room audit failed. Blocked upstream fingerprints remain:",
          "",
          formatFindings(findings),
        ].join("\n"),
      );
    }
  });
});
