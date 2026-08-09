import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * A download's pre-flight probe exists only to seed the progress bar's total
 * duration, so probeDurationSeconds() in background/main.js must never let a
 * failed probe abort the download. A rejection - for example ffprobe misdetecting
 * an HLS media playlist as raw mp3 ("Invalid frame size ... Could not seek to")
 * and giving up with "Invalid argument" - has to resolve to an unknown duration
 * (0), which leaves the progress bar indeterminate while sideDownload proceeds. A
 * present duration must still be parsed through. These tests load the real
 * function out of main.js with stubbed info()/appLog().
 */
function loadProbeDurationSeconds(info: any, appLog: any): any {
  const src = readFileSync(resolve('background/main.js'), 'utf8');
  const start = src.indexOf('function probeDurationSeconds(');
  const end = src.indexOf('function play(', start);
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  // eslint-disable-next-line no-new-func
  return new Function(
    'info',
    'appLog',
    src.slice(start, end) + '\nreturn probeDurationSeconds;',
  )(info, appLog);
}

describe('probeDurationSeconds (background/main.js)', () => {
  it('returns the parsed duration when the probe succeeds', async () => {
    const probeDurationSeconds = loadProbeDurationSeconds(
      () => Promise.resolve({ format: { duration: '132.5' } }),
      () => {},
    );
    expect(await probeDurationSeconds('u', [])).toBe(132.5);
  });

  it('resolves to 0 (never rejects) when the probe fails', async () => {
    const warnings: string[] = [];
    const probeDurationSeconds = loadProbeDurationSeconds(
      () =>
        Promise.reject(
          new Error(
            'Exit code: 1\n[mp3 @ 0x0] Invalid frame size (452): Could not seek to 2297.',
          ),
        ),
      (message: string, level: string) => warnings.push(level + ': ' + message),
    );
    await expect(probeDurationSeconds('u', [])).resolves.toBe(0);
    expect(
      warnings.some(entry =>
        entry.startsWith('warning: duration probe failed'),
      ),
    ).toBe(true);
  });

  it('reports an unknown duration (0) for a missing or non-positive duration', async () => {
    const make = (duration: unknown) =>
      loadProbeDurationSeconds(
        () => Promise.resolve({ format: { duration } }),
        () => {},
      );
    expect(await make(undefined)('u', [])).toBe(0);
    expect(await make('0')('u', [])).toBe(0);
    expect(await make('not-a-number')('u', [])).toBe(0);
    // headers default to [] when the caller omits them
    expect(await make('5')('u')).toBe(5);
  });
});
