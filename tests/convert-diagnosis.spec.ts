import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * diagnoseConvertStderr() adds a plain-language note (never replacing the raw
 * stderr) for the convert failures that read like a downloader bug but are not.
 * Three real causes all surface as "Invalid data found" / "does not contain any
 * stream": (1) the segments are images, not video (a decoy/ad playlist); (2) the
 * segments could not be fetched (a down/blocking host); (3) an HLS input yielded
 * no playable stream with the cause hidden at ffmpeg's error log level. Loaded
 * from the real background/main.js.
 */
function loadDiagnose(): any {
  const src = readFileSync(resolve('background/main.js'), 'utf8');
  const start = src.indexOf('function diagnoseConvertStderr(');
  const end = src.indexOf('function convertFailureError(', start);
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  // eslint-disable-next-line no-new-func
  return new Function(
    src.slice(start, end) + '\nreturn diagnoseConvertStderr;',
  )();
}

describe('diagnoseConvertStderr (background/main.js)', () => {
  const diagnoseConvertStderr = loadDiagnose();

  it('flags image-wrapped/obfuscated segments (ffmpeg sees png, not video)', () => {
    const stderr =
      '[hls @ 0x0] Could not find codec parameters for stream 0 (Video: png, none(pc)): unspecified size\n'
      + '[out#0/mp4 @ 0x0] Output file does not contain any stream';
    const note = diagnoseConvertStderr(stderr, { forceHls: true });
    expect(note).toContain('images, not video');
    expect(note).toContain('wrapping or obfuscating');
  });

  it('names the failing segment host, with the HTTP status when present', () => {
    const withCode =
      '[https @ 0x0] HTTP error 521 <none>\n[hls @ 0x0] Failed to open segment 1 of playlist 0';
    expect(diagnoseConvertStderr(withCode, {})).toContain('(HTTP 521)');

    const errLevel =
      "[hls @ 0x0] Error when loading first segment 'https://deltaforge.top/a/zf.jpg'\n"
      + '[in#0 @ 0x0] Error opening input: Invalid data found when processing input';
    const note = diagnoseConvertStderr(errLevel, {});
    expect(note).toContain('deltaforge.top');
    expect(note).toContain('server-side');
    expect(note).not.toMatch(/HTTP \d/); // code hidden at error level
  });

  it('falls back to an honest generic note for an HLS "no stream" with no cause shown', () => {
    // The real flixcdn/tiktok err.log at -loglevel error: only this line.
    const stderr =
      '[out#0/mp4 @ 0x0] Output file does not contain any stream\n'
      + 'Error opening output files: Invalid argument';
    // needs HLS context (forceHls or an .m3u8 url), since the stderr has no "hls".
    expect(diagnoseConvertStderr(stderr, { forceHls: true })).toContain(
      'no playable video or audio',
    );
    expect(
      diagnoseConvertStderr(stderr, {
        videoUrl: 'https://x/index.m3u8?v=1',
      }),
    ).toContain('source-side');
    // ...but not for a non-HLS convert (avoid mislabeling).
    expect(
      diagnoseConvertStderr(stderr, { videoUrl: 'https://x/a.mp4' }),
    ).toBeNull();
  });

  it('returns null for unrelated failures', () => {
    expect(
      diagnoseConvertStderr('[libx264 @ 0x0] Encoding failed', {
        forceHls: true,
      }),
    ).toBeNull();
    expect(diagnoseConvertStderr('', {})).toBeNull();
    expect(diagnoseConvertStderr(undefined, undefined)).toBeNull();
  });
});
