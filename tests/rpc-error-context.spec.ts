import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * The RPC layer in background/main.js used to reject a failed call with a bare
 * `new Error(message._error)` - so a native-host failure surfaced as just
 * "Exit code: 1" with no hint of which call produced it. It now (a) wraps the
 * remote error with the method + peer that failed, and (b) runs the shared
 * injectErrorDetails() helper, which appends the full call context (host,
 * method, request payload, response) as a block between the one-line message
 * and the stack frames. This test extracts the real helper + Rpc class out of
 * main.js and exercises call()/receive() to prove both.
 */
function loadRpcInternals(): { Rpc: any; injectErrorDetails: any } {
  const src = readFileSync(resolve('background/main.js'), 'utf8');
  const detailsAt = src.indexOf('var errorDetailsStart =');
  const rpcModuleAt = src.indexOf('var requireRpc = defineCommonjsModule');
  const classAt = src.indexOf('var Rpc = class {');
  const exportsAt = src.indexOf('rpcModule.exports = new Rpc()');
  expect(detailsAt).toBeGreaterThan(-1);
  expect(classAt).toBeGreaterThan(rpcModuleAt);
  const helperSrc = src.slice(detailsAt, rpcModuleAt); // vars + injectErrorDetails
  const classSrc = src.slice(classAt, src.lastIndexOf('};', exportsAt) + 2);
  // eslint-disable-next-line no-new-func
  return new Function(
    'globalDebugLevel',
    helperSrc + '\n' + classSrc + '\nreturn { Rpc, injectErrorDetails };',
  )(0);
}

describe('RPC error context (background/main.js)', () => {
  it('wraps a failed call with method + peer and injects the full context', async () => {
    const { Rpc } = loadRpcInternals();
    const rpc = new Rpc();
    const posted: any[] = [];
    rpc.setUseTarget(true);
    rpc.setPost((_peer: string, message: any) => posted.push(message));

    const pending = rpc.call(
      'net.downloadhelper.coapp',
      'probe',
      'https://x/v.mp4',
      false,
      [{ name: 'Referer', value: 'https://x/' }],
    );
    const requestId = posted[0]._request;
    expect(posted[0]._method).toBe('probe');

    rpc.receive(
      { type: 'weh#rpc', _reply: requestId, _error: 'Exit code: 1' },
      () => {},
      'net.downloadhelper.coapp',
    );

    const error = await pending.catch((thrown: any) => thrown);

    // one-line title (message) carries method + peer + remote error
    expect(error.message.split('\n')).toHaveLength(1);
    expect(error.message).toContain('probe');
    expect(error.message).toContain('net.downloadhelper.coapp');
    expect(error.message).toContain('Exit code: 1');
    expect(error.remoteError).toBe('Exit code: 1');

    // structured details are attached...
    expect(error.details).toMatchObject({
      host: 'net.downloadhelper.coapp',
      method: 'probe',
      response: 'Exit code: 1',
    });
    expect(error.details.request).toContain('https://x/v.mp4');

    // ...and rendered into the stack between the message and the frames
    const lines = error.stack.split('\n');
    const detailIndex = lines.findIndex((line: string) =>
      line.includes('----- details -----'),
    );
    const firstFrame = lines.findIndex((line: string) => /^\s*at\s/.test(line));
    expect(detailIndex).toBeGreaterThan(0);
    if (firstFrame >= 0) expect(detailIndex).toBeLessThan(firstFrame);
    expect(error.stack).toContain('method: "probe"');
    expect(error.stack).toContain('response: "Exit code: 1"');
  });

  it('re-decorating replaces the details block instead of stacking copies', () => {
    const { injectErrorDetails } = loadRpcInternals();
    const error: any = new Error('boom');
    injectErrorDetails(error, { host: 'h', method: 'm' });
    injectErrorDetails(error, { response: 'r' });
    const blockCount = error.stack.split('----- details -----').length - 1;
    expect(blockCount).toBe(1); // only one block
    expect(error.details).toMatchObject({
      host: 'h',
      method: 'm',
      response: 'r',
    });
  });

  it('resolves a successful reply normally (no wrapping)', async () => {
    const { Rpc } = loadRpcInternals();
    const rpc = new Rpc();
    const posted: any[] = [];
    rpc.setPost((message: any) => posted.push(message));
    const pending = rpc.call('info');
    rpc.receive(
      {
        type: 'weh#rpc',
        _reply: posted[0]._request,
        _result: { version: '1.2.3' },
      },
      () => {},
      null,
    );
    await expect(pending).resolves.toEqual({ version: '1.2.3' });
  });
});
