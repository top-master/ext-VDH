import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * The ffprobe JSON output is occasionally invalid (an unescaped character in a
 * stream or format tag). The download flow's info(url, true) JSON.parses that
 * output, and a SyntaxError there used to abort the whole download. Callers only
 * read format.duration, so info() now recovers it from the non-JSON probe. This
 * extracts the real info() from main.js and drives both paths.
 */
function loadInfo(converterCoapp: any, appLog: any) {
  const src = readFileSync(resolve('background/main.js'), 'utf8');
  const start = src.indexOf('function info(url, parse');
  const end = src.indexOf('function play(', start);
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  // eslint-disable-next-line no-new-func
  return new Function(
    'stripBrotliEncoding',
    'converterDebug',
    'converterCoapp',
    'appLog',
    'diagnoseProbeFailure',
    src.slice(start, end) + '\nreturn info;',
  )(
    () => {},
    false,
    converterCoapp,
    appLog,
    () => Promise.resolve(),
  );
}

describe('info() probe JSON parsing (background/main.js)', () => {
  it('parses well-formed ffprobe JSON directly (no re-probe)', async () => {
    const calls: boolean[] = [];
    const converterCoapp = {
      call: (_method: string, _url: string, parse: boolean) => {
        calls.push(parse);
        return Promise.resolve(
          '{"streams":[{"codec_name":"h264"}],"format":{"duration":"1106.16"}}',
        );
      },
    };
    const info = loadInfo(converterCoapp, () => {});
    const result = await info('https://x/v.m3u8', true, []);
    expect(result.format.duration).toBe('1106.16');
    // Only the JSON probe ran, with no fallback.
    expect(calls).toEqual([true]);
  });

  it('recovers duration from the non-JSON probe when the JSON is malformed', async () => {
    const calls: boolean[] = [];
    const logs: Array<[string, string]> = [];
    const converterCoapp = {
      call: (_method: string, _url: string, parse: boolean) => {
        calls.push(parse);
        if (parse) {
          // An unescaped quote in a tag value gives "Expected ',' or '}'".
          return Promise.resolve(
            '{"format":{"duration":"42.5","tags":{"title":"a "b" c"}}}',
          );
        }
        // The non-JSON probe returns the regex-extracted info.
        return Promise.resolve({ duration: 42, width: 636, height: 360 });
      },
    };
    const info = loadInfo(converterCoapp, (msg: string, type: string) =>
      logs.push([msg, type]),
    );
    const result = await info('https://x/v.m3u8', true, []);
    // The duration came from the fallback probe.
    expect(result.format.duration).toBe(42);
    expect(result.streams).toEqual([]);
    // The JSON probe failed, so it re-probed without JSON.
    expect(calls).toEqual([true, false]);
    expect(logs[0][1]).toBe('warning');
    expect(logs[0][0]).toMatch(/malformed JSON/i);
  });
});
