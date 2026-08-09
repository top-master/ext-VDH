import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Some sites disguise their HLS segments with rotating fake extensions
 * (.jpg/.css/.png/...) to thwart downloaders; ffmpeg's HLS demuxer then refuses
 * them ("Invalid data found when processing input") unless it is told
 * "-allowed_extensions ALL". sideDownload() adds that flag on its forceHls retry.
 * The flag is an HLS-demuxer private option, so it must ride along with "-f hls"
 * (passing it on a non-HLS input aborts with "Option allowed_extensions not
 * found"). sideDownload builds the ffmpeg args inline through a large stateful
 * function, so this guards the arg construction at the source level: whenever
 * "-f hls" is forced, "-allowed_extensions ALL" is forced with it, for both the
 * real ffmpeg args and the shell-preview args.
 */
describe('HLS forceHls args (background/main.js)', () => {
  const src = readFileSync(resolve('background/main.js'), 'utf8');

  it('pushes -allowed_extensions ALL together with -f hls (ffmpeg + shell args)', () => {
    expect(src).toContain(
      "ffmpegArgs.push('-f', 'hls', '-allowed_extensions', 'ALL')",
    );
    expect(src).toContain(
      "shellArgs.push('-f', 'hls', '-allowed_extensions', 'ALL')",
    );
  });

  it('hands the coapp the version-gated -vdh_proxy_fallback directive (ffmpeg args only)', () => {
    // Passed only to a coapp new enough to strip it (>= 2.0.22), and never into
    // shellArgs (which mirrors a plain ffmpeg command that would reject it).
    expect(src).toContain(
      "ffmpegArgs.push('-vdh_proxy_fallback', 'invalid-data')",
    );
    expect(src).toContain(
      "coappCompareSemVer(coappKnownVersion, '2.0.22') >= 0",
    );
    expect(src).not.toContain(
      "shellArgs.push('-vdh_proxy_fallback', 'invalid-data')",
    );
  });

  it('hands the coapp the version-gated log-level and de-wrap directives (ffmpeg args only)', () => {
    // Gated to coapp >= 2.0.23 (the build that understands them); ffmpeg args
    // only, never shellArgs.
    expect(src).toContain("'-vdh_loglevel'");
    expect(src).toContain("'-vdh_strip_wrapper'");
    expect(src).toContain(
      "coappCompareSemVer(coappKnownVersion, '2.0.23') >= 0",
    );
    // the directives never leak into the shell-preview args
    expect(/shellArgs\.push\(\s*'-vdh_/.test(src)).toBe(false);
  });

  it('never forces -f hls without also allowing all extensions', () => {
    // Any remaining bare `push('-f', 'hls')` (i.e. not followed by the
    // allowed-extensions args) would reintroduce the fake-extension failure.
    const bareForceHls = /push\(\s*'-f',\s*'hls'\s*\)/.test(src);
    expect(bareForceHls).toBe(false);
  });
});
