import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/tokens.css', import.meta.url), 'utf8');

const REQUIRED = [
  '--est-paper', '--est-paper-raised', '--est-ink', '--est-ink-soft',
  '--est-mut', '--est-faint', '--est-rule', '--est-rule-strong',
  '--est-mb', '--est-cm', '--est-seal', '--est-brass', '--est-raise',
  '--est-shadow-hover', '--est-radius', '--est-radius-pill',
  '--est-tint-mb', '--est-tint-mb-mut', '--est-tint-cm', '--est-tint-cm-mut',
  '--est-tint-cookbook', '--est-tint-cookbook-mut',
  '--est-tint-reading', '--est-tint-reading-mut',
  '--est-tint-systems', '--est-tint-systems-mut',
  '--est-tint-knowledge', '--est-tint-knowledge-mut',
  '--est-tint-finances', '--est-tint-finances-mut',
  '--est-tint-travel', '--est-tint-travel-mut',
  '--est-serif', '--est-sans', '--est-caps', '--est-mono'
];

test('tokens.css defines every contract token', () => {
  for (const t of REQUIRED) assert.match(css, new RegExp(`${t}\\s*:`), `${t} missing`);
});

test('tokens.css is light-only', () => {
  assert.doesNotMatch(css, /prefers-color-scheme/);
});

test('frozen v0.3 "tinted tiles" values survive verbatim', () => {
  assert.match(css, /--est-paper:\s*#f4f2ec/);
  assert.match(css, /--est-seal:\s*#cf6b4a/);
  assert.match(css, /--est-mb:\s*#5f7350/);
  assert.match(css, /--est-cm:\s*#4a7a8a/);
});

test('Outfit ships self-hosted', () => {
  assert.match(css, /@font-face/);
  assert.match(css, /font-family:\s*'Outfit'/);
  assert.match(css, /url\('\.\/fonts\/outfit-latin\.woff2'\)/);
});
