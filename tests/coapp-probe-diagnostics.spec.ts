import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * The coapp's json probe runs ffprobe with `-v quiet` (through v2.0.19), so a
 * failed probe rejects with a bare "Exit code: N" - the reason (e.g. HTTP 403)
 * is silenced. info() recovers it by re-probing without the json flags and
 * pulling ffprobe's stderr into the error Details. These tests extract the pure
 * helpers that drive that from the real main.js: the "did the coapp give us no
 * reason?" test, and the ffprobe-stderr reason extractor (which must drop the
 * banner and keep the actual error).
 */
function loadProbeHelpers(): {
  coappGaveNoReason: any;
  extractFfprobeReason: any;
} {
  const src = readFileSync(resolve('background/main.js'), 'utf8');
  const start = src.indexOf('function coappGaveNoReason(');
  const end = src.indexOf('function diagnoseProbeFailure(');
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  // eslint-disable-next-line no-new-func
  return new Function(
    src.slice(start, end)
      + '\nreturn { coappGaveNoReason, extractFfprobeReason };',
  )();
}

describe('coapp probe diagnostics (background/main.js)', () => {
  const { coappGaveNoReason, extractFfprobeReason } = loadProbeHelpers();

  it('coappGaveNoReason: true only for a bare exit-code error', () => {
    expect(coappGaveNoReason({ remoteError: 'Exit code: 1\n' })).toBe(true);
    expect(coappGaveNoReason({ remoteError: 'Exit code: 255' })).toBe(true);
    // a coapp that already returns stderr -> don't re-probe
    expect(
      coappGaveNoReason({ remoteError: 'Exit code: 1\nServer returned 403' }),
    ).toBe(false);
    expect(coappGaveNoReason({ remoteError: '' })).toBe(false);
    expect(coappGaveNoReason({})).toBe(false);
  });

  it('extractFfprobeReason keeps the real error and drops the ffprobe banner', () => {
    const stderr = [
      'Exit code: 1',
      'ffprobe version c30f360 Copyright (c) 2007-2023 the FFmpeg developers',
      '  built with gcc 10 (GCC)',
      '  configuration: --extra-libs=... --prefix=/ffmpeg-static',
      '  libavutil      58.  2.100 / 58.  2.100',
      '[https @ 0x2b5f7ac0] HTTP error 403 Forbidden',
      'https://vault-16.example/uwu.m3u8: Server returned 403 Forbidden (access denied)',
    ].join('\n');
    const reason = extractFfprobeReason(stderr);
    expect(reason).toContain('403 Forbidden');
    expect(reason).toContain('Server returned 403 Forbidden (access denied)');
    // banner + exit-code lines are gone
    expect(reason).not.toContain('ffprobe version');
    expect(reason).not.toContain('configuration:');
    expect(reason).not.toContain('Exit code:');
    expect(reason).not.toContain('libavutil');
  });

  it('extractFfprobeReason copes with empty / bannerless input', () => {
    expect(extractFfprobeReason('')).toBe('');
    expect(extractFfprobeReason('Exit code: 1\n')).toBe('');
    expect(extractFfprobeReason('Exit code: 1\nInvalid data found')).toBe(
      'Invalid data found',
    );
  });
});
