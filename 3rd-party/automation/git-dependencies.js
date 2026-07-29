#!/usr/bin/env node
'use strict';

/**
 * Postinstall hook that clones one or more sibling git repositories
 * into the consumer's tree using a bundled deploy key.
 *
 * The reusable bit lives in `GitDependencyUpdater` below; the
 * canonical entry call at the bottom of this file reads
 * `package.json` `gitDependencies` and fetches every configured
 * sibling checkout.
 *
 * Behavior summary (per repo):
 *
 *   1. Hardens the bundled SSH key (defaults to `ssh-key.txt` next
 *      to this file; override via `require('./git-dependencies').config
 *      .sshKeyPath`): normalises CRLF -> LF, locks the mode to 0400,
 *      and exports `GIT_SSH_COMMAND` so all subsequent git ops use
 *      this key.
 *
 *   2. Resolves the repo link against the consumer's own `origin`
 *      remote when it starts with `./` or `../`. With the consumer
 *      at `git@github.com:my-company/my-project.git`, the link
 *      `../my-project-shared` resolves to
 *      `git@github.com:my-company/my-project-shared.git`. Absolute
 *      links (`git@host:…`, `https://…`, `git://…`) pass through
 *      unchanged.
 *
 *   3. Reads one `gitDependencies` entry from the consumer's
 *      `package.json`. Each repo link maps one or more version ranges
 *      to different target folders, with optional `@ssh-key` plus
 *      pass-through `@...` fields for wrapper scripts, exposed on each
 *      reader entry without the leading `@`. Accepted forms:
 *
 *        - `*`              -> latest commit on the default branch.
 *        - `1.2.3`          -> exact tag.
 *        - `^1.2.3`         -> highest tag with the same major.
 *        - `~1.2.3`         -> highest tag with the same major.minor.
 *        - `<3.0.0`         -> highest tag lower than that version.
 *        - `<=3.0.0`        -> highest tag at or below that version.
 *        - `>1.5.0`         -> highest tag strictly above that version.
 *        - `>=1.5.0`        -> highest tag at or above that version.
 *        - `==1.2.3`        -> exact tag (same as `1.2.3`).
 *        - `>1.5.1 & <3.0.0`
 *                          -> highest tag within both bounds.
 *
 *   4. Clones (or fetches+checks out) the target. Before any
 *      destructive checkout, the existing tree is checked for
 *      **uncommitted changes** and **commits not present on any
 *      remote**; either case aborts with a distinct red error so
 *      local work is never silently overwritten.
 *
 *   5. Builds the cloned package's `dist/` when the files declared
 *      by its `main` / `types` are missing — runs `yarn install`
 *      in the checkout first when its dev-dependencies haven't
 *      been installed yet. On a fresh Windows clone this is what
 *      unblocks `import '<package>'` resolution; without it, any
 *      TS-aware tool (typeorm-extension, jest, nest build) hits
 *      `TS2307: Cannot find module '<package>'`.
 *
 *   6. Points `<consumer>/node_modules/<package-name>` at the
 *      checkout, where `<package-name>` is the cloned repo's
 *      `package.json` name. Idempotent.
 *
 * Skips the network round-trip when the bundled SSH key is missing
 * (typical for contributors without deploy access) so they can still
 * use a manually-populated checkout.
 */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const LOG_TAG = 'git-dependencies';

/**
 * Auth modes accepted in `@auth-modes`. `"ssh"` uses the bundled
 * deploy key; `"inline"` clones over HTTPS reusing the `user[:token]@`
 * userinfo from the consumer's `origin` remote. Order in the config
 * is the order modes are tried.
 */
const AUTH_MODES = new Set([
  'ssh',
  'inline',
]);

/**
 * Matches the `__dirname`-rooted prefix of this script and its
 * `git-dependenc(y|ies)` siblings (e.g. `git-dependency-reuse.js`)
 * inside stack-trace frames so unexpected-error reports collapse
 * paths down to `.js:123` / `reuse.js:123` instead of the full
 * absolute path. Both `/` and `\` separators are accepted so the
 * stripping works on Windows too (Node sometimes emits POSIX-style
 * paths in stack frames there).
 */
const SCRIPT_PATH_PREFIX_RE = new RegExp(
  __dirname.replace(/[.*+?^${}()|[\]]/g, '\\$&').replace(/[\\/]/g, '[/\\\\]')
    + '[/\\\\]git-dependenc(ies|y)\\b-?',
  'g',
);

/** @typedef {readonly [number, number, number]} SemverVersion */

/**
 * @typedef {object} SemverRange
 * @property {'caret' | 'tilde' | 'exact' | 'lt' | 'lte' | 'gt' | 'gte' | 'all'} kind
 * @property {SemverVersion} [version]
 * @property {SemverRange[]} [ranges]
 */

/**
 * @typedef {object} SplitRepoUrl
 * @property {string} prefix Transport + host (everything that precedes
 *   the path segment), so re-joining with a different `path` yields a
 *   sibling URL on the same host.
 * @property {string} path Path segment (e.g. `org/repo.git`).
 */

/**
 * Mutable module-level state consumed by every `fetchGitDependencies(...)`
 * in this process. Multiple repos in one postinstall typically share
 * one deploy key, so callers configure this once at the top of the
 * bootstrap instead of threading per-call arguments. Set fields BEFORE
 * invoking `fetchGitDependencies(...)`.
 */
const config = {
  /**
   * Path to the SSH deploy key applied during the bootstrap. Falsy /
   * unset = default to `ssh-key.txt` sitting next to this file.
   *
   * @type {string | null}
   */
  sshKeyPath: null,
};

/**
 * Centralizes tagged stdout/stderr logging, ANSI colouring, and the
 * path formatting rules used by the dependency bootstrap.
 */
class GitDepLogger {
  /**
   * @param {string} tag
   * @param {string} [rootDir]
   */
  constructor(tag, rootDir = process.cwd()) {
    /** @type {string} */
    this.tag = tag;
    /** @type {string} */
    this.rootDir = rootDir;
    /**
     * Buffered git stdout/stderr fragments awaiting either a flush
     * (on the first follow-up error) or process exit (on success).
     * Only the global logger ever owns this — instance-level loggers
     * delegate to it via the `globalLogger` short-circuit.
     *
     * @type {{ stream: 'stdout' | 'stderr', text: string }[]}
     */
    this.pendingGitOutput = [];
  }

  /**
   * Records git stdout/stderr for deferred display. With verbose
   * mode on, writes through immediately so the user sees git
   * progress in real time. Otherwise queues the text — the buffer
   * is replayed by `flushPendingGitOutput()` on the first follow-up
   * error (so the failure has context) and discarded on a clean
   * exit (so successful runs stay quiet).
   *
   * @param {string | null | undefined} stdout
   * @param {string | null | undefined} stderr
   * @returns {void}
   */
  recordGitOutput(stdout, stderr) {
    if (this !== globalLogger) {
      return globalLogger.recordGitOutput(stdout, stderr);
    }
    if (this.isVerboseOn()) {
      if (stdout) {
        process.stdout.write(stdout);
      }
      if (stderr) {
        process.stderr.write(stderr);
      }
      return;
    }
    if (stdout) {
      this.pendingGitOutput.push({ stream: 'stdout', text: stdout });
    }
    if (stderr) {
      this.pendingGitOutput.push({ stream: 'stderr', text: stderr });
    }
  }

  /**
   * Drains the deferred git-output buffer, writing each fragment to
   * the stream it originally came from. Idempotent: the buffer is
   * cleared so subsequent flushes are no-ops.
   *
   * @returns {void}
   */
  flushPendingGitOutput() {
    if (this !== globalLogger) {
      return globalLogger.flushPendingGitOutput();
    }
    for (const entry of this.pendingGitOutput) {
      const target =
        entry.stream === 'stderr' ? process.stderr : process.stdout;
      target.write(entry.text);
    }
    this.pendingGitOutput = [];
  }

  /**
   * Drops the deferred git-output buffer without printing. Lets callers
   * that recovered from a captured failure (e.g. the `tryUrl` loop
   * finding a working URL) erase the failed attempt's diagnostics so
   * they do not leak into a later flush.
   *
   * @returns {void}
   */
  discardPendingGitOutput() {
    if (this !== globalLogger) {
      return globalLogger.discardPendingGitOutput();
    }
    this.pendingGitOutput = [];
  }

  /**
   * Writes one info line to stdout with this logger's tag.
   *
   * @param {string} message
   * @param {string} [tag]
   * @param {string} [rootDir]
   * @returns {void}
   */
  info(message, tag = this.tag, rootDir = this.rootDir) {
    this.rawLog(
      [
        String(message),
      ],
      null,
      rootDir,
      tag,
    );
  }

  /**
   * Writes one yellow warning block with this logger's tag.
   *
   * @param {string | string[]} lines
   * @param {string | null} [tag]
   * @param {string} [rootDir]
   * @returns {void}
   */
  warning(lines, tag = this.tag, rootDir = this.rootDir) {
    this.rawLog(lines, true, rootDir, tag);
  }

  /**
   * Writes one red error block with this logger's tag.
   *
   * @param {string | string[]} lines
   * @param {string} [tag]
   * @param {string} [rootDir]
   * @returns {void}
   */
  error(lines, tag = this.tag, rootDir = this.rootDir) {
    this.rawLog(lines, false, rootDir, tag);
  }

  /**
   * Writes one tagged block to the selected stream.
   *
   * @param {string | string[]} lines Message to log.
   * @param {null | boolean | object} [type] The `null` value means a info-level
   * message is being logged, and that level has no color.
   * The `true` value means it's a warning with yellow color,
   * and anything else means an error is being logged, with red color.
   * @param {string} [rootDir]
   * @param {string | null} [tag]
   * @returns {void}
   */
  rawLog(lines, type = null, rootDir = this.rootDir, tag = this.tag) {
    if (this !== globalLogger) {
      return globalLogger.rawLog(lines, type, rootDir, tag);
    }
    const stream = type === null ? process.stdout : process.stderr;
    const normalizedLines = GitDepLogger.parseLines(lines);
    const color = type === null ? null : type === true ? 'yellow' : 'red';
    const open = this._getColourOpen(color, stream);
    const close = open ? '\x1b[0m' : '';

    if (normalizedLines.length > 0) {
      const prefix = tag ? `[${tag}] ` : '';
      stream.write(`${open}${prefix}${normalizedLines[0]}${close}\n`);
      for (const line of normalizedLines.slice(1)) {
        if (line.length === 0) {
          stream.write('\n');
          continue;
        }
        stream.write(`${open}${line}${close}\n`);
      }
    }
  }

  /**
   * Reports one unexpected fatal error and exits non-zero.
   *
   * @param {unknown} err
   * @param {string} [tag]
   * @param {string} [rootDir]
   * @returns {never}
   */
  onCriticalError(err, tag = this.tag, rootDir = this.rootDir) {
    if (this !== globalLogger) {
      return globalLogger.onCriticalError(err, tag, rootDir);
    }
    // Surface any git output we've been holding back so the failure
    // has context (the failing git command's own output included).
    this.flushPendingGitOutput();
    const tagPrefix = `[${tag}] `;
    const message =
      err && typeof err === 'object' && 'message' in err && err.message
        ? String(err.message)
        : String(err);
    // Errors thrown with this script's own `[tag]` prefix are
    // expected failure modes (config mistakes, version misses, ...).
    // Print just the message as a normal red error block instead of
    // dumping a stack trace under "Unexpected error:".
    if (message.startsWith(tagPrefix)) {
      this.rawLog(message.slice(tagPrefix.length), false, rootDir, tag);
      process.exit(1);
    }
    const detail =
      err && typeof err === 'object' && 'stack' in err && err.stack
        ? String(err.stack).replace(SCRIPT_PATH_PREFIX_RE, '')
        : String(err);
    const lines = [
      'Unexpected error:',
      ...detail.split('\n').map(line => `    ${line}`),
    ];
    this.rawLog(lines, err, rootDir, tag);
    process.exit(1);
  }

  /**
   * Formats one file path relative to this logger's rootDir.
   *
   * @param {string} targetPath
   * @param {string} [rootDir]
   * @returns {string}
   */
  formatPath(targetPath, rootDir = this.rootDir) {
    const absoluteTarget = path
      .resolve(String(targetPath))
      .replace(/^\\\\\?\\/, '');
    const absoluteBase = path.resolve(rootDir).replace(/^\\\\\?\\/, '');
    if (GitDepLogger._isDifferentDrive(absoluteTarget, absoluteBase)) {
      return GitDepLogger._toDisplayPath(absoluteTarget);
    }
    const relativeTarget = path.relative(absoluteBase, absoluteTarget) || '.';
    if (absoluteTarget.length <= relativeTarget.length + 7) {
      return GitDepLogger._toDisplayPath(absoluteTarget);
    }
    return GitDepLogger._toDisplayPath(relativeTarget);
  }

  /**
   * Normalizes one file path for error output.
   *
   * @param {string} targetPath
   * @returns {string}
   */
  formatErrorPath(targetPath) {
    return path.resolve(String(targetPath)).replace(/^\\\\\?\\/, '');
  }

  /**
   * Indents every non-empty line by four spaces for log readability.
   *
   * @param {string} text
   * @returns {string}
   */
  indentLines(text) {
    return String(text)
      .split('\n')
      .filter(line => line.length > 0)
      .map(line => `    ${line}`)
      .join('\n');
  }

  /**
   * Wraps `git checkout`'s orphan-commit notice in yellow ANSI.
   *
   * @param {string} text
   * @param {NodeJS.WriteStream} [stream]
   * @returns {string}
   */
  colorizeOrphanWarning(text, stream = process.stderr) {
    if (!Boolean(stream.isTTY) && !this.isForceColourOn()) {
      return text;
    }
    const yellow = '\x1b[33m';
    const reset = '\x1b[0m';
    const startRe = /^Warning: you are leaving \d+ commits? behind/;
    let inBlock = false;
    return String(text)
      .split('\n')
      .map(line => {
        if (!inBlock && startRe.test(line)) {
          inBlock = true;
          return `${yellow}${line}${reset}`;
        }
        if (inBlock) {
          if (line === '') {
            inBlock = false;
            return line;
          }
          return `${yellow}${line}${reset}`;
        }
        return line;
      })
      .join('\n');
  }

  /**
   * Reports whether `FORCE_COLOR` opts colour ON.
   *
   * @returns {boolean}
   */
  isForceColourOn() {
    const fc = process.env.FORCE_COLOR;
    return Boolean(fc) && fc !== '0' && !fc.toLowerCase().startsWith('false');
  }

  /**
   * Reports whether verbose logging is enabled for the current run.
   *
   * @returns {boolean}
   */
  isVerboseOn() {
    return (
      process.argv.includes('--verbose')
      || process.argv.includes('-v')
      || String(
        process.env.npm_config_loglevel
          || process.env.NPM_CONFIG_LOGLEVEL
          || '',
      )
        .toLowerCase()
        .startsWith('verbose')
    );
  }

  /**
   * Writes one info line to stdout.
   *
   * @param {string} tag
   * @param {string} message
   * @returns {void}
   */
  static logInfo(tag, message) {
    globalLogger.info(message, tag);
  }

  /**
   * Writes one yellow warning block to stderr.
   *
   * @param {string} tag
   * @param {string | string[]} lines
   * @returns {void}
   */
  static logWarning(tag, lines) {
    globalLogger.warning(lines, tag);
  }

  /**
   * Writes one red error block to stderr.
   *
   * @param {string} tag
   * @param {string | string[]} lines
   * @returns {void}
   */
  static logError(tag, lines) {
    globalLogger.error(lines, tag);
  }

  /**
   * Reports one unexpected fatal error and exits non-zero.
   *
   * @param {unknown} err
   * @param {string} [label]
   * @returns {never}
   */
  static onCriticalError(err, label = LOG_TAG) {
    return globalLogger.onCriticalError(err, label);
  }

  /**
   * Formats one file path for user-facing logs.
   *
   * @param {string} targetPath
   * @param {string} [basePath]
   * @returns {string}
   */
  static formatPathForLog(targetPath, basePath = process.cwd()) {
    return globalLogger.formatPath(targetPath, basePath);
  }

  /**
   * Normalizes one file path for error output.
   *
   * @param {string} targetPath
   * @returns {string}
   */
  static formatPathForError(targetPath) {
    return globalLogger.formatErrorPath(targetPath);
  }

  /**
   * Indents every non-empty line by four spaces for log readability.
   *
   * @param {string} text
   * @returns {string}
   */
  static indentLines(text) {
    return globalLogger.indentLines(text);
  }

  /**
   * Joins one tag list with ` - ` separators and wraps at ~80 cols
   * with a 6-space indent on continuation lines, so the
   * "available tags:" block stays readable even with long histories.
   *
   * @param {string[]} tags
   * @returns {string}
   */
  static formatTagListForError(tags) {
    if (tags.length === 0) {
      return '(none)';
    }
    const separator = ' - ';
    const continuationIndent = '      ';
    const firstLineHeaderLength = '  available tags: '.length;
    const targetWidth = 80;
    const wrappedLines = [];
    let currentLine = '';
    for (const tag of tags) {
      const candidate =
        currentLine.length === 0 ? tag : currentLine + separator + tag;
      const linePrefixLength =
        wrappedLines.length === 0
          ? firstLineHeaderLength
          : continuationIndent.length;
      if (
        currentLine.length > 0
        && linePrefixLength + candidate.length > targetWidth
      ) {
        wrappedLines.push(currentLine);
        currentLine = tag;
        continue;
      }
      currentLine = candidate;
    }
    if (currentLine.length > 0) {
      wrappedLines.push(currentLine);
    }
    return wrappedLines.join(`\n${continuationIndent}`);
  }

  /**
   * Wraps `git checkout`'s orphan-commit notice in yellow ANSI.
   *
   * @param {string} text
   * @returns {string}
   */
  static colorizeOrphanWarning(text) {
    return globalLogger.colorizeOrphanWarning(text);
  }

  /**
   * Normalizes one string-or-lines input into a line array.
   *
   * @param {string | string[]} lines
   * @returns {string[]}
   */
  static parseLines(lines) {
    if (Array.isArray(lines)) {
      return lines.map(line => String(line));
    }
    return [
      String(lines),
    ];
  }

  /**
   * Reports whether `FORCE_COLOR` opts colour ON.
   *
   * @returns {boolean}
   */
  static isForceColourOn() {
    return globalLogger.isForceColourOn();
  }

  /**
   * Reports whether verbose logging is enabled for the current run.
   *
   * @returns {boolean}
   */
  static isVerboseOn() {
    return globalLogger.isVerboseOn();
  }

  /**
   * Picks the ANSI prefix for one configured colour.
   *
   * @param {'red' | 'yellow' | null | undefined} color
   * @param {NodeJS.WriteStream} stream
   * @returns {string}
   */
  _getColourOpen(color, stream) {
    if (!color) {
      return '';
    }
    if (!Boolean(stream.isTTY) && !this.isForceColourOn()) {
      return '';
    }
    if (color === 'yellow') {
      return '\x1b[33m';
    }
    if (color === 'red') {
      return '\x1b[31m';
    }
    return '';
  }

  /**
   * Normalizes one user-facing path to forward slashes.
   *
   * @param {string} targetPath
   * @returns {string}
   */
  static _toDisplayPath(targetPath) {
    return String(targetPath).replace(/\\/g, '/');
  }

  /**
   * Reports whether two paths live on different Windows drives.
   *
   * @param {string} a
   * @param {string} b
   * @returns {boolean}
   */
  static _isDifferentDrive(a, b) {
    if (process.platform !== 'win32') {
      return false;
    }
    return (
      path.parse(a).root.toLowerCase() !== path.parse(b).root.toLowerCase()
    );
  }
}

const globalLogger = new GitDepLogger(LOG_TAG);

/**
 * Reusable logic for updating one configured git dependency inside
 * the consumer tree. Encapsulates SSH key setup, repo-link resolution,
 * version-range resolution, uncommitted/unpushed safety checks, and
 * `node_modules/<name>` linking.
 */
class GitDependencyUpdater {
  /**
   * @param {string} targetFolder - Absolute destination checkout path
   *   (e.g. `<consumer>/src/shared`).
   * @param {string} versionSpec - Version range selected from the
   *   consumer's `package.json` `gitDependencies` entry.
   * @param {string} repoUrl - Either an absolute git URL
   *   (`git@host:org/repo.git`, `https://…`, `git://…`) or a relative
   *   path (`./other` / `../other`) resolved against the consumer's
   *   own `origin` remote.
   * @param {string | null} sshKeyPath - Optional per-dependency SSH key
   *   from `gitDependencies["..."]["@ssh-key"]`.
   */
  constructor(targetFolder, versionSpec, repoUrl, sshKeyPath = null) {
    /** @type {string} */
    this.targetFolder = path.resolve(targetFolder);
    /** @type {string} */
    this.versionSpec = versionSpec;
    /** @type {string} */
    this.repoUrl = repoUrl;
    /** @type {string | null} */
    this.sshKeyPath = sshKeyPath;
    /**
     * Ordered list of git URLs that `tryUrl` walks through,
     * setting `this.repoUrl` to each in turn. Owned by the updater
     * — `tryUrl` reorders it in place so a winning URL sits at
     * index 0 and later calls (e.g. the inherited reader that runs
     * the matching `_ensureClone`) skip URLs already proven not to
     * work. Seeded with the constructor-supplied `repoUrl` so the
     * default single-attempt iteration just runs the callback once
     * with that URL; `GitDepReader` replaces it with the expanded
     * auth-mode list before the first call. An empty list signals
     * "no viable URL" and short-circuits the callback so downstream
     * steps fall back to whatever already exists on disk.
     *
     * @type {string[]}
     */
    this.repoUrlList = [repoUrl];
    /** @type {string} */
    this.consumerRoot = GitDepReader.findConsumerRoot(this.targetFolder);
    /** @type {GitDepLogger} */
    this.log = new GitDepLogger(LOG_TAG, this.consumerRoot);
    /** @type {boolean} */
    this.isForceMode = false;
    /** @type {boolean} */
    this.isShallow = true;
    /** @type {((lines: string[]) => void) | null} */
    this.onBeforeFail = null;
    /**
     * Set to `true` by `_failRed` once the first safety check has been
     * suppressed by `--force`, so subsequent checks early-return
     * instead of repeating the same diagnostic.
     *
     * @type {boolean}
     */
    this.isCheckSkipped = false;
    /**
     * Last-known list of tags advertised by `origin`, populated
     * lazily by `_listGitTagsRemoteCached` and refreshed on every
     * `_listGitTagsRemoteUncached` call.
     *
     * @type {string[] | null}
     */
    this._cachedRemoteTags = null;
    /**
     * Latches `true` once `_refreshRemoteUrlOnce` has reconciled
     * `origin` for this updater instance, so repeat calls become
     * cheap no-ops. Set optimistically at the start of the work
     * and reverted to `false` if the body throws, so a failed run
     * lets the next caller retry from a clean slate.
     *
     * @type {boolean}
     */
    this._refreshRemoteUrlDone = false;
    /**
     * Lazy populator for `repoUrlList`, installed by
     * `GitDepReader.toIterator` so iterator consumers that never
     * call `run()` (or that mock it) skip the underlying
     * `git remote get-url origin` lookup. `run()` invokes this hook
     * once before its first `tryUrl` call and then nulls the
     * field; the hook itself no-ops when an upstream caller has
     * already replaced `repoUrlList` by reference (so the
     * `configureUpdater` override path in `git-dependency-reuse` is
     * not clobbered).
     *
     * @property {(() => void) | null} _populateRepoUrlList
     */
    this._populateRepoUrlList = null;
  }

  /**
   * Runs the full fetch flow end-to-end against the configured target.
   * @returns {void}
   */
  run() {
    try {
      if (this._populateRepoUrlList) {
        this._populateRepoUrlList();
        this._populateRepoUrlList = null;
      }
      // Logged before `tryUrl` so the line is single regardless of
      // how many URLs the loop walks through. `_ensureClone`'s
      // "cloning ..." line stays inside the loop because it prints
      // the URL that the active attempt is using.
      if (fs.existsSync(path.join(this.targetFolder, '.git'))) {
        this.log.info(`refreshing ${this.log.formatPath(this.targetFolder)}`);
      }
      // Only the remote-access half (clone / fetch) sits inside the
      // URL retry loop; `_syncToVersion`'s local checkout and safety
      // guards run once against the URL that won, so a failure like
      // "Refusing to overwrite orphan commits" propagates immediately
      // instead of being re-tried against every alternate URL.
      this.tryUrl(() => this._ensureClone(this.versionSpec));
      this._syncToVersion(this.versionSpec);
      this._ensureBuilt();
      this._linkIntoNodeModules();
    } catch (err) {
      if (
        err
        && (err.code === 'EPERM'
          || err.code === 'EACCES'
          || err.code === 'EBUSY')
      ) {
        this._onPermissionError(err);
      }
      throw err;
    }
  }

  /**
   * Replaces Node's raw EPERM/EACCES/EBUSY stack trace with a short
   * actionable message naming the locked path and the fetch target,
   * then exits non-zero via `_failRed`. Surfaces only when an FS call
   * inside `run()` is rejected because another process holds a handle
   * on a path under `targetFolder` (typical Windows postinstall: file
   * watcher, antivirus, an editor, an open shell).
   *
   * @param {NodeJS.ErrnoException} err
   * @returns {void}
   */
  _onPermissionError(err) {
    const offending = GitDepLogger.formatPathForError(
      err.path || this.targetFolder,
    );
    this._failRed(
      'Failed to access:',
      `    ${offending}`,
      '',
      'please close any other program that may be accessing the folder:',
      `    ${GitDepLogger.formatPathForError(this.targetFolder)}`,
    );
  }

  /**
   * Runs `callback` against each URL in `this.repoUrlList`, setting
   * `this.repoUrl` and resetting the origin-reconcile latch per
   * attempt. The first URL that returns without throwing wins; it
   * is unshifted to position 0 so subsequent `tryUrl` calls
   * (including any inherited reader that shares the same array)
   * skip the already-failed URLs entirely.
   *
   * An empty list is the "no viable URL" signal — the callback is
   * NOT invoked and any post-clone steps the caller runs proceed
   * against whatever exists on disk.
   *
   * Knows nothing about auth modes; the caller (`GitDepReader`)
   * decides which URLs land in `repoUrlList` and emits any
   * auth-mode-specific hint when the list is empty.
   *
   * @param {() => void} callback
   * @returns {void}
   */
  tryUrl(callback) {
    const list = this.repoUrlList;
    let lastError = null;
    let prevUrl = null;
    for (let i = 0; i < list.length; i++) {
      const url = list[i];
      if (prevUrl !== null) {
        this.log.warning(
          [
            '  WARNING: failed for URL:',
            `    ${GitDependencyUpdater._redactUrl(prevUrl)}`,
            '  Hence retrying with URL:',
            `    ${GitDependencyUpdater._redactUrl(url)}`,
          ],
          null,
        );
      }
      this.repoUrl = url;
      // URL changed — re-reconcile origin on the next attempt.
      this._refreshRemoteUrlDone = false;
      prevUrl = url;
      // Label each attempt's buffered git output so the user can
      // tell which URL produced which diagnostics when every URL
      // fails. The label sits next to that attempt's stderr in the
      // deferred buffer; if a later URL succeeds the whole stretch
      // gets discarded.
      this.log.recordGitOutput(
        '',
        `[${LOG_TAG}] tried ${GitDependencyUpdater._redactUrl(url)}:\n`,
      );
      try {
        callback();
        this.log.discardPendingGitOutput();
        if (i > 0) {
          // Promote the winning URL to the front so future calls
          // sharing this same array skip the already-failed URLs.
          const [winner] = list.splice(i, 1);
          list.unshift(winner);
        }
        return;
      } catch (err) {
        lastError = err;
      }
    }
    if (lastError) {
      this.log.flushPendingGitOutput();
      throw lastError;
    }
    // Empty list: no candidates. Caller's downstream steps proceed
    // against whatever already exists on disk.
    this.log.discardPendingGitOutput();
  }

  // ------------------------------------------------------------- core

  /**
   * Ensures `targetFolder` exists as a git checkout of `repoUrl` with
   * up-to-date refs. Clones on first run; on subsequent runs repairs
   * the canonical `origin` remote and fetches fresh refs (including
   * tags when the spec calls for them). Does NOT advance HEAD —
   * `_syncToVersion` does that one level up, outside the `tryUrl`
   * loop, so its safety guards do not get re-run per URL.
   *
   * @param {string} versionSpec
   * @returns {void}
   */
  _ensureClone(versionSpec) {
    const gitDir = path.join(this.targetFolder, '.git');

    if (!fs.existsSync(gitDir)) {
      fs.mkdirSync(path.dirname(this.targetFolder), { recursive: true });
      this.log.info(`cloning ${GitDependencyUpdater._redactUrl(this.repoUrl)}`);
      this._runGit(this._buildCloneArgs(), this.consumerRoot);
      if (versionSpec !== '*') {
        this._fetchAllRefsWithTagBackup(versionSpec);
      }
      return;
    }

    // Existing checkout: just refresh refs. The "refreshing ..." log
    // lives in `run()` so `tryUrl` retries do not duplicate it.
    this._fetchAllRefsWithTagBackup(versionSpec);
  }

  /**
   * Repairs the checkout's `origin` remote before refreshes, at
   * most once per updater instance.
   *
   * A missing `origin` is added outright. A mismatched `origin` is
   * renamed to `origin-backup` / `origin-backup-N` first so the manual
   * remote stays inspectable while the fetch/reset flow regains the
   * canonical remote name it expects. The `_refreshRemoteUrlDone`
   * latch short-circuits subsequent calls so callers can request
   * the repair freely without paying the local git work twice. The
   * latch is set optimistically before the body runs and reverted
   * to `false` in the catch path so a failed run lets the next
   * caller retry instead of silently no-opping.
   *
   * @returns {void}
   */
  _refreshRemoteUrlOnce() {
    if (this._refreshRemoteUrlDone) {
      return;
    }
    try {
      this._refreshRemoteUrlDone = true;
      const existingRemotes = new Set(this._listGitRemotes());
      if (!existingRemotes.has('origin')) {
        this._runGit(
          [
            'remote',
            'add',
            'origin',
            this.repoUrl,
          ],
          this.targetFolder,
        );
        this.log.info(
          `added missing origin remote for ${this.log.formatPath(this.targetFolder)}`,
        );
        return;
      }
      const originUrl = this._captureGit(
        [
          'remote',
          'get-url',
          'origin',
        ],
        this.targetFolder,
      ).trim();
      if (originUrl === this.repoUrl) {
        return;
      }
      // Same repo under different auth, or already mirrored — just
      // set-url; skip the origin-backup-N rename.
      const sameRepo =
        GitDepReader._canonicalRepoIdentity(originUrl)
        === GitDepReader._canonicalRepoIdentity(this.repoUrl);
      if (sameRepo || this._findRemoteWithUrl(originUrl) !== null) {
        this._runGit(
          [
            'remote',
            'set-url',
            'origin',
            this.repoUrl,
          ],
          this.targetFolder,
        );
        return;
      }
      const backupName = GitDependencyUpdater._chooseBackupName(
        'origin',
        existingRemotes,
      );
      this._runGit(
        [
          'remote',
          'rename',
          'origin',
          backupName,
        ],
        this.targetFolder,
      );
      this._runGit(
        [
          'remote',
          'add',
          'origin',
          this.repoUrl,
        ],
        this.targetFolder,
      );
      this.log.info(
        `renamed mismatched origin remote to ${backupName} before restoring origin`,
      );
    } catch (err) {
      this._refreshRemoteUrlDone = false;
      throw err;
    }
  }

  /**
   * Runs the fetch needed for `versionSpec`.
   *
   * `*` only refreshes the branch tip, while tagged versions fetch the
   * tag refs too. When `isShallow` is on, the clone / fetch stays at
   * depth 1 and skips extra tag refs on the branch-tip path. On the
   * tag path, a "would clobber existing tag" rejection is recovered by
   * snapshotting the local tag under an unused `<tag>-backup` /
   * `<tag>-backup-N` name before deleting it and re-running the fetch.
   * The pre-existing `<tag>-backup` (if any) is never overwritten —
   * repeat rescues fall through to
   * `<tag>-backup-2`, `<tag>-backup-3`, ... so the original preserved
   * commit stays addressable forever. Any non-clobber failure is
   * re-thrown verbatim.
   *
   * @param {string} versionSpec
   * @returns {void}
   */
  _fetchAllRefsWithTagBackup(versionSpec) {
    // Reconcile `origin` before the fetch so a drifted remote URL
    // gets repaired in time. Best-effort — a setup failure here
    // does not block the fetch, which falls through to whatever
    // origin the local config currently names.
    try {
      this._refreshRemoteUrlOnce();
    } catch {
      // intentionally empty
    }
    const args = this._buildFetchArgs(versionSpec);
    const first = this._runGitCapturingStderr(args, this.targetFolder);
    if (first.status === 0) {
      return;
    }
    const clobbered = GitDependencyUpdater._parseClobberedTags(first.stderr);
    if (clobbered.length === 0) {
      // Unrelated failure: queue git's diagnostics in the deferred-
      // display buffer. The `tryUrl` loop discards them on a
      // successful retry; otherwise the top-level error handler
      // flushes the buffer alongside the thrown error.
      this.log.recordGitOutput('', first.stderr);
      throw new Error(
        `[${LOG_TAG}] git ${args.join(' ')} exited with status ${first.status}.`,
      );
    }
    const existingTags = new Set(this._listGitTags());
    for (const tag of clobbered) {
      if (!existingTags.has(tag)) {
        continue;
      }
      const backupName = GitDependencyUpdater._chooseBackupName(
        tag,
        existingTags,
      );
      this._runGit(
        [
          'tag',
          backupName,
          tag,
        ],
        this.targetFolder,
      );
      existingTags.add(backupName);
      this.log.info(
        `backed up local tag ${tag} as ${backupName} before overwrite`,
      );
      this._runGit(
        [
          'tag',
          '-d',
          tag,
        ],
        this.targetFolder,
      );
      existingTags.delete(tag);
    }
    this._runGit(args, this.targetFolder);
  }

  /**
   * Hard-resets the checkout to the revision selected by `versionSpec`.
   *
   *   - `*`        -> tip of `origin/HEAD`.
   *   - any range  -> highest git tag that satisfies the range.
   *
   * @param {string} versionSpec
   * @returns {void}
   */
  _syncToVersion(versionSpec) {
    if (versionSpec === '*') {
      if (this._assertNoUncommittedChanges('origin/HEAD')) {
        return;
      }
      this._assertNoUnpushedCommits();
      // Reset to whichever branch origin/HEAD points at so the
      // workflow is identical no matter what the upstream default
      // branch is named.
      this._runGit(
        [
          'reset',
          '--hard',
          'origin/HEAD',
        ],
        this.targetFolder,
      );
      return;
    }

    const tags = this._listGitTags();
    const matchedTag = GitDependencyUpdater._findBestMatchingTag(
      tags,
      versionSpec,
    );
    if (!matchedTag) {
      const sortedTags = GitDependencyUpdater._sortTagsForDisplay(tags);
      throw new Error(
        `[${LOG_TAG}] Failed to satisfy configured "${versionSpec}" version with the\n`
          + `  available tags: ${GitDepLogger.formatTagListForError(sortedTags)}\n`
          + `\n`
          + `  while trying to install:\n`
          + `      ${GitDepLogger.formatPathForError(this.targetFolder)}`,
      );
    }
    this._warnIfTagLocalOnly(matchedTag);
    if (this._assertNoUncommittedChanges(`${matchedTag}^{commit}`)) {
      return;
    }
    this._assertNoUnpushedCommits();
    this.log.info(
      `checking out tag ${matchedTag} (resolved from configured version "${versionSpec}")`,
    );
    // `--detach` makes the intent explicit (a tag is not a branch)
    // and `advice.detachedHead=false` silences git's stock detached-
    // HEAD banner in postinstall logs. The wrapper paints the
    // orphan-commit notice yellow so it stands out from the routine
    // checkout chatter.
    this._runGitColorizingOrphanWarning(
      [
        '-c',
        'advice.detachedHead=false',
        'checkout',
        '--detach',
        matchedTag,
      ],
      this.targetFolder,
    );
  }

  /**
   * Builds the cloned package's `dist/` when the entries declared by
   * its `main` / `types` fields are missing. Skips silently when the
   * package has no `build` script or when the outputs are already
   * present (no stat-based freshness check — postinstall must stay
   * fast and non-destructive on warm trees).
   *
   * On a fresh Windows clone this is what unblocks `import 'shared'`
   * resolution: `shared/package.json` points `main` / `types` at
   * `dist/`, so without a build TypeScript fails with
   * `TS2307: Cannot find module 'shared'` the moment any tooling
   * (typeorm-extension, jest, nest build) tries to compile a file
   * that references the package.
   *
   * @returns {void}
   */
  _ensureBuilt() {
    const pkgPath = path.join(this.targetFolder, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      return;
    }
    let pkg;
    try {
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    } catch {
      return;
    }
    if (!pkg || !pkg.scripts || typeof pkg.scripts.build !== 'string') {
      return;
    }
    const main = typeof pkg.main === 'string' ? pkg.main : null;
    const types = typeof pkg.types === 'string' ? pkg.types : null;
    if (
      main
      && types
      && fs.existsSync(path.join(this.targetFolder, main))
      && fs.existsSync(path.join(this.targetFolder, types))
    ) {
      return;
    }
    this._ensureSharedDependenciesInstalled();
    this.log.info(`building ${this.log.formatPath(this.targetFolder)}`);
    this._runYarnInside(['build'], 'build the cloned package');
  }

  /**
   * Runs `yarn install` inside the cloned package only when its
   * dev-dependencies haven't been installed yet. The presence of
   * `node_modules/typescript/package.json` is a cheap proxy for "the
   * shared package's tsc-driven build can run without a fresh
   * install".
   *
   * @returns {void}
   */
  _ensureSharedDependenciesInstalled() {
    const tscMarker = path.join(
      this.targetFolder,
      'node_modules',
      'typescript',
      'package.json',
    );
    if (fs.existsSync(tscMarker)) {
      return;
    }
    this.log.info(
      `installing deps in ${this.log.formatPath(this.targetFolder)}`,
    );
    this._runYarnInside(
      ['install'],
      'install dependencies in the cloned package',
    );
  }

  /**
   * Spawns `yarn <args>` inside the cloned package using the
   * consumer's vendored Yarn release when available. Falls back to a
   * `PATH`-resolved `yarn` (`yarn.cmd` on Windows, behind `shell:
   * true` because Node 18+ refuses to spawn `.cmd` files without one)
   * only when no vendored release is found.
   *
   * @param {readonly string[]} args
   * @param {string} description
   * @returns {void}
   */
  _runYarnInside(args, description) {
    const localYarn =
      GitDependencyUpdater._findVendoredYarn(this.consumerRoot)
      || GitDependencyUpdater._findVendoredYarn(this.targetFolder);

    const command = localYarn
      ? process.execPath
      : process.platform === 'win32'
        ? 'yarn.cmd'
        : 'yarn';
    const finalArgs = localYarn
      ? [
          localYarn,
          ...args,
        ]
      : [...args];

    const result = childProcess.spawnSync(command, finalArgs, {
      cwd: this.targetFolder,
      stdio: 'inherit',
      env: process.env,
      // Required when invoking `yarn.cmd` (a Windows batch shim)
      // because Node 18+ refuses to launch `.cmd` files via spawn
      // without a shell. `process.execPath + .cjs` does not need it.
      shell: !localYarn && process.platform === 'win32',
    });
    if (result.status === 0) {
      return;
    }
    throw new Error(
      `[${LOG_TAG}] failed to ${description} (status=${result.status}).`,
    );
  }

  /**
   * Returns the absolute path to a vendored Yarn release inside
   * `<repoRoot>/.yarn/releases/`, or `null` when the directory is
   * absent or holds no `yarn-*.cjs` file.
   *
   * @param {string} repoRoot
   * @returns {string | null}
   */
  static _findVendoredYarn(repoRoot) {
    const releasesDir = path.join(repoRoot, '.yarn', 'releases');
    if (!fs.existsSync(releasesDir)) {
      return null;
    }
    const entry = fs
      .readdirSync(releasesDir)
      .find(name => name.startsWith('yarn-') && name.endsWith('.cjs'));
    return entry ? path.join(releasesDir, entry) : null;
  }

  /**
   * Points `<consumer>/node_modules/<pkg.name>` at the checkout. The
   * link name is read from the cloned `package.json`; absent or
   * unnamed packages skip the link silently.
   *
   * @returns {void}
   */
  _linkIntoNodeModules() {
    const pkgPath = path.join(this.targetFolder, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      return;
    }
    let pkgName = null;
    try {
      const parsed = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      pkgName = typeof parsed.name === 'string' ? parsed.name : null;
    } catch {
      return;
    }
    if (!pkgName) {
      return;
    }
    GitDependencyUpdater._pointLinkAt(
      path.join(this.consumerRoot, 'node_modules', pkgName),
      this.targetFolder,
    );
  }

  /**
   * Reports whether `link` looks like a fully-qualified git URL.
   * @param {string} link
   * @returns {boolean}
   */
  static _isAbsoluteRepoUrl(link) {
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(link)) {
      return true;
    }
    // SSH "user@host:path" — disambiguate from relative POSIX paths
    // by requiring the `:` to come before the first `/`.
    const colon = link.indexOf(':');
    const slash = link.indexOf('/');
    return (
      colon > 0 && (slash === -1 || colon < slash) && !link.startsWith('.')
    );
  }

  /**
   * Redacts the `<userinfo>@` portion of an HTTPS URL (PATs, basic-
   * auth credentials) so it is safe to print to logs. Pass-through
   * for SSH and other forms that do not embed credentials inline.
   *
   * @param {string} url
   * @returns {string}
   */
  static _redactUrl(url) {
    return url.replace(
      /^([a-z]+:\/\/)[^/@]+@/i,
      (_match, scheme) => `${scheme}***@`,
    );
  }

  /**
   * Splits a git URL into a `{ prefix, path }` pair where `prefix`
   * carries the transport + host (so re-joining with a different
   * `path` yields a sibling URL on the same host). Returns `null`
   * for unrecognised forms.
   *
   * @param {string} url
   * @returns {SplitRepoUrl | null}
   */
  static _splitRepoUrl(url) {
    // SSH: user@host:path
    const ssh = /^([^/]+@[^:]+:)(.+)$/.exec(url);
    if (ssh) {
      return { prefix: ssh[1], path: ssh[2] };
    }
    // HTTPS / HTTP / git://
    const proto = /^([a-z]+:\/\/[^/]+\/)(.+)$/i.exec(url);
    if (proto) {
      return { prefix: proto[1], path: proto[2] };
    }
    return null;
  }

  // ------------------------------------------------ config / version

  // ---------------------------------------------------- safety nets

  /**
   * Aborts with a distinct red error when the working tree has any
   * uncommitted changes (staged, unstaged, or untracked).
   *
   * @returns {boolean}
   */
  _assertNoUncommittedChanges(remoteRevision) {
    if (this.isCheckSkipped) {
      return false;
    }
    const uncommitted = this._captureGit(
      [
        'status',
        '--porcelain',
      ],
      this.targetFolder,
    );
    if (uncommitted.trim().length === 0) {
      return false;
    }
    if (!this.isForceMode && remoteRevision) {
      const commit = this._resolveCommitHash('HEAD');
      if (commit === this._resolveCommitHash(remoteRevision)) {
        this.log.info(
          `skipped checkout since already on commit:\n    ${commit}`,
        );
        return true;
      }
    }
    this._failRed(
      'Refusing to overwrite uncommitted changes in:',
      `    ${GitDepLogger.formatPathForError(this.targetFolder)}`,
      'Commit or stash them before re-running install.',
      'Modified entries:',
      GitDepLogger.indentLines(uncommitted),
    );
    return false;
  }

  /**
   * Aborts with a distinct red error when local commits exist that no
   * configured remote (any of `origin`, `token`, …) holds.
   *
   * @returns {void}
   */
  _assertNoUnpushedCommits() {
    if (this.isCheckSkipped) {
      return;
    }
    // `HEAD --not --branches --tags --remotes` flags commits
    // reachable from HEAD that no local branch, tag, or remote
    // holds — i.e., detached-HEAD work nothing else anchors. A
    // commit parked on a local branch is safe: the branch ref
    // survives the upcoming detach/reset, so we never warn about
    // it (even when it has not been pushed yet).
    const out = this._captureGit(
      [
        'log',
        'HEAD',
        '--not',
        '--branches',
        '--tags',
        '--remotes',
        '--oneline',
      ],
      this.targetFolder,
    );
    if (out.trim().length === 0) {
      return;
    }
    this._failRed(
      'Refusing to overwrite orphan commits in:',
      `    ${GitDepLogger.formatPathForError(this.targetFolder)}`,
      'that no branch holds.',
      'Anchor them to a local branch (and push if you want them shared) before re-running install.',
      'Orphan commits:',
      GitDepLogger.indentLines(out),
    );
  }

  /**
   * Resolves one git revision to a commit hash.
   *
   * @param {string} revision
   * @returns {string}
   */
  _resolveCommitHash(revision) {
    return this._captureGit(
      [
        'rev-parse',
        revision,
      ],
      this.targetFolder,
    ).trim();
  }

  // -------------------------------------------------- semver helpers

  /**
   * Picks the highest git tag that satisfies the npm-style range. Tags
   * not in `[v]MAJOR.MINOR.PATCH` form are ignored.
   *
   * @param {readonly string[]} tags
   * @param {string} rangeSpec
   * @returns {string | null}
   */
  static _findBestMatchingTag(tags, rangeSpec) {
    const range = GitDependencyUpdater._parseSemverRange(rangeSpec);
    if (!range) {
      throw new Error(
        `[${LOG_TAG}] invalid version "${rangeSpec}"; `
          + 'expected "*", "X.Y.Z", "^X.Y.Z", "~X.Y.Z", "<X.Y.Z", "<=X.Y.Z", ">X.Y.Z", ">=X.Y.Z", "==X.Y.Z", or conjunctions like ">X.Y.Z & <A.B.C".',
      );
    }
    const candidates = [];
    for (const tag of tags) {
      const version = GitDependencyUpdater._parseSemverTag(tag);
      if (
        version
        && GitDependencyUpdater._satisfiesSemverRange(version, range)
      ) {
        candidates.push({ tag, version });
      }
    }
    if (candidates.length === 0) {
      return null;
    }
    candidates.sort((a, b) =>
      GitDependencyUpdater._compareSemverVersions(b.version, a.version),
    );
    return candidates[0].tag;
  }

  /**
   * Strict `[v]MAJOR.MINOR.PATCH` parse; returns null on mismatch.
   * @param {string} tag
   * @returns {SemverVersion | null}
   */
  static _parseSemverTag(tag) {
    const match = /^v?(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(tag);
    if (!match) {
      return null;
    }
    return [
      Number(match[1]),
      Number(match[2]),
      Number(match[3]),
    ];
  }

  /**
   * Sorts `tags` in place, newest-first by semver, with any
   * non-parseable tags moved to the end (reverse-lexicographic
   * within that bucket). Used for human-readable error reporting,
   * where lexicographic order from `git tag` (`0.0.1` < `1.0.0` <
   * `1.10.1`) is misleading.
   *
   * @param {string[]} tags
   * @returns {string[]} The same array passed in, returned for chaining.
   */
  static _sortTagsForDisplay(tags) {
    return tags.sort((a, b) => {
      const versionA = GitDependencyUpdater._parseSemverTag(a);
      const versionB = GitDependencyUpdater._parseSemverTag(b);
      if (versionA && versionB) {
        return GitDependencyUpdater._compareSemverVersions(versionB, versionA);
      }
      if (versionA) {
        return -1;
      }
      if (versionB) {
        return 1;
      }
      return b.localeCompare(a);
    });
  }

  /**
   * Lexicographic numeric compare across [major, minor, patch].
   * @param {SemverVersion} a
   * @param {SemverVersion} b
   * @returns {number}
   */
  static _compareSemverVersions(a, b) {
    for (let i = 0; i < 3; i += 1) {
      if (a[i] !== b[i]) {
        return a[i] - b[i];
      }
    }
    return 0;
  }

  /**
   * Parses one supported version expression into matcher data.
   * @param {string} spec
   * @returns {SemverRange | null}
   */
  static _parseSemverRange(spec) {
    const trimmed = spec.trim();
    if (trimmed.length === 0) {
      return null;
    }
    if (trimmed.includes('&')) {
      const ranges = trimmed
        .split('&')
        .map(part => GitDependencyUpdater._parseSemverRange(part))
        .filter(Boolean);
      if (ranges.length === 0 || ranges.length !== trimmed.split('&').length) {
        return null;
      }
      return {
        kind: 'all',
        ranges,
      };
    }
    let kind = 'exact';
    let body = trimmed;
    if (trimmed.startsWith('^')) {
      kind = 'caret';
      body = trimmed.slice(1);
    } else if (trimmed.startsWith('~')) {
      kind = 'tilde';
      body = trimmed.slice(1);
    } else if (trimmed.startsWith('<=')) {
      kind = 'lte';
      body = trimmed.slice(2);
    } else if (trimmed.startsWith('>=')) {
      kind = 'gte';
      body = trimmed.slice(2);
    } else if (trimmed.startsWith('==')) {
      kind = 'exact';
      body = trimmed.slice(2);
    } else if (trimmed.startsWith('<')) {
      kind = 'lt';
      body = trimmed.slice(1);
    } else if (trimmed.startsWith('>')) {
      kind = 'gt';
      body = trimmed.slice(1);
    }
    body = body.trim().replace(/^v/, '');
    if (body.length === 0) {
      return null;
    }
    const parts = body.split('.');
    if (parts.length === 0 || parts.length > 3) {
      return null;
    }
    const numbers = parts.map(part => Number(part));
    if (numbers.some(n => !Number.isFinite(n) || n < 0)) {
      return null;
    }
    while (numbers.length < 3) {
      numbers.push(0);
    }
    return { kind, version: numbers };
  }

  /**
   * npm-flavoured satisfies for exact, bounds, and conjunction ranges.
   * @param {SemverVersion} version
   * @param {SemverRange} range
   * @returns {boolean}
   */
  static _satisfiesSemverRange(version, range) {
    if (range.kind === 'all') {
      return Boolean(
        range.ranges
        && range.ranges.every(child =>
          GitDependencyUpdater._satisfiesSemverRange(version, child),
        ),
      );
    }
    const [
      vMaj,
      vMin,
      vPat,
    ] = version;
    const [
      rMaj,
      rMin,
      rPat,
    ] = range.version;
    if (range.kind === 'exact') {
      return vMaj === rMaj && vMin === rMin && vPat === rPat;
    }
    if (range.kind === 'tilde') {
      if (vMaj !== rMaj || vMin !== rMin) {
        return false;
      }
      return vPat >= rPat;
    }
    if (range.kind === 'lt') {
      return (
        GitDependencyUpdater._compareSemverVersions(version, range.version) < 0
      );
    }
    if (range.kind === 'lte') {
      return (
        GitDependencyUpdater._compareSemverVersions(version, range.version) <= 0
      );
    }
    if (range.kind === 'gt') {
      return (
        GitDependencyUpdater._compareSemverVersions(version, range.version) > 0
      );
    }
    if (range.kind === 'gte') {
      return (
        GitDependencyUpdater._compareSemverVersions(version, range.version) >= 0
      );
    }
    // caret: same leftmost non-zero, npm semantics for 0.x.y / 0.0.z.
    if (rMaj > 0) {
      if (vMaj !== rMaj) {
        return false;
      }
      return (
        GitDependencyUpdater._compareSemverVersions(version, range.version) >= 0
      );
    }
    if (rMin > 0) {
      if (vMaj !== 0 || vMin !== rMin) {
        return false;
      }
      return vPat >= rPat;
    }
    return vMaj === 0 && vMin === 0 && vPat === rPat;
  }

  // ---------------------------------------------- ssh / git helpers

  /**
   * Builds the clone args for the current updater settings.
   *
   * @returns {string[]}
   */
  _buildCloneArgs() {
    const args = ['clone'];
    if (this.isShallow) {
      args.push('--depth=1', '--no-tags');
    }
    args.push(this.repoUrl, this.targetFolder);
    return args;
  }

  /**
   * Builds the fetch args for `versionSpec`.
   *
   * @param {string} versionSpec
   * @returns {string[]}
   */
  _buildFetchArgs(versionSpec) {
    const args = [
      'fetch',
      '--prune',
    ];
    if (this.isShallow) {
      args.push('--depth=1');
    }
    if (versionSpec === '*') {
      if (this.isShallow) {
        args.push('--no-tags');
      }
      args.push('origin');
      return args;
    }
    args.push('--tags', 'origin');
    return args;
  }
  3;

  /**
   * Hardens the bundled SSH key and exports `GIT_SSH_COMMAND`:
   *
   *  - Rewrites CRLF -> LF when needed (Windows git-clone may have
   *    stamped the file with CRLF, which OpenSSH refuses).
   *  - Locks the file mode to 0400 so OpenSSH accepts it.
   *  - Sets `GIT_SSH_COMMAND` for the remainder of this process so
   *    the subsequent `git clone` / `git fetch` use this deploy key
   *    with no fallback to the developer's other identities.
   *
   * No-ops cleanly when the key file is missing.
   *
   * @param {string} keyPath
   * @returns {boolean} `true` when a key file was found at `keyPath`
   *   (and either freshly applied or already in effect), `false` when
   *   no key exists at that path. Callers use this to decide whether
   *   to rewrite auto-resolved HTTPS/PAT URLs into SSH form.
   */
  static _prepareSshEnvironment(keyPath) {
    if (!fs.existsSync(keyPath)) {
      return false;
    }

    const raw = fs.readFileSync(keyPath);
    if (raw.includes(Buffer.from('\r\n'))) {
      fs.chmodSync(keyPath, 0o600);
      fs.writeFileSync(keyPath, raw.toString('utf8').replace(/\r\n/g, '\n'));
    }

    try {
      fs.chmodSync(keyPath, 0o400);
    } catch {
      // Windows / read-only filesystems do not support POSIX modes —
      // SSH falls back to ACL-based ownership there.
    }

    const command = `ssh -p 22 -i '${keyPath}' -o IdentitiesOnly=yes -F /dev/null`;
    if (process.env.GIT_SSH_COMMAND === command) {
      return true;
    }
    process.env.GIT_SSH_COMMAND = command;
    if (GitDepLogger.isVerboseOn()) {
      GitDepLogger.logInfo(
        LOG_TAG,
        'applied bundled SSH key for git operations.',
      );
    }
    return true;
  }

  /**
   * Repoints `linkPath` at `target` when it does not already resolve
   * there. Idempotent so repeated postinstall runs are no-ops.
   *
   * @param {string} linkPath
   * @param {string} target
   * @returns {void}
   */
  static _pointLinkAt(linkPath, target) {
    const absoluteTarget = path.resolve(target);

    let existingTarget = null;
    try {
      existingTarget = fs.realpathSync(linkPath);
    } catch {
      // Link missing entirely; we will create it below.
    }
    const desiredTarget = fs.realpathSync(absoluteTarget);
    if (existingTarget === desiredTarget) {
      return;
    }

    fs.mkdirSync(path.dirname(linkPath), { recursive: true });

    let stat = null;
    try {
      stat = fs.lstatSync(linkPath);
    } catch {
      // No prior file/link.
    }
    if (stat) {
      if (stat.isSymbolicLink() || stat.isFile()) {
        fs.unlinkSync(linkPath);
      } else {
        fs.rmSync(linkPath, { recursive: true, force: true });
      }
    }

    // `'junction'` works on Windows for directories without admin
    // rights and is a no-op on POSIX. Always pass an absolute target —
    // Windows refuses relative junctions.
    fs.symlinkSync(absoluteTarget, linkPath, 'junction');
  }

  /**
   * Lists every configured remote name in the checkout, one per line.
   *
   * @returns {string[]}
   */
  _listGitRemotes() {
    const out = this._captureGit(['remote'], this.targetFolder);
    return out
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }

  /** Returns the name of any remote whose URL equals `url`, or null. */
  _findRemoteWithUrl(url) {
    for (const remote of this._listGitRemotes()) {
      try {
        const remoteUrl = this._captureGit(
          [
            'remote',
            'get-url',
            remote,
          ],
          this.targetFolder,
        ).trim();
        if (remoteUrl === url) return remote;
      } catch {
        // unreadable — skip
      }
    }
    return null;
  }

  /**
   * Lists every tag in the checkout, one per line.
   * @returns {string[]}
   */
  _listGitTags() {
    const out = this._captureGit(
      [
        'tag',
        '--list',
      ],
      this.targetFolder,
    );
    return out
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }

  /**
   * Lists the remote tags available for version resolution.
   *
   * Always issues a fresh `git ls-remote` and refreshes
   * `_cachedRemoteTags` with the result. Prefer
   * `_listGitTagsRemoteCached` for read paths so repeat calls on
   * the same updater instance do not pay the network round trip.
   *
   * @returns {string[]}
   */
  _listGitTagsRemoteUncached() {
    const gitDir = path.join(this.targetFolder, '.git');
    const args = [
      'ls-remote',
      '--tags',
      '--refs',
      this.repoUrl,
    ];
    let cwd = this.consumerRoot;
    if (fs.existsSync(gitDir)) {
      this._refreshRemoteUrlOnce();
      args[3] = 'origin';
      cwd = this.targetFolder;
    }
    const out = this._captureGit(args, cwd);
    const tags = out
      .split('\n')
      .map(line => line.trim().split(/\s+/)[1] || '')
      .filter(ref => ref.startsWith('refs/tags/'))
      .map(ref => ref.replace(/^refs\/tags\//, ''));
    this._cachedRemoteTags = tags;
    return tags;
  }

  /**
   * Returns the cached remote tag list, falling back to one
   * `_listGitTagsRemoteUncached` call when the cache is empty.
   * Subsequent calls on the same instance reuse the cached array
   * with no network traffic.
   *
   * @returns {string[]}
   */
  _listGitTagsRemoteCached() {
    if (this._cachedRemoteTags !== null) {
      return this._cachedRemoteTags;
    }
    return this._listGitTagsRemoteUncached();
  }

  /**
   * Warns when `tagName` is present in the local checkout but not
   * advertised by `origin`. Surfaces silent forks: a wrong remote
   * URL can let `_syncToVersion` resolve to an old tag that lives
   * only in the local clone, with no signal that the configured
   * remote has moved on (or never had that tag in the first place).
   *
   * The check is best-effort — a network or auth failure on
   * `_listGitTagsRemoteCached()` swallows the diagnostic rather
   * than blocking a checkout that would otherwise succeed.
   *
   * @param {string} tagName
   * @returns {void}
   */
  _warnIfTagLocalOnly(tagName) {
    let remoteTags;
    try {
      remoteTags = this._listGitTagsRemoteCached();
    } catch {
      return;
    }
    if (remoteTags.includes(tagName)) {
      return;
    }
    this.log.warning(
      [
        `    WARNING: The "${tagName}" tag exists only in the local clone of:`,
        '',
        `    ${GitDependencyUpdater._redactUrl(this.repoUrl)}`,
        '',
        '    The configured remote URL may be wrong, or the tag was never pushed.',
      ],
      null,
    );
  }

  /**
   * Spawns `git <args>` without handing git the live console handles.
   *
   * Git for Windows can toggle shared console mode flags when it owns
   * the parent's stdout/stderr directly, which leaves later ANSI logs
   * printing raw escape bytes. Buffering git output here avoids that.
   *
   * @param {readonly string[]} args
   * @param {string} cwd
   * @returns {void}
   */
  _runGit(args, cwd) {
    const result = this._spawnGitBuffered(args, cwd);
    this._replayGitOutput(result.stdout, result.stderr);
    if (result.status === 0) {
      return;
    }
    // Leave the captured output in the deferred-display buffer. The
    // `tryUrl` loop discards it on a successful retry; otherwise
    // the top-level error handler flushes it next to the thrown error.
    throw new Error(
      `[${LOG_TAG}] git ${args.join(' ')} exited with status ${result.status}.`,
    );
  }

  /**
   * Captures stdout of `git <args>`; throws on non-zero exit.
   * @param {readonly string[]} args
   * @param {string} cwd
   * @returns {string}
   */
  _captureGit(args, cwd) {
    const result = childProcess.spawnSync('git', args, {
      cwd,
      env: process.env,
      encoding: 'utf8',
    });
    if (result.status !== 0) {
      throw new Error(
        `[${LOG_TAG}] git ${args.join(' ')} exited with status ${result.status}: `
          + (result.stderr || '').trim(),
      );
    }
    return result.stdout || '';
  }

  /**
   * Spawns `git <args>` with stdout still inherited but stderr captured
   * so the caller can pattern-match against git's diagnostics. Never
   * throws — returns the exit status alongside the captured stderr so
   * recoverable failures (e.g. "would clobber existing tag") can be
   * handled before deciding whether to surface them.
   *
   * @param {readonly string[]} args
   * @param {string} cwd
   * @returns {{ status: number | null, stderr: string }}
   */
  _runGitCapturingStderr(args, cwd) {
    const result = this._spawnGitBuffered(args, cwd);
    this._replayGitOutput(result.stdout, '');
    return { status: result.status, stderr: result.stderr || '' };
  }

  /**
   * Like `_runGit`, but captures stderr and replays it with the
   * orphan-commit notice (`Warning: you are leaving N commit behind…`)
   * wrapped in yellow ANSI. `git checkout` emits that notice via a
   * direct `fprintf(stderr, …)` that bypasses git's `warning()` helper,
   * so `color.ui` never paints it — left alone, the warning is the
   * same shade as routine output and easy to miss.
   *
   * @param {readonly string[]} args
   * @param {string} cwd
   * @returns {void}
   */
  _runGitColorizingOrphanWarning(args, cwd) {
    const result = this._spawnGitBuffered(args, cwd);
    const stderr = result.stderr || '';
    const colorizedStderr = stderr
      ? GitDepLogger.colorizeOrphanWarning(stderr)
      : '';
    this._replayGitOutput(result.stdout, colorizedStderr);
    if (result.status !== 0) {
      throw new Error(
        `[${LOG_TAG}] git ${args.join(' ')} exited with status ${result.status}.`,
      );
    }
  }

  /**
   * Spawns `git <args>` with both output streams buffered.
   *
   * Buffering keeps git from mutating the shared Windows console state
   * while still letting the caller replay the emitted text afterward.
   *
   * @param {readonly string[]} args
   * @param {string} cwd
   * @returns {import('child_process').SpawnSyncReturns<string>}
   */
  _spawnGitBuffered(args, cwd) {
    return childProcess.spawnSync('git', args, {
      cwd,
      env: process.env,
      stdio: [
        'inherit',
        'pipe',
        'pipe',
      ],
      encoding: 'utf8',
    });
  }

  /**
   * Forwards buffered git output to the logger's deferred-display
   * queue. Verbose mode writes through immediately; otherwise the
   * text only surfaces if a follow-up error triggers a flush — see
   * `GitDepLogger#recordGitOutput`.
   *
   * @param {string | null | undefined} stdout
   * @param {string | null | undefined} stderr
   * @returns {void}
   */
  _replayGitOutput(stdout, stderr) {
    this.log.recordGitOutput(stdout, stderr);
  }

  /**
   * Prints a multi-line red error to stderr (ANSI when stderr is a
   * TTY or `FORCE_COLOR=1` is set, so yarn-spawned postinstall
   * subprocesses still get colour) and exits with a non-zero
   * status. With force mode enabled on the updater, prepends a
   * banner that owns the override so the "Refusing to overwrite …"
   * lines emitted by callers do not read as a lie when the
   * bootstrap then proceeds, and flips `this.isCheckSkipped` so
   * any subsequent
   * safety check on the same updater short-circuits instead of
   * repeating the same diagnostic.
   *
   * @param {...string} lines
   * @returns {void}
   */
  _failRed(...lines) {
    const forced = this.isForceMode;
    if (this.onBeforeFail) {
      this.onBeforeFail(lines);
    }
    if (forced) {
      this.isCheckSkipped = true;
      this.log.error([
        'Running with --force — else would fail with:',
      ]);
      this.log.warning(lines);
    } else {
      this.log.error(lines);
      this._exit(1);
    }
  }

  /**
   * Terminates the updater after a fatal safety check.
   *
   * Callers may override this to unwind instead of exiting the whole
   * process.
   *
   * @param {number} code
   * @returns {void}
   */
  _exit(code) {
    process.exit(code);
  }

  /**
   * Reports whether `FO##RCE_COLOR` opts colour ON for the stderr-side
   * gates. Treats any set, non-empty value as on except `0` /
   * `false` (chalk-style), so the same wrapper-exported knob that
   * lights up nest-cli, jest, eslint, … also lights up the
   * fetch-shared diagnostics emitted from yarn-spawned postinstall
   * subprocesses (where stderr is piped, not a TTY).
   *
   * @returns {boolean}
   */
  static _isForceColourOn() {
    const fc = process.env.FORCE_COLOR;
    return Boolean(fc) && fc !== '0' && !fc.toLowerCase().startsWith('false');
  }

  /**
   * Picks an unused backup name for `tag`, preferring `<tag>-backup`
   * and falling back to `<tag>-backup-2`, `<tag>-backup-3`, ... when
   * earlier names are taken. The pre-existing `<name>-backup` is never
   * reused, so prior backups stay addressable verbatim. Throws when
   * 999 sequential candidates are all taken.
   *
   * @param {string} sourceName
   * @param {Set<string>} existingNames
   * @returns {string}
   */
  static _chooseBackupName(sourceName, existingNames) {
    const base = `${sourceName}-backup`;
    if (!existingNames.has(base)) {
      return base;
    }
    for (let n = 2; n <= 999; n += 1) {
      const candidate = `${base}-${n}`;
      if (!existingNames.has(candidate)) {
        return candidate;
      }
    }
    throw new Error(
      `[${LOG_TAG}] cannot find an unused backup name for "${sourceName}" `
        + `(tried ${base} through ${base}-999). Delete some old backups and retry.`,
    );
  }

  /**
   * Extracts the local tag names from `git fetch` stderr lines of the
   * form:
   *
   *     ! [rejected]        <src>      -> <dst>  (would clobber existing tag)
   *
   * Returns the `<dst>` value (the local tag that would be overwritten)
   * for each such line, in order, with duplicates removed.
   *
   * @param {string} stderr
   * @returns {string[]}
   */
  static _parseClobberedTags(stderr) {
    const re =
      /^\s*!\s+\[rejected\]\s+\S+\s+->\s+(\S+)\s+\(would clobber existing tag\)/;
    const seen = new Set();
    const out = [];
    for (const line of stderr.split('\n')) {
      const match = re.exec(line);
      if (match && !seen.has(match[1])) {
        seen.add(match[1]);
        out.push(match[1]);
      }
    }
    return out;
  }

  /**
   * Wraps `git checkout`'s orphan-commit notice in yellow ANSI when
   * stderr is a TTY (or `FORCE_COLOR=1`), leaving the rest of
   * `text` untouched. The notice starts at `Warning: you are
   * leaving N commit(s) behind…` and runs through the next blank
   * line (matching git's own block layout). Skipped on plain
   * stderr to keep log files free of escape codes — same colour
   * gate as `_failRed`.
   *
   * @param {string} text
   * @returns {string}
   */
  static _colorizeOrphanWarning(text) {
    if (!process.stderr.isTTY && !GitDependencyUpdater._isForceColourOn()) {
      return text;
    }
    const yellow = '\x1b[33m';
    const reset = '\x1b[0m';
    const startRe = /^Warning: you are leaving \d+ commits? behind/;
    let inBlock = false;
    return text
      .split('\n')
      .map(line => {
        if (!inBlock && startRe.test(line)) {
          inBlock = true;
          return `${yellow}${line}${reset}`;
        }
        if (inBlock) {
          if (line === '') {
            inBlock = false;
            return line;
          }
          return `${yellow}${line}${reset}`;
        }
        return line;
      })
      .join('\n');
  }

  /**
   * Indents every non-empty line by four spaces for log readability.
   * @param {string} text
   * @returns {string}
   */
  static _indentLines(text) {
    return text
      .split('\n')
      .filter(line => line.length > 0)
      .map(line => `    ${line}`)
      .join('\n');
  }
}

/**
 * Describes one configured git dependency plus its pass-through
 * metadata and resolved tag, when available.
 */
class GitDepEntry {
  /**
   * @param {string} repoUrl
   * @param {string | null} sshKeyPath
   * @param {string} targetFolder
   * @param {string} versionSpec
   * @param {{ [key: string]: unknown }} [metadata]
   * @param {string | null} [versionTag]
   * @param {string[]} [authModes]
   */
  constructor(
    repoUrl,
    sshKeyPath,
    targetFolder,
    versionSpec,
    metadata = {},
    versionTag = null,
    authModes = GitDepReader.defaultAuthModes(),
  ) {
    Object.assign(this, metadata);
    this.repoUrl = repoUrl;
    this.sshKeyPath = sshKeyPath;
    this.authModes = authModes;
    this.targetFolder = targetFolder;
    this.versionSpec = versionSpec;
    this.versionTag = versionTag;
  }

  /**
   * Builds one copy of the entry with an updated resolved tag.
   *
   * @param {string | null} versionTag
   * @returns {GitDepEntry}
   */
  withVersionTag(versionTag) {
    const entry = new GitDepEntry(
      this.repoUrl,
      this.sshKeyPath,
      this.targetFolder,
      this.versionSpec,
    );
    Object.assign(entry, this);
    entry.versionTag = versionTag;
    return entry;
  }
}

/**
 * Reads configured git dependency entries from one consumer tree and
 * turns them into filtered entry lists or updater instances.
 */
class GitDepReader {
  /**
   * @param {GitDepEntry[]} entries
   */
  constructor(entries) {
    /** @type {GitDepEntry[]} */
    this.entries = entries;
    /** @type {((entry: GitDepEntry) => boolean) | null} */
    this.filter = null;
    /** @type {boolean} */
    this.isForceMode = false;
  }

  // ------------------------------------------------- consumer root

  /**
   * Walks up from `startPath` to find the consumer project root
   * (the first ancestor whose `package.json` has a `name` other than
   * the cloned target's). Falls back to environment hints
   * (`INIT_CWD`, `npm_config_local_prefix`) when the walk yields
   * nothing useful.
   *
   * Hop limit sized for the deepest realistic case
   * (`consumer/node_modules/foo/sub/...`) without becoming a full
   * filesystem walk on a misconfigured machine.
   *
   * @param {string} startPath
   * @returns {string}
   */
  static findConsumerRoot(startPath) {
    let candidate = path.resolve(startPath);
    for (let depth = 0; depth < 8; depth += 1) {
      const pkgJson = path.join(candidate, 'package.json');
      if (!fs.existsSync(pkgJson)) {
        const parent = path.dirname(candidate);
        if (parent === candidate) {
          break;
        }
        candidate = parent;
        continue;
      }
      try {
        const parsed = JSON.parse(fs.readFileSync(pkgJson, 'utf8'));
        // Accept any package.json that is not the cloned sub-package;
        // by convention sub-packages here are named `shared` or sit
        // under a `node_modules/` segment.
        if (parsed.name && parsed.name !== 'shared') {
          return candidate;
        }
      } catch {
        // Not JSON; keep walking.
      }
      const parent = path.dirname(candidate);
      if (parent === candidate) {
        break;
      }
      candidate = parent;
    }
    if (process.env.INIT_CWD) {
      return process.env.INIT_CWD;
    }
    if (process.env.npm_config_local_prefix) {
      return process.env.npm_config_local_prefix;
    }
    return process.cwd();
  }

  /**
   * Reports whether the current invocation requested forced mode via
   * argv or `FORCE_MODE`.
   *
   * @returns {boolean}
   */
  static isForced() {
    for (let i = process.argv.length - 1; i >= 0; i -= 1) {
      const arg = process.argv[i];
      if (arg === '--force') {
        const next = process.argv[i + 1];
        if (next && !next.startsWith('-')) {
          return GitDepReader.booleanCast(next);
        }
        return true;
      }
      if (arg.startsWith('--force=')) {
        return GitDepReader.booleanCast(arg.slice('--force='.length));
      }
    }
    return GitDepReader.booleanCast(process.env.FORCE_MODE);
  }

  /**
   * Reads git dependency entries from the consumer tree that owns
   * `folder`. See `fromConsumer` for `inheritAuthFromEntry`.
   *
   * @param {string} folder
   * @param {GitDepEntry | null} [inheritAuthFromEntry]
   * @returns {GitDepReader}
   */
  static fromFolder(folder, inheritAuthFromEntry = null) {
    return GitDepReader.fromConsumer(
      GitDepReader.findConsumerRoot(folder),
      inheritAuthFromEntry,
    );
  }

  /**
   * Reads git dependency entries from `consumerRoot`. When
   * `inheritAuthFromEntry` is given, entries whose `repoUrl` matches
   * and which did not set their own `@auth-modes` / `@ssh-key`
   * inherit those fields from the source.
   *
   * @param {string} consumerRoot
   * @param {GitDepEntry | null} [inheritAuthFromEntry]
   * @returns {GitDepReader}
   */
  static fromConsumer(consumerRoot, inheritAuthFromEntry = null) {
    const root = path.resolve(consumerRoot);
    const pkgPath = path.join(root, 'package.json');
    const pkg = GitDepReader.parseJson(pkgPath, true, root);
    const pkgSource = fs.readFileSync(pkgPath, 'utf8');
    const configured = pkg.gitDependencies;
    if (configured == null) {
      return new GitDepReader([]);
    }
    if (
      !configured
      || typeof configured !== 'object'
      || Array.isArray(configured)
    ) {
      throw new Error(
        `[${LOG_TAG}] invalid gitDependencies in ${pkgPath}; expected an object.`,
      );
    }
    return new GitDepReader(
      Object.entries(configured).flatMap(
        ([
          repoUrl,
          rule,
        ]) => {
          if (!rule || typeof rule !== 'object' || Array.isArray(rule)) {
            throw new Error(
              `[${LOG_TAG}] invalid gitDependencies["${repoUrl}"] in ${pkgPath}; expected an object.`,
            );
          }
          const sshKeyEntry = rule['@ssh-key'];
          if (
            sshKeyEntry !== undefined
            && (typeof sshKeyEntry !== 'string'
              || sshKeyEntry.trim().length === 0)
          ) {
            throw new Error(
              `[${LOG_TAG}] invalid gitDependencies["${repoUrl}"]["@ssh-key"] in ${pkgPath}; expected a string.`,
            );
          }
          const authModes = GitDepReader._parseAuthModes(
            rule['@auth-modes'],
            repoUrl,
            pkgPath,
          );
          const passthroughEntries = Object.entries(rule)
            .filter(
              ([key]) =>
                key.startsWith('@')
                && key !== '@ssh-key'
                && key !== '@auth-modes',
            )
            .map(
              ([
                key,
                value,
              ]) => [
                key.slice(1),
                value,
              ],
            );
          for (const [key] of passthroughEntries) {
            if (
              !key
              || key === 'repoUrl'
              || key === 'sshKeyPath'
              || key === 'authModes'
              || key === 'targetFolder'
              || key === 'versionSpec'
              || key === 'versionTag'
            ) {
              throw new Error(
                `[${LOG_TAG}] invalid gitDependencies["${repoUrl}"]; @-key alias "${key}" would override a built-in entry field.`,
              );
            }
          }
          const versions = Object.entries(rule).filter(
            ([key]) => !key.startsWith('@'),
          );
          if (versions.length === 0) {
            throw new Error(
              `[${LOG_TAG}] invalid gitDependencies["${repoUrl}"] in ${pkgPath}; expected at least one version-to-target mapping.`,
            );
          }
          const metadata = Object.fromEntries(passthroughEntries);
          const sshKeyPath =
            typeof sshKeyEntry === 'string'
              ? path.resolve(root, sshKeyEntry)
              : null;
          const usedTargetFolders = new Set();
          return versions.map(
            ([
              versionSpec,
              targetFolder,
            ]) => {
              if (
                versionSpec !== '*'
                && !GitDependencyUpdater._parseSemverRange(versionSpec)
              ) {
                throw new Error(
                  `[${LOG_TAG}] invalid gitDependencies version at `
                    + `${GitDepReader._findGitDependencyVersionLocation(pkgPath, pkgSource, repoUrl, versionSpec)}: `
                    + `"${versionSpec}"; expected "*", "X.Y.Z", "^X.Y.Z", "~X.Y.Z", "<X.Y.Z", ">X.Y.Z", or conjunctions like ">X.Y.Z & <A.B.C".`,
                );
              }
              if (
                typeof targetFolder !== 'string'
                || targetFolder.trim().length === 0
              ) {
                throw new Error(
                  `[${LOG_TAG}] invalid gitDependencies["${repoUrl}"]["${versionSpec}"] in ${pkgPath}; expected a target-folder string.`,
                );
              }
              const resolvedTargetFolder = path.resolve(root, targetFolder);
              if (usedTargetFolders.has(resolvedTargetFolder)) {
                throw new Error(
                  `[${LOG_TAG}] invalid gitDependencies["${repoUrl}"] in ${pkgPath}; multiple versions cannot target the same folder:`
                    + `\n    ${GitDepLogger.formatPathForLog(resolvedTargetFolder, root)}`,
                );
              }
              usedTargetFolders.add(resolvedTargetFolder);
              const inherits =
                inheritAuthFromEntry
                && inheritAuthFromEntry.repoUrl === repoUrl;
              return {
                ...metadata,
                repoUrl,
                sshKeyPath:
                  inherits && sshKeyEntry === undefined
                    ? inheritAuthFromEntry.sshKeyPath
                    : sshKeyPath,
                authModes:
                  inherits && rule['@auth-modes'] === undefined
                    ? inheritAuthFromEntry.authModes
                    : authModes,
                targetFolder: resolvedTargetFolder,
                versionSpec,
              };
            },
          );
        },
      ),
    );
  }

  /**
   * Modes attempted when a `gitDependencies` entry has no
   * `@auth-modes`. Exposed as a function — not a shared `const`
   * — because the `tryUrl` loop reorders its modes in place on
   * success, and the result must stay mutable per entry so one
   * entry's reorder cannot leak into the next entry's default.
   * Each call returns a fresh array.
   *
   * @returns {string[]}
   */
  static defaultAuthModes() {
    return [
      'ssh',
      'inline',
    ];
  }

  // ---------------------------------------------- repo URL / SSH key

  /**
   * Returns the absolute git URL for one entry. Absolute URLs pass
   * through; relative paths (`./foo`, `../foo`) are joined against
   * the consumer's `origin` remote, picked up by reading
   * `git remote get-url origin` inside `consumerRoot`. The updater
   * is intentionally not involved — reads against git config live
   * in the reader; the updater only writes.
   *
   * @param {string} consumerRoot
   * @param {string} repoUrl
   * @returns {string}
   */
  static _resolveRepoUrl(consumerRoot, repoUrl) {
    if (GitDependencyUpdater._isAbsoluteRepoUrl(repoUrl)) {
      return repoUrl;
    }
    const result = childProcess.spawnSync(
      'git',
      [
        'remote',
        'get-url',
        'origin',
      ],
      { cwd: consumerRoot, env: process.env, encoding: 'utf8' },
    );
    if (result.status !== 0) {
      throw new Error(
        `[${LOG_TAG}] git remote get-url origin exited with status ${result.status}: `
          + (result.stderr || '').trim(),
      );
    }
    const origin = (result.stdout || '').trim();
    const split = GitDependencyUpdater._splitRepoUrl(origin);
    if (!split) {
      throw new Error(
        `[${LOG_TAG}] cannot resolve relative repo "${repoUrl}" `
          + `against unrecognised consumer origin "${GitDependencyUpdater._redactUrl(origin)}".`,
      );
    }
    let resolved = path.posix.join(split.path, repoUrl);
    if (!resolved.endsWith('.git')) {
      resolved = `${resolved}.git`;
    }
    return split.prefix + resolved;
  }

  /**
   * Returns the active SSH key path. Reads the mutable
   * `config.sshKeyPath` override; falls back to `ssh-key.txt` sitting
   * next to this file when the override is falsy. Lives on the
   * reader because resolving a key is a read against process / fs
   * configuration; the updater only consumes the resolved path.
   *
   * @param {string | null} [overridePath]
   * @returns {string}
   */
  static _resolveSshKeyPath(overridePath = null) {
    return (
      config.sshKeyPath || overridePath || path.join(__dirname, 'ssh-key.txt')
    );
  }

  /**
   * Parses and validates `@auth-modes`. Returns a non-empty ordered
   * list of mode strings; downstream code can treat it as already
   * valid. Accepts a comma-separated string (`"ssh, inline"`) or an
   * array of strings (`["ssh", "inline"]`). Returns a fresh copy of
   * the defaults when the entry is missing — the `tryUrl` loop reorders
   * this list in place on success, so each entry must own its array.
   * Throws on malformed values or unknown modes.
   *
   * @param {unknown} entry
   * @param {string} repoUrl
   * @param {string} pkgPath
   * @returns {string[]}
   */
  static _parseAuthModes(entry, repoUrl, pkgPath) {
    if (entry === undefined) {
      return GitDepReader.defaultAuthModes();
    }
    let candidates;
    if (typeof entry === 'string') {
      candidates = entry.split(',');
    } else if (Array.isArray(entry)) {
      candidates = entry;
    } else {
      throw new Error(
        `[${LOG_TAG}] invalid gitDependencies["${repoUrl}"]["@auth-modes"] in ${pkgPath}; expected a comma-separated string or an array of strings.`,
      );
    }
    const modes = [];
    for (const raw of candidates) {
      if (typeof raw !== 'string') {
        throw new Error(
          `[${LOG_TAG}] invalid gitDependencies["${repoUrl}"]["@auth-modes"] in ${pkgPath}; every entry must be a string.`,
        );
      }
      const mode = raw.trim().toLowerCase();
      if (mode.length === 0) {
        continue;
      }
      if (!AUTH_MODES.has(mode)) {
        throw new Error(
          `[${LOG_TAG}] invalid gitDependencies["${repoUrl}"]["@auth-modes"] in ${pkgPath}; unknown mode "${mode}", expected one of ${[...AUTH_MODES].map(m => `"${m}"`).join(', ')}.`,
        );
      }
      modes.push(mode);
    }
    if (modes.length === 0) {
      throw new Error(
        `[${LOG_TAG}] invalid gitDependencies["${repoUrl}"]["@auth-modes"] in ${pkgPath}; expected at least one mode.`,
      );
    }
    return modes;
  }

  /**
   * Expands `entry.authModes` into the concrete URL list `tryUrl`
   * walks through. Each viable mode contributes one URL: `"ssh"`
   * yields the SSH-form URL after applying the bundled deploy key
   * via `_prepareSshEnvironment` (skipped silently when the key is
   * missing); `"inline"` yields the HTTPS+userinfo URL the consumer
   * origin already exposes (skipped when there is no userinfo to
   * reuse). Modes whose precondition fails are dropped so the
   * returned list is exactly what the updater can attempt.
   *
   * Knows about auth modes — the updater does not. Reads against
   * `consumerRoot`'s git config and the bundled SSH key go through
   * the reader's own static helpers. Callers store the result on
   * `updater.repoUrlList` and let `tryUrl` handle iteration,
   * reorder-on-success, and per-attempt warnings.
   *
   * @param {GitDepEntry} entry
   * @param {string} consumerRoot
   * @returns {string[]}
   */
  static _expandAuthModesToUrl(entry, consumerRoot) {
    const baseUrl = GitDepReader._resolveRepoUrl(consumerRoot, entry.repoUrl);
    const wasRelative = !GitDependencyUpdater._isAbsoluteRepoUrl(entry.repoUrl);
    const links = [];
    for (const mode of entry.authModes) {
      if (mode === 'ssh') {
        const keyPath = GitDepReader._resolveSshKeyPath(entry.sshKeyPath);
        if (!fs.existsSync(keyPath)) continue;
        GitDependencyUpdater._prepareSshEnvironment(keyPath);
        links.push(wasRelative ? GitDepReader._toSshUrl(baseUrl) : baseUrl);
      } else if (mode === 'inline') {
        if (!GitDepReader._extractInlineUserinfo(baseUrl)) continue;
        links.push(baseUrl);
      }
    }
    return links;
  }

  /**
   * Builds the URL list for `updater` from `entry.authModes`, parks
   * it on `updater.repoUrlList`, and emits the auth-mode-policy
   * hint when the list is empty AND there is no existing checkout
   * to fall back to. The hint lives here (not inside `tryUrl`)
   * so the updater stays oblivious to auth-mode bookkeeping.
   *
   * @param {GitDepEntry} entry
   * @param {GitDependencyUpdater} updater
   * @returns {void}
   */
  static _attachRepoUrlList(entry, updater) {
    updater.repoUrlList = GitDepReader._expandAuthModesToUrl(
      entry,
      updater.consumerRoot,
    );
    if (updater.repoUrlList.length > 0) {
      return;
    }
    const gitDir = path.join(updater.targetFolder, '.git');
    if (fs.existsSync(gitDir)) {
      return;
    }
    const sshKeyRelPath = path.relative(
      updater.consumerRoot,
      path.join(__dirname, 'ssh-key.txt'),
    );
    updater.log.warning([
      'WARNING: no auth mode worked and no existing checkout found at:',
      `  ${updater.log.formatPath(updater.targetFolder)}`,
      `  Add a deploy key at ${sshKeyRelPath}, or set`,
      '  "@auth-modes": "ssh, inline" with an HTTPS+token origin, or clone',
      `  ${updater.repoUrl} into the folder above by hand.`,
    ]);
  }

  /**
   * Converts `http(s)://[user[:pat]@]host/path` to `git@host:path`,
   * dropping any embedded userinfo. Returns the input unchanged for
   * SSH-form or `git://` URLs.
   *
   * @param {string} url
   * @returns {string}
   */
  static _toSshUrl(url) {
    const match = /^https?:\/\/(?:[^@/]+@)?([^/]+)\/(.+)$/i.exec(url);
    if (!match) {
      return url;
    }
    return `git@${match[1]}:${match[2]}`;
  }

  /**
   * Returns the `user[:token]` segment from an HTTPS/HTTP URL, or
   * `null` if there's no userinfo or the URL isn't HTTP-shaped.
   *
   * @param {string} url
   * @returns {string | null}
   */
  static _extractInlineUserinfo(url) {
    const match = /^https?:\/\/([^@/]+)@[^/]+\/.+/i.exec(url);
    return match ? match[1] : null;
  }

  /**
   * Collapses SSH (`git@host:path`) and HTTPS (`https://user:tok@host/path`)
   * forms to a comparable `host/path` identity so two URLs that differ
   * only in auth can be detected as the same logical repo.
   *
   * @param {string} url
   * @returns {string}
   */
  static _canonicalRepoIdentity(url) {
    const sshMatch = /^[^@/]+@([^:]+):(.+)$/.exec(url);
    const stripped = sshMatch
      ? `${sshMatch[1]}/${sshMatch[2]}`
      : url.replace(/^[a-z]+:\/\/(?:[^@/]+@)?/i, '');
    return stripped.replace(/\.git$/, '').toLowerCase();
  }

  /**
   * Parses one JSON file, either throwing or warning on failure
   * depending on whether the caller requires it.
   *
   * @param {string} filePath
   * @param {boolean} isRequired
   * @param {string} [basePath]
   * @returns {unknown | null}
   */
  static parseJson(filePath, isRequired, basePath = process.cwd()) {
    const source = fs.readFileSync(filePath, 'utf8');
    try {
      return JSON.parse(source);
    } catch (err) {
      const { location, reason } = GitDepReader._formatJsonParseFailure(
        filePath,
        isRequired ? null : basePath,
        source,
        err,
      );
      if (isRequired) {
        throw new Error(`Failed to parse JSON at ${location}: ${reason}`);
      }
      const log = new GitDepLogger(LOG_TAG, basePath);
      log.warning([
        'WARNING: failed to parse optional JSON at',
        `${location}: ${reason}`,
        `continuing without reuse from ${log.formatPath(filePath)}.`,
      ]);
      return null;
    }
  }

  /**
   * Applies a filter to the reader's entries.
   *
   * @param {(entry: GitDepEntry) => unknown} filter
   * @returns {GitDepReader}
   */
  setFilter(filter) {
    this.filter = GitDepReader._wrapFilter(filter);
    return this;
  }

  /**
   * Applies one force-mode choice to every updater built by the reader.
   *
   * @param {boolean} forceMode
   * @returns {GitDepReader}
   */
  setForceMode(forceMode) {
    this.isForceMode = Boolean(forceMode);
    return this;
  }

  /**
   * Builds the filtered dependency entries.
   *
   * @returns {GitDepEntry[]}
   */
  toArray() {
    if (!this.filter) {
      return [...this.entries];
    }
    return this.entries.filter(entry => this.filter(entry));
  }

  /**
   * Resolves the selected git tag for every filtered dependency.
   *
   * `prepareUpdater`, when given, runs against each freshly built
   * updater before its first log line. Callers use it to retarget
   * `updater.log` (e.g. the reuse script points it at the outer
   * consumer so paths render relative to where the user invoked the
   * script, not the sibling repo the resolved updater happens to
   * live in).
   *
   * @param {((updater: GitDependencyUpdater) => void) | null} [prepareUpdater]
   * @returns {GitDepEntry[]}
   */
  resolveVersions(prepareUpdater = null) {
    return this.toArray().map(entry => {
      if (entry.versionSpec === '*') {
        return {
          ...entry,
          versionTag: '*',
        };
      }
      const updater = new GitDependencyUpdater(
        entry.targetFolder,
        entry.versionSpec,
        entry.repoUrl,
        entry.sshKeyPath,
      );
      GitDepReader._attachRepoUrlList(entry, updater);
      updater.isForceMode = this.isForceMode;
      if (prepareUpdater) {
        prepareUpdater(updater);
      }
      updater.log.info(
        `loading info: ${updater.log.formatPath(updater.targetFolder)}`,
      );
      let tags = [];
      updater.tryUrl(() => {
        tags = updater._listGitTagsRemoteCached();
      });
      return {
        ...entry,
        versionTag:
          tags.length > 0
            ? GitDependencyUpdater._findBestMatchingTag(tags, entry.versionSpec)
            : null,
      };
    });
  }

  /**
   * Builds a fresh updater for each filtered dependency.
   *
   * @returns {IterableIterator<GitDependencyUpdater>}
   */
  *toIterator() {
    for (const entry of this.toArray()) {
      const updater = new GitDependencyUpdater(
        entry.targetFolder,
        entry.versionSpec,
        entry.repoUrl,
        entry.sshKeyPath,
      );
      const initialRepoUrlList = updater.repoUrlList;
      updater._populateRepoUrlList = () => {
        if (updater.repoUrlList !== initialRepoUrlList) return;
        GitDepReader._attachRepoUrlList(entry, updater);
      };
      updater.isForceMode = this.isForceMode;
      yield updater;
    }
  }

  /**
   * Runs every updater selected by the current filter.
   *
   * @returns {void}
   */
  runAll() {
    for (const updater of this.toIterator()) {
      updater.run();
    }
  }

  /**
   * Normalizes filter callbacks, including arrow-block expressions
   * like `entry => {entry.versionSpec == '1.0.1'}`.
   *
   * @param {(entry: GitDepEntry) => unknown} filter
   * @returns {(entry: GitDepEntry) => boolean}
   */
  static _wrapFilter(filter) {
    const fallback = GitDepReader._buildExpressionFilter(filter);
    return entry => {
      const result = filter(entry);
      if (result !== undefined) {
        return Boolean(result);
      }
      if (!fallback) {
        return false;
      }
      return Boolean(fallback(entry));
    };
  }

  /**
   * Rebuilds a block-body arrow expression into a predicate when the
   * callback forgot an explicit `return`.
   *
   * @param {Function} filter
   * @returns {((entry: unknown) => unknown) | null}
   */
  static _buildExpressionFilter(filter) {
    const source = String(filter).trim();
    if (/\breturn\b/.test(source)) {
      return null;
    }
    const match = /^\(?\s*([$\w]+)\s*\)?\s*=>\s*\{([\s\S]*)\}\s*$/.exec(source);
    if (!match) {
      return null;
    }
    const expression = match[2].trim().replace(/;$/, '');
    if (expression.length === 0) {
      return null;
    }
    try {
      return new Function(match[1], `return (${expression});`);
    } catch {
      return null;
    }
  }

  /**
   * Parses one force flag value.
   *
   * @param {string | undefined} value
   * @returns {boolean}
   */
  static booleanCast(value) {
    if (!value) {
      return false;
    }
    const normalized = String(value).trim().toLowerCase();
    return (
      normalized.length > 0
      && normalized !== '0'
      && normalized !== 'off'
      && !normalized.startsWith('false')
    );
  }

  /**
   * Finds the source location of one gitDependencies version key.
   *
   * @param {string} filePath
   * @param {string} source
   * @param {string} repoUrl
   * @param {string} versionSpec
   * @returns {string}
   */
  static _findGitDependencyVersionLocation(
    filePath,
    source,
    repoUrl,
    versionSpec,
  ) {
    const repoNeedle = JSON.stringify(repoUrl);
    const versionNeedle = JSON.stringify(versionSpec);
    const repoOffset = source.indexOf(repoNeedle);
    const versionOffset = source.indexOf(
      versionNeedle,
      repoOffset >= 0 ? repoOffset + repoNeedle.length : 0,
    );
    if (versionOffset < 0) {
      return GitDepLogger.formatPathForError(filePath);
    }
    return GitDepReader._formatSourceOffsetLocation(
      GitDepLogger.formatPathForError(filePath),
      source,
      versionOffset,
    );
  }

  /**
   * Converts one source offset into a `path:line:column` location.
   *
   * @param {string} displayPath
   * @param {string} source
   * @param {number} offset
   * @returns {string}
   */
  static _formatSourceOffsetLocation(displayPath, source, offset) {
    const before = source.slice(0, offset);
    const lines = before.split('\n');
    return (
      `${displayPath}:`
      + `${lines.length}:${lines[lines.length - 1].length + 1}`
    );
  }

  /**
   * Builds one parse-failure summary with a path-based location.
   *
   * @param {string} filePath
   * @param {string | null} basePath
   * @param {string} source
   * @param {unknown} err
   * @returns {{ location: string, reason: string }}
   */
  static _formatJsonParseFailure(filePath, basePath, source, err) {
    const message =
      err && typeof err === 'object' && 'message' in err
        ? String(err.message)
        : String(err);
    const reason = message.replace(/\s+at position \d+.*$/i, '').trim();
    const displayPath =
      basePath == null
        ? GitDepLogger.formatPathForError(filePath)
        : GitDepLogger.formatPathForLog(filePath, basePath);
    const lineMatch = /line (\d+) column (\d+)/i.exec(message);
    if (lineMatch) {
      return {
        location: `${displayPath}:${lineMatch[1]}:${lineMatch[2]}`,
        reason,
      };
    }
    const positionMatch = /position (\d+)/i.exec(message);
    if (!positionMatch) {
      return {
        location: displayPath,
        reason,
      };
    }
    return {
      location:
        basePath == null
          ? GitDepReader._formatSourceOffsetLocation(
              GitDepLogger.formatPathForError(filePath),
              source,
              Number(positionMatch[1]),
            )
          : GitDepReader._formatSourceOffsetLocation(
              displayPath,
              source,
              Number(positionMatch[1]),
            ),
      reason,
    };
  }
}

/**
 * Fetches any git-dependency that target's given folder or its sub-folders.
 *
 * @param {string} targetFolder
 * @param {boolean} [forceMode]
 * @param {(updater: GitDependencyUpdater) => void} [configureUpdater]
 * @param {GitDepEntry | null} [inheritAuthFromEntry] - Forwarded to
 *   `GitDepReader.fromFolder` so a sibling-reuse fetch honours the
 *   consumer's auth choices.
 * @returns {void}
 */
function fetchGitDependencies(
  targetFolder,
  forceMode = GitDepReader.isForced(),
  configureUpdater = null,
  inheritAuthFromEntry = null,
) {
  const absoluteTarget = path.resolve(targetFolder);
  const reader = GitDepReader.fromFolder(
    targetFolder,
    inheritAuthFromEntry,
  ).setFilter(entry => {
    if (entry.targetFolder.startsWith(absoluteTarget)) {
      if (entry.targetFolder.length <= absoluteTarget.length) {
        return true;
      }
      const char = entry.targetFolder.charAt(absoluteTarget.length);
      return char === '/' || char === '\\';
    }
    return false;
  });
  reader.setForceMode(forceMode);
  const entries = reader.toArray();
  if (entries.length === 0) {
    // Clone a direct `@reuse` external checkout that no consumer
    // declares, instead of failing.
    //
    // A `@reuse` path ending in `/.` may point at a shared sibling
    // folder outside any consumer tree, so no gitDependencies entry
    // targets it. When the caller passed the originating entry, clone
    // that entry's own repo straight into the path, reusing the same
    // auth-mode expansion (SSH key plus URL fallbacks) that
    // `toIterator` sets up, so the external clone honours the same
    // credentials a declared dependency would.
    if (inheritAuthFromEntry) {
      const entry = { ...inheritAuthFromEntry, targetFolder: absoluteTarget };
      const updater = new GitDependencyUpdater(
        entry.targetFolder,
        entry.versionSpec,
        entry.repoUrl,
        entry.sshKeyPath,
      );
      const initialRepoUrlList = updater.repoUrlList;
      updater._populateRepoUrlList = () => {
        if (updater.repoUrlList !== initialRepoUrlList) return;
        GitDepReader._attachRepoUrlList(entry, updater);
      };
      updater.isForceMode = forceMode;
      if (configureUpdater) {
        configureUpdater(updater);
      }
      updater.run();
      return;
    }
    throw new Error(
      `[${LOG_TAG}] no gitDependencies entry targets ${GitDepLogger.formatPathForError(absoluteTarget)}.`,
    );
  }
  for (const updater of reader.toIterator()) {
    if (configureUpdater) {
      configureUpdater(updater);
    }
    updater.run();
  }
}

module.exports = {
  fetchGitDependencies,
  GitDepEntry,
  GitDepLogger,
  GitDepReader,
  GitDependencyUpdater,
  LOG_TAG,
  config,
};

// Run the bootstrap when this file is invoked directly from the
// shell (postinstall path), but stay quiet when another script
// `require()`s it for re-use. The bundled `git-dependency-reuse.js`
// does exactly that to chain its sibling-prefer + build steps after
// the universal fetch.
if (require.main === module) {
  try {
    GitDepReader.fromFolder(__dirname)
      .setForceMode(GitDepReader.isForced())
      .runAll();
  } catch (err) {
    GitDepLogger.onCriticalError(err);
  }
}
