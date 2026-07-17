import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/tokens.css', import.meta.url), 'utf8');

const REQUIRED = [
  '--est-paper', '--est-paper-raised', '--est-ink', '--est-ink-soft',
  '--est-mut', '--est-faint', '--est-rule', '--est-rule-strong',
  '--est-mb', '--est-cm', '--est-seal', '--est-brass', '--est-raise',
  '--est-serif', '--est-sans', '--est-caps', '--est-mono'
];

test('tokens.css defines every contract token', () => {
  for (const t of REQUIRED) assert.match(css, new RegExp(`${t}\\s*:`), `${t} missing`);
});

test('tokens.css is light-only', () => {
  assert.doesNotMatch(css, /prefers-color-scheme/);
});

test('frozen v5 values survive verbatim', () => {
  assert.match(css, /--est-paper:\s*#fffcf0/);
  assert.match(css, /--est-seal:\s*#af3029/);
  assert.match(css, /--est-mb:\s*#205ea6/);
  assert.match(css, /--est-cm:\s*#66800b/);
});
