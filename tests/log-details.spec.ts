import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * The log "Details" view renders a log entry's details into a <pre>, so they
 * must be text. Regression: the structured error.details object introduced by
 * injectErrorDetails() used to take precedence over the stack in appLog() and
 * reached the view as an object - React cannot render that, leaving the view
 * empty. Now appLog() prefers the stack (which already embeds the rendered
 * details block) and stringifies anything non-string, and the viewer's
 * formatLogDetails() is defensive about non-string details too. These tests
 * extract the real functions from the shipped files and prove both layers.
 */
function loadAppLog(): { appLog: any; dispatched: any[] } {
  const src = readFileSync(resolve('background/main.js'), 'utf8');
  const start = src.indexOf('function logDetailsText(');
  const end = src.indexOf('function error(entry)');
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  const dispatched: any[] = [];
  const logStore = {
    dispatch: (_type: string, payload: any) => dispatched.push(payload),
  };
  // eslint-disable-next-line no-new-func
  const appLog = new Function(
    'logStore',
    src.slice(start, end) + '\nreturn appLog;',
  )(logStore);
  return { appLog, dispatched };
}

function loadViewerHelpers(): { formatLogDetails: any; clipboardText: any } {
  const src = readFileSync(resolve('content/logdetails-embed.js'), 'utf8');
  const start = src.indexOf('function formatLogDetails(');
  const end = src.indexOf('weh.is_safe.then');
  expect(start).toBeGreaterThan(-1);
  expect(end).toBeGreaterThan(start);
  // eslint-disable-next-line no-new-func
  return new Function(
    src.slice(start, end) + '\nreturn { formatLogDetails, clipboardText };',
  )();
}

describe('appLog details are always text (background/main.js)', () => {
  it('an Error with structured details logs the stack (with the injected block), not the object', () => {
    const { appLog, dispatched } = loadAppLog();
    const error: any = new Error(
      'RPC call "probe" to "net.downloadhelper.coapp" failed: Exit code: 1',
    );
    // what injectErrorDetails() produces: structured object + block in the stack
    error.details = { host: 'net.downloadhelper.coapp', method: 'probe' };
    error.stack =
      'Error: RPC call "probe" failed: Exit code: 1\n'
      + '  ----- details -----\n'
      + '  host: "net.downloadhelper.coapp"\n'
      + '  --------------------\n'
      + '    at Rpc.receive (main.js:1:1)';

    appLog(error, 'error');
    expect(dispatched).toHaveLength(1);
    const entry = dispatched[0];
    expect(typeof entry.details).toBe('string');
    expect(entry.details).toContain('----- details -----');
    expect(entry.details).toContain('at Rpc.receive');
  });

  it('a stackless value with object details logs it as pretty JSON', () => {
    const { appLog, dispatched } = loadAppLog();
    appLog({ message: 'boom', details: { code: 1, hint: 'x' } }, 'error');
    const entry = dispatched[0];
    expect(typeof entry.details).toBe('string');
    expect(JSON.parse(entry.details)).toEqual({ code: 1, hint: 'x' });
  });

  it('string details pass through unchanged', () => {
    const { appLog, dispatched } = loadAppLog();
    appLog({ message: 'boom', details: 'plain text' }, 'error');
    expect(dispatched[0].details).toBe('plain text');
  });
});

describe('formatLogDetails is defensive (content/logdetails-embed.js)', () => {
  const { formatLogDetails } = loadViewerHelpers();

  it('passes strings through and nulls empty values', () => {
    expect(formatLogDetails('stack text')).toBe('stack text');
    expect(formatLogDetails('')).toBe(null);
    expect(formatLogDetails(null)).toBe(null);
    expect(formatLogDetails(undefined)).toBe(null);
  });

  it('renders an object (legacy stored entries) as pretty JSON instead of blanking', () => {
    const rendered = formatLogDetails({ host: 'h', method: 'm' });
    expect(typeof rendered).toBe('string');
    expect(JSON.parse(rendered)).toEqual({ host: 'h', method: 'm' });
  });
});

describe('the copy button clipboard text (content/logdetails-embed.js)', () => {
  const { clipboardText } = loadViewerHelpers();

  it('does not duplicate the message when the details (a stack) already open with it', () => {
    const message = 'RPC call "probe" failed: Exit code: 1';
    const details =
      'Error: RPC call "probe" failed: Exit code: 1\n'
      + '  ----- details -----\n'
      + '  method: "probe"\n'
      + '  --------------------\n'
      + '    at Rpc.receive (main.js:1:1)';
    const text = clipboardText(message, details);
    expect(text).toBe(details);
    expect(text.split('Exit code: 1')).toHaveLength(2); // message appears once
  });

  it('joins message and unrelated details, and copes with either missing', () => {
    expect(clipboardText('title', 'other text')).toBe('title\n\nother text');
    expect(clipboardText('title', null)).toBe('title');
    expect(clipboardText(null, 'just details')).toBe('just details');
  });
});

describe('only the details <pre> scrolls in the embed', () => {
  it('the embed root carries the scope class and styles.css disables main scrolling', () => {
    const viewerSrc = readFileSync(
      resolve('content/logdetails-embed.js'),
      'utf8',
    );
    expect(viewerSrc).toContain('weh-shf embeddable log-details-embed');
    const css = readFileSync(resolve('content/styles.css'), 'utf8');
    const overrideAt = css.indexOf('.log-details-embed main');
    expect(overrideAt).toBeGreaterThan(-1);
    expect(css.slice(overrideAt, css.indexOf('}', overrideAt))).toContain(
      'overflow-y: hidden',
    );
    // the pre keeps its own scrollbar
    const preAt = css.indexOf('.embeddable main > div.log-details pre');
    expect(css.slice(preAt, css.indexOf('}', preAt))).toContain(
      'overflow: auto',
    );
  });
});
