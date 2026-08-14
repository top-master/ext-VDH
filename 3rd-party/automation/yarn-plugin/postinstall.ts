'use strict';

/**
 * Local Yarn 4 plugin that re-runs the root workspace's `postinstall`
 * lifecycle script after every install.
 *
 * Yarn 4 deliberately does NOT run the root project's `preinstall`,
 * `install`, or `postinstall` scripts when `yarn install` (or any
 * dep-mutating subcommand) finishes — the upstream rationale is
 * preventing a malicious dependency from silently triggering arbitrary
 * code on the host. That stance is fine for libraries, but breaks any
 * project that relies on a root `postinstall` to bootstrap itself.
 *
 * We re-introduce the lifecycle in a controlled, in-repo way so
 * reviewers can audit exactly what runs. Wired in `.yarnrc.yml`:
 *
 *   plugins:
 *     - path: 3rd-party/automation/yarn-plugin/postinstall.ts
 *       spec: "yarn-plugin-postinstall"
 *
 * Loaded directly as TypeScript by Node ≥22.6 (type-stripping is on
 * by default for `.ts` in Node 23+; experimental but stable for
 * type-only stripping). The file deliberately uses CommonJS
 * (`module.exports`) because Yarn loads plugins via `require()`.
 *
 * The plugin file is a verbatim copy across all consumers,
 * hence keep them in sync.
 *
 * Recursion guard: setting `AUTOMATION_POSTINSTALL_RUNNING=1` in the
 * spawned `yarn run postinstall` child prevents the
 * `afterAllInstalled` hook from firing again if that script itself
 * runs `yarn install` (e.g. inside a workspace bootstrap step). The
 * `AUTOMATION_` prefix is deliberate — Yarn auto-binds any env var
 * that starts with `YARN_` to a config setting and rejects unknown
 * names with a "Unrecognized configuration" usage error, which would
 * fail the spawned child before it ever ran `postinstall`.
 */
// `import type` is erased at load time, so it does not flip Node's
// CJS/ESM detection. Yarn loads plugins via `require()`, which means
// this file must stay CommonJS — runtime imports use `require()`.
import type { ChildProcess } from 'child_process';

const { spawn } = require('child_process') as typeof import('child_process');
const fs = require('fs') as typeof import('fs');
const nodePath = require('path') as typeof import('path');

/** Env-var sentinel that flags an in-progress, plugin-driven postinstall. */
const RECURSION_SENTINEL_ENV = 'AUTOMATION_POSTINSTALL_RUNNING';

/** Lifecycle-script name the plugin re-introduces for the root workspace. */
const POSTINSTALL_SCRIPT_NAME = 'postinstall';

/** Minimal shape of the `Project` argument Yarn hands the install hook. */
interface YarnInstallProject {
  /** Top-level workspace whose scripts we want to re-run. */
  topLevelWorkspace?: YarnWorkspace;
  /** Project root, used as fallback when the top-level workspace lacks one. */
  cwd?: string;
}

/** Minimal install-hook state Yarn passes alongside the project. */
interface YarnInstallState {
  /** Shared install report whose error count drives Yarn's exit code. */
  report?: {
    errorCount?: number;
  };
}

/** Minimal shape of a Yarn workspace exposed to plugin hooks. */
interface YarnWorkspace {
  /** Absolute working directory backing the workspace on disk. */
  cwd: string;
  /** Parsed `package.json` for the workspace. */
  manifest: {
    /** Map keyed by lifecycle / user script name. */
    scripts?: Map<string, string>;
  };
}

/**
 * Yarn plugin entry point. Yarn 4 calls `factory()` once per session
 * and reads the returned `hooks` object; the only hook we register is
 * `afterAllInstalled`, which fires exactly once after `yarn install`
 * (and dep-mutating siblings: `add`, `remove`, `up`, `dedupe`) has
 * finished writing the lockfile and `node_modules` directory.
 */
module.exports = {
  name: 'yarn-plugin-postinstall',
  factory: (): {
    hooks: { afterAllInstalled: typeof runPostinstallHook };
  } => ({
    hooks: {
      afterAllInstalled: runPostinstallHook,
    },
  }),
  // Test-only handle on internal helpers. Yarn ignores extra fields
  // on a plugin's `module.exports`; the spec beside this file uses
  // these to unit-test the Windows-specific cwd fallback without
  // having to spawn a real `yarn install`.
  __testInternals__: { resolveProjectCwd, spawnYarnRun },
};

/**
 * Runs the root workspace's `postinstall` script, mirroring what
 * Yarn classic / npm would do. Skips silently when the script is
 * absent or when we are already inside a recursive invocation.
 *
 * @param project Root project handed in by Yarn's `afterAllInstalled` hook.
 */
async function runPostinstallHook(
  project: YarnInstallProject,
  installState?: YarnInstallState,
): Promise<void> {
  if (process.env[RECURSION_SENTINEL_ENV]) {
    return;
  }

  const workspace = project.topLevelWorkspace;
  const scripts = workspace?.manifest?.scripts;
  if (!scripts || !scripts.has(POSTINSTALL_SCRIPT_NAME)) {
    return;
  }

  const rawCwd = workspace?.cwd ?? project.cwd;
  if (!rawCwd) {
    throw new Error(
      '[yarn-plugin-postinstall] Yarn handed us no project cwd; '
        + 'refusing to guess.',
    );
  }
  // Yarn 4 hands plugins a `PortablePath` (forward-slash on every
  // platform). Passing it straight to Node's `spawn` cwd on Windows
  // makes `CreateProcessW` fail with `ENOENT` — and Node misleadingly
  // reports the command (`node.exe`) instead of the cwd. `path.resolve`
  // converts to the OS-native separator and absolute form, fixing
  // Windows while staying a no-op on POSIX. Some Windows setups still
  // surface a non-existent spelling here, so an `fs.existsSync` check
  // falls back to `process.cwd()` to keep the child launch aligned
  // with the active install command.
  const projectCwd = resolveProjectCwd(rawCwd);

  await spawnYarnRun(POSTINSTALL_SCRIPT_NAME, projectCwd, installState?.report);
}

/**
 * Spawns the same Yarn release that is currently executing — taken
 * from `process.argv[1]`, which is the `.yarn/releases/yarn-*.cjs`
 * file the wrapper handed to Node. Reusing the active Yarn means
 * PATH, env, and script-resolution behave exactly like a hand-typed
 * `yarn run <script>`.
 *
 * @param scriptName Name of the workspace script to execute.
 * @param cwd Working directory for the spawned child.
 * @param report Shared install report used to mark the install failed.
 */
function spawnYarnRun(
  scriptName: string,
  cwd: string,
  report?: { errorCount?: number },
): Promise<void> {
  const yarnReleasePath = process.argv[1]
    ? nodePath.resolve(process.argv[1])
    : '';
  if (!yarnReleasePath) {
    throw new Error(
      '[yarn-plugin-postinstall] could not locate the active Yarn '
        + 'release (process.argv[1] was empty); refusing to guess.',
    );
  }

  return new Promise<void>((resolveHook, rejectHook) => {
    const child: ChildProcess = spawn(
      process.execPath,
      [
        yarnReleasePath,
        'run',
        scriptName,
      ],
      {
        cwd,
        stdio: 'inherit',
        // Hide the spurious console window that Windows would
        // otherwise flash up for the spawned `node.exe`. No-op on
        // POSIX.
        windowsHide: true,
        env: {
          ...process.env,
          [RECURSION_SENTINEL_ENV]: '1',
        },
      },
    );

    child.once('error', rejectHook);
    child.once('exit', (code, signal) => {
      if (signal) {
        rejectHook(
          new Error(
            `[yarn-plugin-postinstall] ${scriptName} terminated by `
              + `signal ${signal}.`,
          ),
        );
        return;
      }
      if (code !== 0) {
        if (report && typeof report.errorCount === 'number') {
          report.errorCount += 1;
        }
        process.exitCode = code || 1;
        resolveHook();
        return;
      }
      resolveHook();
    });
  });
}

/**
 * Resolves the workspace cwd into an existing OS-native path before
 * handing it to `spawn`.
 *
 * Yarn's portable paths are usually already absolute, but some
 * Windows setups still surface a non-existent spelling here. Falling
 * back to `process.cwd()` keeps the child launch aligned with the
 * active install command when that happens.
 *
 * @param rawCwd Working directory from Yarn's project model.
 */
function resolveProjectCwd(rawCwd: string): string {
  const candidate = nodePath.resolve(rawCwd);
  if (fs.existsSync(candidate)) {
    return candidate;
  }

  return process.cwd();
}
