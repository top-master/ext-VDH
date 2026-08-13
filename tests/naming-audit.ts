import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, it } from 'vitest';

interface NamingConflict {
  identifierKind: string;
  identifierName: string;
  lineNumber: number;
  relativePath: string;
}

/** Describes one naming-conflict scan result for repository source files. */
class NamingConflictReport {
  /** Too-short identifier bindings keyed by readable source location. */
  namingConflicts: string[] = [];
}

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testDirectory, '..');

const codeFileExtensions = new Set(['.d.ts', '.js', '.jsx', '.ts', '.tsx']);
const ignoredDirectories = new Set([
  '.git',
  'node_modules',
  'todo',
  'vendor',
  '3rd-party',
]);
// Standalone, unreferenced files that ship nothing and are exempt from the
// naming rule. tests/main.js is an older formatted main.js variant kept by the
// repo owner; the extension loads background/main.js, not this copy.
// content/content-libs.js is a GENERATED esbuild bundle (source is content/src/,
// which this audit still scans) - its output carries esbuild's own short-named
// runtime helpers (cb/e/to), so the generated artifact itself is exempt.
const ignoredRelativePaths = new Set([
  'tests/main.js',
  'content/content-libs.js',
]);

// Directories holding VERBATIM vendored third-party sources. content/src/weh is a
// byte-for-byte copy of the upstream weh framework (see content/src/weh/README.md);
// its names are upstream's, not ours to rename, so the whole tree is exempt.
const ignoredRelativePrefixes = ['content/src/weh/', 'content/src/tooltip/'];

// A name of one or two characters is always too short. A three-character name
// is reported unless it is a real word and/or a standard abbreviation listed
// here; extend this table when a legitimate three-letter name is introduced.
const allowedThreeCharacterNames = new Set([
  'acc',
  'add',
  'all',
  'any',
  'api',
  'arg',
  'arr',
  'avg',
  'bit',
  'box',
  'buf',
  'cfg',
  'cmd',
  'col',
  'css',
  'ctx',
  'def',
  'dir',
  'doc',
  'dom',
  'dst',
  'enc',
  'end',
  'env',
  'err',
  'exp',
  'ext',
  'fmt',
  'fps',
  'gen',
  'get',
  'has',
  'hex',
  'hit',
  'ids',
  'idx',
  'img',
  'job',
  'key',
  'len',
  'lhs',
  'log',
  'low',
  'map',
  'max',
  'min',
  'mod',
  'msg',
  'nav',
  'now',
  'num',
  'obj',
  'opt',
  'out',
  'pad',
  'pid',
  'pos',
  'pre',
  'raw',
  'ref',
  'req',
  'res',
  'rhs',
  'rid',
  'row',
  'rpc',
  'sel',
  'set',
  'src',
  'str',
  'sub',
  'sum',
  'tab',
  'tag',
  'tmp',
  'top',
  'uri',
  'url',
  'val',
  'weh',
  'win',
  'xml',
  'Rpc',
]);

/** Reports whether one binding name is too short to be descriptive. */
function isReportableName(identifierName: string): boolean {
  if (identifierName.length > 3) {
    return false;
  }

  if (identifierName.length === 3) {
    return !allowedThreeCharacterNames.has(identifierName);
  }

  return true;
}

/** Normalizes Windows and POSIX paths into one comparable format. */
function normalizePath(filePath: string): string {
  return filePath.replace(/\\/gu, '/');
}

/** Collects repository code files recursively under one directory. */
function collectCodeFiles(directoryPath: string): string[] {
  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .flatMap(directoryEntry => {
      const fullPath = path.join(directoryPath, directoryEntry.name);

      if (directoryEntry.isDirectory()) {
        return ignoredDirectories.has(directoryEntry.name)
          ? []
          : collectCodeFiles(fullPath);
      }

      return codeFileExtensions.has(path.extname(directoryEntry.name))
        ? [fullPath]
        : [];
    })
    .sort();
}

/** Builds a readable matcher failure block for one list of source entries. */
function formatEntries(entries: string[]): string {
  return entries.join('\n');
}

/** Formats one readable naming-conflict entry. */
function formatNamingConflict(conflict: NamingConflict): string {
  return `${conflict.relativePath}:${conflict.lineNumber}: ${conflict.identifierName} ${conflict.identifierKind}.`;
}

/** Adds one readable conflict entry once per source location. */
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

/** Picks the parser dialect for one source file by extension. */
function scriptKindForFile(filePath: string): ts.ScriptKind {
  if (filePath.endsWith('.tsx')) {
    return ts.ScriptKind.TSX;
  }
  if (filePath.endsWith('.jsx')) {
    return ts.ScriptKind.JSX;
  }
  if (filePath.endsWith('.js')) {
    return ts.ScriptKind.JS;
  }
  return ts.ScriptKind.TS;
}

/**
 * Scans one source file for too-short binding names: variables, parameters,
 * destructured names, and function and/or class declaration names. Property
 * keys, method names, member accesses, and import aliases are not bindings the
 * author freely chooses, so they are left alone.
 */
function scanFileNamingConflicts(
  report: NamingConflictReport,
  filePath: string,
): void {
  const relativePath = normalizePath(path.relative(repoRoot, filePath));
  const sourceText = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    scriptKindForFile(filePath),
  );
  const seenConflicts = new Set<string>();

  function record(nameNode: ts.Node | undefined, identifierKind: string): void {
    if (
      !nameNode
      || !ts.isIdentifier(nameNode)
      || !isReportableName(nameNode.text)
    ) {
      return;
    }

    const lineNumber =
      sourceFile.getLineAndCharacterOfPosition(nameNode.getStart(sourceFile))
        .line + 1;
    addNamingConflict(report, seenConflicts, {
      relativePath,
      lineNumber,
      identifierName: nameNode.text,
      identifierKind,
    });
  }

  function visit(node: ts.Node): void {
    if (ts.isParameter(node)) {
      record(node.name, 'parameter');
    } else if (ts.isBindingElement(node)) {
      record(node.name, 'variable');
    } else if (ts.isVariableDeclaration(node)) {
      record(node.name, 'variable');
    } else if (
      ts.isFunctionDeclaration(node)
      || ts.isFunctionExpression(node)
    ) {
      record(node.name, 'function');
    } else if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
      record(node.name, 'class');
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

/** Scans the repository for all too-short binding names. */
function scanNamingConflicts(): NamingConflictReport {
  const report = new NamingConflictReport();

  for (const filePath of collectCodeFiles(repoRoot)) {
    const relativePath = normalizePath(path.relative(repoRoot, filePath));
    if (
      ignoredRelativePaths.has(relativePath)
      || ignoredRelativePrefixes.some(prefix => relativePath.startsWith(prefix))
    ) {
      continue;
    }
    scanFileNamingConflicts(report, filePath);
  }

  return report;
}

// The content-libs de-mangling once left a family of TYPE-PREFIXED bindings -
// `fnVar_qm`, `localVar_A5`, `helperFn_gr`, `lookupTable_G4`, `listVar_O5`,
// `paramArg_eM`, `numVar_H4`, ... - where a type prefix plus a mangled 1-2 char
// suffix stands in for a real name. That is exactly the "prefix/suffix to hide a
// missing name" anti-pattern: name the binding for what it IS instead
// (`reactModule`, `translateReducer`, `browserRef`, ...). The generated bundle
// (ignoredRelativePaths) and the verbatim vendored weh tree
// (ignoredRelativePrefixes) are exempt like above; nothing else may carry them.
const bannedNamePatterns: { label: string; pattern: RegExp }[] = [
  {
    label: 'mangled type-prefixed binding',
    pattern:
      /\b(?:fnVar|localVar|helperFn|lookupTable|listVar|paramArg|numVar|objHelper|strVar)_.{1,5}\b/g,
  },
];

/** Finds banned mangled binding names across the audited source files. */
function scanBannedNames(): string[] {
  // This audit file necessarily spells the banned pattern out (comment + regex),
  // so it excludes itself, the way cleanroom-audit.ts does for its patterns.
  const selfPath = normalizePath(path.relative(repoRoot, fileURLToPath(import.meta.url)));
  const offenders: string[] = [];
  for (const filePath of collectCodeFiles(repoRoot)) {
    const relativePath = normalizePath(path.relative(repoRoot, filePath));
    if (
      relativePath === selfPath
      || ignoredRelativePaths.has(relativePath)
      || ignoredRelativePrefixes.some(prefix => relativePath.startsWith(prefix))
    ) {
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    for (const { label, pattern } of bannedNamePatterns) {
      const matches = content.match(pattern);
      if (matches) {
        const unique = [...new Set(matches)].sort();
        offenders.push(`${relativePath}: ${label}: ${unique.join(', ')}`);
      }
    }
  }
  return offenders;
}

describe('naming audit', () => {
  it('contains no one-, two-, or unlisted three-character binding names in the repository code', () => {
    const report = scanNamingConflicts();
    const pass = report.namingConflicts.length === 0;

    if (!pass) {
      throw new Error(
        [
          'Naming conflict list:',
          '',
          formatEntries(report.namingConflicts),
        ].join('\n'),
      );
    }
  });

  it('contains no leftover mangled type-prefixed binding names in the source', () => {
    const offenders = scanBannedNames();
    if (offenders.length > 0) {
      throw new Error(
        ['Banned mangled binding names:', '', ...offenders].join('\n'),
      );
    }
  });
});
