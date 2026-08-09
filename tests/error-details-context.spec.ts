import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Anything surfaced to the log's details section must be decorated the one way -
 * through injectErrorDetails() - rather than hand-formatted per throw site. Two
 * things this proves against the real background/main.js:
 *  - injectErrorDetails() stamps the ambient CoApp version into every details
 *    block, so a mismatched/outdated CoApp (the usual root cause) is always in
 *    the report; it stays inert when the version is unknown.
 *  - convertFailureError() routes a failed convert/download through that same
 *    helper, so the media URLs, output file, exit code and stderr render as a
 *    details block (and pick up the CoApp version) instead of a bare message.
 */
function loadConvertHelpers(coappKnownVersion?: string): {
  injectErrorDetails: any;
  convertFailureError: any;
} {
  const src = readFileSync(resolve('background/main.js'), 'utf8');
  const detailsAt = src.indexOf('var errorDetailsStart =');
  const rpcModuleAt = src.indexOf('var requireRpc = defineCommonjsModule');
  const reasonAt = src.indexOf('function extractFfprobeReason(');
  const diagAt = src.indexOf('function diagnoseProbeFailure(');
  expect(detailsAt).toBeGreaterThan(-1);
  expect(reasonAt).toBeGreaterThan(-1);
  expect(diagAt).toBeGreaterThan(reasonAt);
  const injectSrc = src.slice(detailsAt, rpcModuleAt); // vars + injectErrorDetails
  const convertSrc = src.slice(reasonAt, diagAt); // extractFfprobeReason..convertFailureError
  // eslint-disable-next-line no-new-func
  return new Function(
    'coappKnownVersion',
    injectSrc
      + '\n'
      + convertSrc
      + '\nreturn { injectErrorDetails, convertFailureError };',
  )(coappKnownVersion);
}

describe('error details context (background/main.js)', () => {
  it('injectErrorDetails stamps the ambient CoApp version', () => {
    const { injectErrorDetails } = loadConvertHelpers('2.0.20');
    const error: any = new Error('boom');
    injectErrorDetails(error, { host: 'h', method: 'probe' });
    expect(error.details.coappVersion).toBe('2.0.20');
    expect(error.stack).toContain('coappVersion: "2.0.20"');
  });

  it('does not invent a version when the CoApp one is unknown', () => {
    const { injectErrorDetails } = loadConvertHelpers(undefined);
    const error: any = new Error('boom');
    injectErrorDetails(error, { host: 'h' });
    expect('coappVersion' in error.details).toBe(false);
    expect(error.stack).not.toContain('coappVersion');
  });

  it('convertFailureError decorates the error with the call context', () => {
    const { convertFailureError } = loadConvertHelpers('2.0.20');
    const stderr =
      '[https @ 0x0] HTTP error 403 Forbidden\n'
      + 'https://moon.example/480p/index.m3u8: Server returned 403 Forbidden (access denied)';
    const error: any = convertFailureError(
      'SideDownload error',
      { exitCode: 1, stderr },
      {
        videoUrl: 'https://moon.example/480p/index.m3u8',
        file: '/out/clip.mp4',
      },
    );
    // reason folded into the one-line message
    expect(error.message).toContain('SideDownload error:');
    expect(error.message).toContain('403 Forbidden');
    // structured context attached via the shared helper
    expect(error.details).toMatchObject({
      method: 'convert',
      exitCode: 1,
      videoUrl: 'https://moon.example/480p/index.m3u8',
      file: '/out/clip.mp4',
      coappVersion: '2.0.20',
    });
    expect(error.details.response).toBe(stderr);
    // ...and rendered into the stack as a details block
    expect(error.stack).toContain('----- details -----');
    expect(error.stack).toContain(
      'videoUrl: "https://moon.example/480p/index.m3u8"',
    );
    expect(error.stack).toContain('coappVersion: "2.0.20"');
  });

  it('convertFailureError still names a cause when ffmpeg left no stderr', () => {
    const { convertFailureError } = loadConvertHelpers('2.0.20');
    const error: any = convertFailureError(
      'SideDownload error',
      { exitCode: 1, stderr: '' },
      { videoUrl: 'https://x/v.m3u8' },
    );
    expect(error.message).toContain('exited with code 1');
    expect(error.details).toMatchObject({
      exitCode: 1,
      videoUrl: 'https://x/v.m3u8',
      coappVersion: '2.0.20',
    });
  });
});
