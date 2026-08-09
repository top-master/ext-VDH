import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * A failed convert/download is thrown as an error whose message is what the
 * log shows next to the stack, so describeConvertFailure() in background/main.js
 * must always name a cause. ffmpeg's real last words (e.g. a 403) have to survive
 * with the banner stripped, and an empty stderr - which used to produce a
 * reason-less "SideDownload error:" - must fall back to the exit code. These
 * tests load the real helpers (extractFfprobeReason + describeConvertFailure)
 * straight out of main.js.
 */
function loadDescribeConvertFailure(): any {
  const src = readFileSync(resolve('background/main.js'), 'utf8');
  const start = src.indexOf('function extractFfprobeReason(');
  const end = src.indexOf('function diagnoseProbeFailure(');
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  // eslint-disable-next-line no-new-func
  return new Function(
    src.slice(start, end) + '\nreturn describeConvertFailure;',
  )();
}

describe('describeConvertFailure (background/main.js)', () => {
  const describeConvertFailure = loadDescribeConvertFailure();

  it('keeps ffmpeg last words as a single line, without the banner', () => {
    const stderr = [
      'ffmpeg version c30f360 Copyright (c) 2000-2023 the FFmpeg developers',
      '  built with gcc 10 (GCC)',
      '  configuration: --prefix=/ffmpeg-static',
      '  libavutil      58.  2.100 / 58.  2.100',
      '[https @ 0x1a2b3c] HTTP error 403 Forbidden',
      'https://moon.example/480p/index.m3u8: Server returned 403 Forbidden (access denied)',
    ].join('\n');
    const reason = describeConvertFailure({ exitCode: 1, stderr });
    expect(reason).toContain('403 Forbidden');
    expect(reason).toContain('access denied');
    expect(reason).not.toContain('\n');
    expect(reason).not.toContain('ffmpeg version');
    expect(reason).not.toContain('configuration:');
  });

  it('falls back to the exit code when stderr is empty or missing', () => {
    expect(describeConvertFailure({ exitCode: 1, stderr: '' })).toBe(
      'ffmpeg exited with code 1 without any diagnostic output',
    );
    expect(describeConvertFailure({ exitCode: 255 })).toBe(
      'ffmpeg exited with code 255 without any diagnostic output',
    );
  });

  it('is never empty (the message must always name a cause)', () => {
    for (const result of [
      { exitCode: 1, stderr: '' },
      { exitCode: 1, stderr: 'ffmpeg version 5\n  configuration: --x' },
      { exitCode: 2, stderr: '   \n  \n' },
    ]) {
      expect(describeConvertFailure(result).length).toBeGreaterThan(0);
    }
  });
});
