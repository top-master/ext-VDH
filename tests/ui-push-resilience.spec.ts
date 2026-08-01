import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * The service worker pushes hits/progress/logs to the 'main' UI. 'main' can be
 * connected but not yet listening (the popup registers its rpc handlers only
 * after weh.is_safe resolves), so the call rejects with the remote error
 * "Method <x> is not a function". Rpc.callOptional swallows exactly that case
 * (and rethrows everything else), and the three fire-and-forget pushes use it.
 */
const src = readFileSync(resolve('background/main.js'), 'utf8');

// Extract the real callOptional method and mount it on an object whose call()
// we control, so we can drive both the swallow and the rethrow paths.
function makeCallOptional(callImpl: (...callArgs: any[]) => Promise<any>) {
  const start = src.indexOf('callOptional() {');
  const end = src.indexOf('receive(message', start);
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  const methodSrc = src.slice(start, end).replace(/\s*$/, '');
  // eslint-disable-next-line no-new-func
  return new Function('callImpl', `return { call: callImpl, ${methodSrc} };`)(
    callImpl,
  );
}

describe('Rpc.callOptional (background/main.js)', () => {
  it('redirects to call() with the same arguments', async () => {
    const seen: any[] = [];
    const rpc = makeCallOptional((...args: any[]) => {
      seen.push(args);
      return Promise.resolve('ok');
    });
    const result = await rpc.callOptional('main', 'progress', { a: 1 });
    expect(result).toBe('ok');
    expect(seen).toEqual([['main', 'progress', { a: 1 }]]);
  });

  it('swallows the "receiver not ready" case (unregistered method)', async () => {
    const rpc = makeCallOptional(() => {
      const error: any = new Error(
        'RPC call "progress" to "main" failed: Method progress is not a function',
      );
      error.remoteError = 'Method progress is not a function';
      return Promise.reject(error);
    });
    await expect(rpc.callOptional('main', 'progress', {})).resolves.toBe(
      undefined,
    );
  });

  it('rethrows a genuine remote error thrown by the method', async () => {
    const rpc = makeCallOptional(() => {
      const error: any = new Error('RPC call "probe" ... failed: Exit code: 1');
      error.remoteError = 'Exit code: 1';
      return Promise.reject(error);
    });
    await expect(rpc.callOptional('coapp', 'probe', {})).rejects.toThrow(
      'Exit code: 1',
    );
  });

  it('rethrows unrelated errors (no remoteError)', async () => {
    const rpc = makeCallOptional(() =>
      Promise.reject(new TypeError('something local broke')),
    );
    await expect(rpc.callOptional('main', 'hits', [])).rejects.toThrow(
      'something local broke',
    );
  });
});

describe('SW UI pushes use callOptional (background/main.js)', () => {
  for (const method of ['hits', 'progress', 'logs']) {
    it(`storeRpc.callOptional('main', '${method}', …) is used`, () => {
      const pattern = new RegExp(
        `storeRpc\\.callOptional\\(\\s*['"]main['"]\\s*,\\s*['"]${method}['"]`,
      );
      expect(pattern.test(src)).toBe(true);
    });
    it(`no leftover bare storeRpc.call('main', '${method}', …)`, () => {
      const pattern = new RegExp(
        `storeRpc[\\s\\S]{0,20}\\.call\\(\\s*['"]main['"]\\s*,\\s*['"]${method}['"]`,
      );
      expect(pattern.test(src)).toBe(false);
    });
  }
});
