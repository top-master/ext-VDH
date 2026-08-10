import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * The shared form-control hierarchy in content/src/components — InputField (base
 * input) -> ComboBox (a select, inheriting the field styling) -> ComboBoxLabeled
 * (a ComboBox in the labeled form-group row) — so every combo-box shares one
 * styling/layout instead of each caller repeating the CSS (WehParam's choice
 * prefs and settings.js's UiModeSelect both route through it). This extracts the
 * real classes and renders them against a fake React that records createElement
 * calls, to prove the produced markup.
 */
type RenderedEl = { type: any; props: any; children: any[] };

function loadComponents(): {
  InputField: any;
  ComboBox: any;
  ComboBoxLabeled: any;
} {
  // The classes live one-per-file in content/src/components/ (ES modules that
  // `import React`); read them, drop the import/export keywords, and evaluate the
  // trio in one scope against a fake React that records createElement calls.
  const read = (file: string) =>
    readFileSync(resolve('content/src/components/' + file), 'utf8')
      .replace(/^import .*$/gm, '')
      .replace(/^export /gm, '');
  const source =
    read('input-field.js')
    + '\n'
    + read('combo-box.js')
    + '\n'
    + read('combo-box-labeled.js');
  const createElement = (
    type: any,
    props: any,
    ...children: any[]
  ): RenderedEl => ({
    type,
    props: props || {},
    children: children
      .flat(Infinity)
      .filter(child => child != null && child !== false),
  });
  const React = { createElement, Component: class {} };
  // eslint-disable-next-line no-new-func
  return new Function(
    'React',
    source + '\nreturn { InputField, ComboBox, ComboBoxLabeled };',
  )(React);
}

function render(ComponentClass: any, props: any): RenderedEl {
  const instance = new ComponentClass();
  instance.props = props;
  return instance.render();
}

const OPTIONS = [
  { value: 'a', name: 'Apple' },
  { value: 'b', name: 'Banana' },
];

describe('shared combo-box components (content/src/components)', () => {
  const { InputField, ComboBox, ComboBoxLabeled } = loadComponents();

  it('InputField base renders a form-control text input', () => {
    const node = render(InputField, { value: 'x', id: 'f' });
    expect(node.type).toBe('input');
    expect(node.props.className).toBe('form-control');
    expect(node.props.type).toBe('text');
    expect(node.props.id).toBe('f');
  });

  it('ComboBox renders a 12em select with mapped options', () => {
    const node = render(ComboBox, { value: 'b', id: 'c', options: OPTIONS });
    expect(node.type).toBe('select');
    expect(node.props.className).toBe('form-control');
    expect(node.props.style.width).toBe('12em');
    expect(node.props.value).toBe('b');
    expect(node.children).toHaveLength(2);
    expect(node.children[0].type).toBe('option');
    expect(node.children[0].props.value).toBe('a');
    expect(node.children[0].children).toContain('Apple');
  });

  it('ComboBox honours an explicit width', () => {
    const node = render(ComboBox, { options: OPTIONS, width: '20em' });
    expect(node.props.style.width).toBe('20em');
  });

  it('ComboBoxLabeled wraps the select in the labeled form-group row', () => {
    const node = render(ComboBoxLabeled, {
      id: 'ui',
      label: 'User interface',
      value: 'a',
      options: OPTIONS,
    });
    expect(node.type).toBe('div');
    expect(node.props.className).toContain('form-group row');
    const [label, colWrap] = node.children;
    expect(label.type).toBe('label');
    expect(label.props.className).toBe('col-3 col-form-label');
    expect(label.props.htmlFor).toBe('ui');
    expect(label.children).toContain('User interface');
    expect(colWrap.props.className).toBe('col-8');
    // the select produced by the inherited ComboBox sits inside col-8
    const select = colWrap.children[0];
    expect(select.type).toBe('select');
    expect(select.props.id).toBe('ui');
    expect(select.children).toHaveLength(2);
  });
});
