import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * ffmpeg's HTTP client can inflate gzip/deflate but not brotli or zstd. If the
 * extension forwards the browser's "Accept-Encoding: gzip, deflate, br, zstd" to
 * ffmpeg, a CDN may answer zstd-compressed and ffmpeg reads the compressed bytes
 * as garbage -> "Invalid data found when processing input" (the moon.ironwallnet
 * HLS failure). stripUnsupportedEncodings() must drop exactly br and zstd - the
 * codings ffmpeg cannot decode - and keep the rest. Loaded from the real
 * background/main.js.
 */
function loadStripper(): any {
  const src = readFileSync(resolve('background/main.js'), 'utf8');
  const start = src.indexOf('function stripUnsupportedEncodings(');
  const end = src.indexOf('\n  }', start) + 4;
  expect(start).toBeGreaterThan(-1);
  // eslint-disable-next-line no-new-func
  return new Function(
    src.slice(start, end) + '\nreturn stripUnsupportedEncodings;',
  )();
}

function strip(value: string): string {
  const stripUnsupportedEncodings = loadStripper();
  const headers = [{ name: 'Accept-Encoding', value }];
  stripUnsupportedEncodings(headers);
  return headers[0].value;
}

describe('stripUnsupportedEncodings (background/main.js)', () => {
  it('drops br and zstd, keeps gzip/deflate/identity', () => {
    expect(strip('gzip, deflate, br, zstd')).toBe('gzip, deflate');
    expect(strip('identity')).toBe('identity');
    expect(strip('gzip')).toBe('gzip');
    expect(strip('br, zstd')).toBe('');
  });

  it('matches case-insensitively and ignores quality weights', () => {
    expect(strip('gzip, ZSTD, Br')).toBe('gzip');
    expect(strip('zstd;q=1.0, gzip;q=0.5, br;q=0.8')).toBe('gzip;q=0.5');
  });

  it('leaves non-Accept-Encoding headers untouched', () => {
    const stripUnsupportedEncodings = loadStripper();
    const headers = [
      { name: 'Referer', value: 'https://x/' },
      { name: 'Accept-Encoding', value: 'gzip, zstd' },
    ];
    stripUnsupportedEncodings(headers);
    expect(headers[0].value).toBe('https://x/');
    expect(headers[1].value).toBe('gzip');
  });
});
