#!/usr/bin/env node
// noinspection JSUnusedGlobalSymbols

'use strict';

/**
 * Postinstall wrapper that reuses compatible git dependencies from a
 * sibling consumer when one `gitDependencies` entry opts in via
 * `@reuse`.
 *
 * Dependencies without `@reuse` fall straight through to the normal
 * `git-dependencies.js` bootstrap.
 */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

/** @typedef {import('./git-dependencies').GitDepEntry} GitDepEntry */

const {
  fetchGitDependencies,
  GitDepReader,
  GitDepLogger,
  GitDependencyUpdater,
  LOG_TAG,
} = require('./git-dependencies');

/** Runs the postinstall reuse flow for every configured dependency. */
function main() {
  const consumerRoot = resolveConsumerRoot();
  for (const entry of GitDepReader.fromConsumer(consumerRoot).toArray()) {
    syncDependency(consumerRoot, entry);
  }
}

/**
 * Syncs one dependency, reusing a sibling checkout only when `@reuse`
 * resolves to a compatible consumer.
 *
 * @param {string} consumerRoot
 * @param {GitDepEntry} entry
 * @param {(targetFolder: string, forceMode?: boolean, configureUpdater?: (updater: typeof GitDependencyUpdater.prototype) => void) => void} fetchDependency
 * @returns {void}
 */
function syncDependency(
  consumerRoot,
  entry,
  fetchDependency = fetchGitDependencies,
) {
  const forceMode = GitDepReader.isForced();
  if (entry.reuse === undefined) {
    fetchOwnDependency(entry, fetchDependency, forceMode);
    return;
  }
  // A `@reuse` address ending in `/.` names the dependency checkout itself
  // (not a sibling consumer), so it is resolved straight from git.
  if (isDirectCheckoutReuse(entry.reuse)) {
    syncDirectCheckoutReuse(consumerRoot, entry, fetchDependency);
    return;
  }
  const targetRoot = getTargetRoot(consumerRoot, entry);
  if (!targetRoot) {
    logCannotReuse(entry, 'invalid @reuse; expected a non-empty string.');
    fetchOwnDependency(entry, fetchDependency, forceMode);
    return;
  }
  const linkRefusal = getReuseLinkRefusal(entry.targetFolder);
  if (linkRefusal) {
    logCannotReuse(entry, linkRefusal);
    fetchOwnDependency(entry, fetchDependency, forceMode);
    return;
  }
  const { reason, reuseEntry, targetUrlList } = resolveReusableEntry(
    consumerRoot,
    entry,
    targetRoot,
  );
  if (!reuseEntry) {
    if (reason) {
      logCannotReuse(entry, reason);
    }
    fetchOwnDependency(entry, fetchDependency, forceMode);
    return;
  }

  try {
    fetchDependency(
      reuseEntry.targetFolder,
      false,
      updater => {
        updater.log.rootDir = consumerRoot;
        if (targetUrlList) {
          // Reuse the list `resolveReusableEntry` already promoted the
          // winning URL inside, so the third-phase fetch starts from
          // the working URL and skips the redundant retry.
          updater.repoUrlList = targetUrlList;
        }
        if (forceMode) {
          updater.onBeforeFail = () => {
            logReuseForceHint();
          };
        }
        updater._exit = code => {
          const err = new Error(`[${LOG_TAG}] reuse dependency failed`);
          err.exitCode = code;
          err.isReuseDependencyFailure = true;
          throw err;
        };
      },
      entry,
    );
  } catch (err) {
    if (isReuseDependencyFailure(err)) {
      fetchOwnDependency(entry, fetchDependency, forceMode);
      return;
    }
    throw err;
  }
  if (forceMode) {
    fetchOwnDependency(entry, fetchDependency, forceMode);
    return;
  }
  linkDependencyTarget(entry.targetFolder, reuseEntry.targetFolder);
  pointDependencyLinkAt(consumerRoot, reuseEntry.targetFolder);
  new GitDepLogger(LOG_TAG, consumerRoot).info(
    `reusing ${formatReusePath(consumerRoot, reuseEntry.targetFolder)}`
      + ` for ${formatReusePath(consumerRoot, entry.targetFolder)}`,
  );
}

/**
 * Resolves the sibling dependency entry selected by `@reuse`.
 *
 * @param {string} consumerRoot
 * @param {GitDepEntry} entry
 * @param {string | null} [targetRoot]
 * @returns {{ reason: string | null, reuseEntry: GitDepEntry | null }}
 */
function resolveReusableEntry(
  consumerRoot,
  entry,
  targetRoot = getTargetRoot(consumerRoot, entry),
) {
  if (!targetRoot) {
    return {
      reason: 'no @reuse consumer configured.',
      reuseEntry: null,
    };
  }
  const reusePkg = path.join(targetRoot, 'package.json');
  if (!fs.existsSync(reusePkg)) {
    return {
      reason:
        `${formatReusePath(consumerRoot, targetRoot)} is missing package.json,`
        + ` so ${formatReusePath(consumerRoot, entry.targetFolder)} cannot reuse it.`,
      reuseEntry: null,
    };
  }
  if (!GitDepReader.parseJson(reusePkg, false, consumerRoot)) {
    return {
      reason: null,
      reuseEntry: null,
    };
  }

  const ownTargetKey = getRelativeTargetKey(consumerRoot, entry.targetFolder);
  // `prepareOwn` snapshots the consumer-side updater's resolved URL
  // and the `repoUrlList` the reader built from `entry.authModes`.
  // `prepareTarget` then resolves the target consumer's URL for the
  // same entry: same canonical origin means we can hand the target
  // updater the consumer's array by reference, so a winning URL the
  // consumer-side discovers carries over (and is already first when
  // the target's `tryUrl` runs). When the canonical origins
  // differ, the consumer's URLs are appended after the target's so
  // they remain as a fallback without overriding the target's
  // preferred order.
  let ownOriginUrl = null;
  let ownUrlList = null;
  let targetUrlList = null;
  const prepareOwn = updater => {
    updater.log.rootDir = consumerRoot;
    ownUrlList = updater.repoUrlList;
    try {
      ownOriginUrl = GitDepReader._resolveRepoUrl(
        updater.consumerRoot,
        updater.repoUrl,
      );
    } catch {
      // intentionally empty
    }
  };
  const prepareTarget = updater => {
    updater.log.rootDir = consumerRoot;
    if (!ownUrlList || !ownOriginUrl) return;
    try {
      const targetUrl = GitDepReader._resolveRepoUrl(
        updater.consumerRoot,
        updater.repoUrl,
      );
      if (
        GitDepReader._canonicalRepoIdentity(ownOriginUrl)
        === GitDepReader._canonicalRepoIdentity(targetUrl)
      ) {
        updater.repoUrlList = ownUrlList;
      } else {
        updater.repoUrlList = [
          ...(updater.repoUrlList || []),
          ...ownUrlList,
        ];
      }
      targetUrlList = updater.repoUrlList;
    } catch {
      // intentionally empty
    }
  };
  const ownResolved = GitDepReader.fromConsumer(consumerRoot, entry)
    .setFilter(candidate => candidate.targetFolder === entry.targetFolder)
    .resolveVersions(prepareOwn)[0];
  let reuseReader;
  try {
    reuseReader = GitDepReader.fromConsumer(targetRoot, entry);
  } catch (err) {
    return {
      reason:
        err && typeof err === 'object' && 'message' in err
          ? String(err.message)
          : String(err),
      reuseEntry: null,
    };
  }
  const reuseEntry = reuseReader
    .toArray()
    .find(
      candidate =>
        candidate.repoUrl === entry.repoUrl
        && getRelativeTargetKey(targetRoot, candidate.targetFolder)
          === ownTargetKey,
    );

  if (!reuseEntry) {
    return {
      reason:
        `${formatReusePath(consumerRoot, targetRoot)} has no gitDependencies entry`
        + ` for ${entry.repoUrl}.`,
      reuseEntry: null,
    };
  }

  const reuseResolved = reuseReader
    .setFilter(
      candidate =>
        candidate.repoUrl === entry.repoUrl
        && getRelativeTargetKey(targetRoot, candidate.targetFolder)
          === ownTargetKey,
    )
    .resolveVersions(prepareTarget)[0];
  if (!ownResolved || !ownResolved.versionTag) {
    return {
      reason:
        `${formatReusePath(consumerRoot, entry.targetFolder)} resolved no git tag for`
        + ` ${entry.versionSpec}.`,
      reuseEntry: null,
    };
  }
  if (!reuseResolved || !reuseResolved.versionTag) {
    return {
      reason:
        `${formatReusePath(consumerRoot, reuseEntry.targetFolder)} resolved no git tag for`
        + ` ${reuseEntry.versionSpec}.`,
      reuseEntry: null,
    };
  }
  if (ownResolved.versionTag !== reuseResolved.versionTag) {
    // Notes: in case we want to make this more verbose,
    // the reuse requester's path is:
    // ```
    // formatReusePath(consumerRoot, entry.targetFolder)
    // ```
    // and reuse target: `formatReusePath(consumerRoot, reuseEntry.targetFolder)`
    return {
      reason:
        `    Because the version-spec of that resolves to: ${reuseResolved.versionTag}`
        + `\n    while on the other hand, our own resolves to: ${ownResolved.versionTag}.`,
      reuseEntry: null,
    };
  }

  return {
    reason: null,
    reuseEntry,
    targetUrlList,
  };
}

/**
 * Resolves the sibling consumer path requested by `entry.reuse`.
 *
 * @param {string} consumerRoot
 * @param {GitDepEntry} entry
 * @returns {string | null}
 */
function getTargetRoot(consumerRoot, entry) {
  const reuse = entry.reuse;
  if (typeof reuse !== 'string' || reuse.trim().length === 0) {
    return null;
  }
  return path.resolve(consumerRoot, reuse);
}

/**
 * Reports whether `@reuse` requests direct-checkout mode: an address ending in
 * `/.` (or `\.`) means it points at the dependency's own checkout rather than a
 * sibling consumer.
 *
 * @param {unknown} reuse
 * @returns {boolean}
 */
function isDirectCheckoutReuse(reuse) {
  return typeof reuse === 'string' && /[\\/]\.$/.test(reuse.trim());
}

/**
 * Reuses (or first clones) the dependency checkout that a `/.`-suffixed
 * `@reuse` points at directly. Unlike the sibling-consumer path this target IS
 * the dependency's checkout, so its version is read straight from git (closest
 * version-style tag) instead of from a `gitDependencies` entry. The consumer's
 * target folder is symlinked to it; when the checkout does not yet exist the
 * dependency is cloned there first (`/.` = "clone here if absent").
 *
 * @param {string} consumerRoot
 * @param {GitDepEntry} entry
 * @param {(targetFolder: string, forceMode?: boolean, configureUpdater?: (updater: typeof GitDependencyUpdater.prototype) => void, entry?: GitDepEntry) => void} fetchDependency
 * @returns {void}
 */
function syncDirectCheckoutReuse(
  consumerRoot,
  entry,
  fetchDependency = fetchGitDependencies,
) {
  const forceMode = GitDepReader.isForced();
  const checkout = getTargetRoot(consumerRoot, entry);
  const log = new GitDepLogger(LOG_TAG, consumerRoot);

  if (!checkout) {
    logCannotReuse(entry, 'invalid @reuse; expected a non-empty path.');
    fetchOwnDependency(entry, fetchDependency, forceMode);
    return;
  }

  const linkRefusal = getReuseLinkRefusal(entry.targetFolder);
  if (linkRefusal) {
    logCannotReuse(entry, linkRefusal);
    fetchOwnDependency(entry, fetchDependency, forceMode);
    return;
  }

  // `/.` means "clone here if absent" — populate the checkout before reusing.
  if (!fs.existsSync(path.join(checkout, '.git'))) {
    log.info(
      `cloning direct @reuse checkout at ${formatReusePath(consumerRoot, checkout)}`,
    );
    fetchDependency(
      checkout,
      forceMode,
      updater => {
        updater.log.rootDir = consumerRoot;
      },
      entry,
    );
  }

  // Read the version straight from the checkout's git, not a package.json.
  const resolvedTag = readClosestVersionTag(checkout);
  if (!resolvedTag) {
    logCannotReuse(
      entry,
      `no version-style git tag at ${formatReusePath(consumerRoot, checkout)}.`,
    );
    fetchOwnDependency(entry, fetchDependency, forceMode);
    return;
  }
  if (
    !GitDependencyUpdater._findBestMatchingTag([resolvedTag], entry.versionSpec)
  ) {
    logCannotReuse(
      entry,
      `${formatReusePath(consumerRoot, checkout)} is ${resolvedTag},`
        + ` which does not satisfy "${entry.versionSpec}".`,
    );
    fetchOwnDependency(entry, fetchDependency, forceMode);
    return;
  }

  linkDependencyTarget(entry.targetFolder, checkout);
  pointDependencyLinkAt(consumerRoot, checkout);
  log.info(
    `reusing checkout ${formatReusePath(consumerRoot, checkout)} (${resolvedTag})`
      + ` for ${formatReusePath(consumerRoot, entry.targetFolder)}`,
  );
}

/**
 * Reads the closest version-style git tag (`X.Y.Z` / `vX.Y.Z`) reachable from
 * the checkout's HEAD, falling back to the closest tag of any style when that
 * one also parses as a version. Returns `''` when none is found.
 *
 * @param {string} checkout
 * @returns {string}
 */
function readClosestVersionTag(checkout) {
  const versionMatches = [
    '[0-9]*.[0-9]*.[0-9]*',
    'v[0-9]*.[0-9]*.[0-9]*',
  ];
  for (const match of versionMatches) {
    const described = runGitCapture(
      [
        'describe',
        '--tags',
        '--abbrev=0',
        `--match=${match}`,
      ],
      checkout,
    );
    if (described && described.trim()) {
      return described.trim();
    }
  }
  const closest = runGitCapture(
    [
      'describe',
      '--tags',
      '--abbrev=0',
    ],
    checkout,
  );
  const tag = closest ? closest.trim() : '';
  return GitDependencyUpdater._parseSemverTag(tag) ? tag : '';
}

/**
 * Runs `git <args>` in `cwd`, returning stdout on success or `null` on failure.
 *
 * @param {readonly string[]} args
 * @param {string} cwd
 * @returns {string | null}
 */
function runGitCapture(args, cwd) {
  const result = childProcess.spawnSync('git', args, {
    cwd,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    return null;
  }
  return result.stdout;
}

/**
 * Formats one reuse-side path for user-facing logs.
 *
 * @param {string} consumerRoot
 * @param {string} targetPath
 * @returns {string}
 */
function formatReusePath(consumerRoot, targetPath) {
  return GitDepLogger.formatPathForLog(targetPath, consumerRoot);
}

/**
 * Builds one stable relative target key for cross-consumer matching.
 *
 * @param {string} consumerRoot
 * @param {string} targetFolder
 * @returns {string}
 */
function getRelativeTargetKey(consumerRoot, targetFolder) {
  return path.relative(consumerRoot, targetFolder).replace(/\\/g, '/');
}

/**
 * Removes one reused symlink before falling back to the dependency's
 * own checkout.
 *
 * @param {GitDepEntry} entry
 * @param {(targetFolder: string, forceMode?: boolean, configureUpdater?: (updater: typeof GitDependencyUpdater.prototype) => void) => void} fetchDependency
 * @param {boolean} forceMode
 * @returns {void}
 */
function fetchOwnDependency(
  entry,
  fetchDependency = fetchGitDependencies,
  forceMode = GitDepReader.isForced(),
) {
  if (isSymlinkAt(entry.targetFolder)) {
    fs.unlinkSync(entry.targetFolder);
  }
  fetchDependency(entry.targetFolder, forceMode);
}

/** Reports whether `err` requests a recoverable reuse-only exit. */
function isReuseDependencyFailure(err) {
  return Boolean(
    err
    && typeof err === 'object'
    && err.isReuseDependencyFailure
    && err.exitCode,
  );
}

/** Reports why force mode is not forwarded into a reused target. */
function logReuseForceHint() {
  new GitDepLogger(LOG_TAG).warning([
    'The --force and FORCE_MODE are not forwarded to @reuse targets, '
      + 'hence run `yarn install:force` manually in said folder.',
  ]);
}

/**
 * Reports why one dependency could not be reused.
 *
 * @param {GitDepEntry} entry
 * @param {string | null} reason
 * @returns {void}
 */
function logCannotReuse(entry, reason) {
  const consumerRoot = GitDepReader.findConsumerRoot(entry.targetFolder);
  const log = new GitDepLogger(LOG_TAG, consumerRoot);
  const targetRoot = getTargetRoot(consumerRoot, entry);
  const reuseLabel = targetRoot
    ? formatReusePath(consumerRoot, targetRoot)
    : entry.repoUrl;
  log.warning([
    `WARNING: cannot reuse ${formatReusePath(consumerRoot, entry.targetFolder)} from ${reuseLabel}.`,
    ...(reason ? [reason] : []),
  ]);
}

/**
 * Reports whether the target path is safe to replace with a reused
 * checkout symlink.
 *
 * @param {string} targetFolder
 * @returns {string | null}
 */
function getReuseLinkRefusal(targetFolder) {
  let stat;
  try {
    stat = fs.lstatSync(targetFolder);
  } catch {
    return null;
  }
  if (stat.isSymbolicLink()) {
    return null;
  }
  if (!stat.isDirectory()) {
    return `${targetFolder} is not a directory or symlink.`;
  }
  if (!fs.existsSync(path.join(targetFolder, '.git'))) {
    return `${targetFolder} exists without a .git checkout.`;
  }
  return null;
}

/**
 * Ensures `targetFolder` is a symlink pointing at `reuseTargetFolder`.
 * Idempotent across repeated postinstall runs.
 *
 * @param {string} targetFolder
 * @param {string} reuseTargetFolder
 * @returns {void}
 */
function linkDependencyTarget(targetFolder, reuseTargetFolder) {
  const absoluteReuse = path.resolve(reuseTargetFolder);

  let stat;
  try {
    stat = fs.lstatSync(targetFolder);
  } catch {
    fs.mkdirSync(path.dirname(targetFolder), { recursive: true });
    fs.symlinkSync(absoluteReuse, targetFolder, 'junction');
    return;
  }

  if (stat.isSymbolicLink()) {
    let currentTarget = null;
    try {
      currentTarget = fs.realpathSync(targetFolder);
    } catch {
      // Dangling symlink — fall through to relink below.
    }
    const desiredTarget = fs.realpathSync(absoluteReuse);
    if (currentTarget === desiredTarget) {
      return;
    }
    fs.unlinkSync(targetFolder);
    fs.symlinkSync(absoluteReuse, targetFolder, 'junction');
    return;
  }

  fs.rmSync(targetFolder, { recursive: true, force: true });
  fs.symlinkSync(absoluteReuse, targetFolder, 'junction');
}

/**
 * Repoints the consumer's installed package link at `targetFolder`.
 *
 * @param {string} consumerRoot
 * @param {string} targetFolder
 * @returns {void}
 */
function pointDependencyLinkAt(consumerRoot, targetFolder) {
  const pkgPath = path.join(targetFolder, 'package.json');
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
    path.join(consumerRoot, 'node_modules', pkgName),
    targetFolder,
  );
}

/** Reports whether `target` exists and is a symbolic link. */
function isSymlinkAt(target) {
  try {
    return fs.lstatSync(target).isSymbolicLink();
  } catch {
    return false;
  }
}

/** Returns the consumer project root that triggered the postinstall. */
function resolveConsumerRoot() {
  return GitDepReader.findConsumerRoot(__dirname);
}

/** Reports whether `err` is a filesystem permission error. */
function isPermissionError(err) {
  return Boolean(
    err
    && (err.code === 'EPERM' || err.code === 'EACCES' || err.code === 'EBUSY'),
  );
}

/**
 * Replaces raw permission traces with a short retry hint.
 *
 * @param {NodeJS.ErrnoException} err
 * @returns {never}
 */
function onPermissionError(err) {
  const offending = String(err.path || 'git dependency').replace(
    /^\\\\\?\\/,
    '',
  );
  new GitDepLogger(LOG_TAG).error([
    `Failed to access: ${offending}`,
    'Please close any other program using the said folder, then retry.',
  ]);
  process.exit(1);
}

module.exports = {
  fetchOwnDependency,
  getReuseLinkRefusal,
  isDirectCheckoutReuse,
  isSymlinkAt,
  linkDependencyTarget,
  logCannotReuse,
  main,
  pointDependencyLinkAt,
  readClosestVersionTag,
  resolveConsumerRoot,
  resolveReusableEntry,
  syncDependency,
  syncDirectCheckoutReuse,
};

if (require.main === module) {
  try {
    main();
  } catch (err) {
    if (isPermissionError(err)) {
      onPermissionError(err);
    }
    GitDepLogger.onCriticalError(err, LOG_TAG);
  }
}
