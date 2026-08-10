import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/tokens.css', import.meta.url), 'utf8');

// Every --est-* name the constellation apps reference. v0.4 names all survive
// (values changed, semantics preserved); the v0.5 "Nebula" additions are at the
// end of each group.
const REQUIRED = [
  '--est-paper', '--est-under', '--est-paper-raised',
  '--est-ink', '--est-ink-soft', '--est-mut', '--est-faint', '--est-ghost',
  '--est-rule', '--est-rule-strong',
  '--est-mb', '--est-mb-bright', '--est-cm', '--est-cm-bright',
  '--est-cyan', '--est-cyan-bright',
  '--est-seal', '--est-em-grad', '--est-brass', '--est-link', '--est-link-hover',
  '--est-raise', '--est-active', '--est-shadow-hover',
  '--est-radius', '--est-radius-ctl', '--est-radius-pill',
  '--est-content-max', '--est-content-pad',
  '--est-glass', '--est-glass-blur', '--est-glass-border', '--est-glass-shadow',
  '--est-bar', '--est-bar-blur', '--est-bar-border', '--est-bar-shadow',
  '--est-flat-card', '--est-control',
  '--est-grad-brand', '--est-grad-text',
  '--est-tint-mb', '--est-tint-mb-mut', '--est-tint-cm', '--est-tint-cm-mut',
  '--est-tint-cookbook', '--est-tint-cookbook-mut',
  '--est-tint-reading', '--est-tint-reading-mut',
  '--est-tint-systems', '--est-tint-systems-mut',
  '--est-tint-knowledge', '--est-tint-knowledge-mut',
  '--est-tint-finances', '--est-tint-finances-mut',
  '--est-tint-travel', '--est-tint-travel-mut',
  '--est-serif', '--est-sans', '--est-caps', '--est-mono',
  '--est-ease'
];

test('tokens.css defines every contract token', () => {
  for (const t of REQUIRED) assert.match(css, new RegExp(`${t}\\s*:`), `${t} missing`);
});

test('tokens.css is light-only', () => {
  assert.doesNotMatch(css, /prefers-color-scheme/);
});

test('the v0.5 "Nebula" palette is exact', () => {
  assert.match(css, /--est-paper:\s*#F3F2FB/);
  assert.match(css, /--est-under:\s*#E9E7F6/);
  assert.match(css, /--est-ink:\s*#16162A/);
  assert.match(css, /--est-mut:\s*#6E6C8A/);
  assert.match(css, /--est-ghost:\s*#B4B1CC/);
  assert.match(css, /--est-mb:\s*#4C63D2/);
  assert.match(css, /--est-mb-bright:\s*#6E8BFF/);
  assert.match(css, /--est-cm:\s*#7B4FD1/);
  assert.match(css, /--est-cm-bright:\s*#A87CFF/);
  assert.match(css, /--est-cyan:\s*#2B84C4/);
  assert.match(css, /--est-cyan-bright:\s*#40C4FF/);
  assert.match(css, /--est-seal:\s*#D0335C/);
  assert.match(css, /--est-radius:\s*26px/);
  assert.match(css, /--est-radius-ctl:\s*18px/);
});

test('the glass / bar / flat-card surface sets carry their exact values', () => {
  assert.match(css, /--est-glass:\s*rgba\(255,\s*255,\s*255,\s*0\.60\)/);
  assert.match(css, /--est-glass-blur:\s*blur\(26px\)\s*saturate\(170%\)/);
  assert.match(css, /--est-bar:\s*rgba\(255,\s*255,\s*255,\s*0\.58\)/);
  assert.match(css, /--est-bar-blur:\s*blur\(34px\)\s*saturate\(180%\)/);
  assert.match(css, /--est-flat-card:\s*rgba\(255,\s*255,\s*255,\s*0\.72\)/);
  assert.match(css, /--est-control:\s*rgba\(255,\s*255,\s*255,\s*0\.66\)/);
  assert.match(css, /--est-active:\s*rgba\(70,\s*60,\s*160,\s*0\.11\)/);
});

test('the tint pairs are translucent backgrounds with accent foregrounds', () => {
  // -mut is the readable accent that sits ON the tint, not a muted grey.
  assert.match(css, /--est-tint-mb:\s*rgba\(110,\s*139,\s*255,\s*0\.14\)/);
  assert.match(css, /--est-tint-mb-mut:\s*#4C63D2/);
  assert.match(css, /--est-tint-systems-mut:\s*#2B84C4/);
  assert.match(css, /--est-tint-knowledge-mut:\s*#7B4FD1/);
});

test('Outfit is retired — system font stack, no @font-face, no fonts dir', () => {
  assert.doesNotMatch(css, /@font-face/);
  assert.doesNotMatch(css, /Outfit/i);
  assert.doesNotMatch(css, /woff2/);
  assert.match(css, /--est-sans:\s*-apple-system, 'SF Pro Text', system-ui, 'Segoe UI', Roboto, sans-serif/);
  // --est-serif / --est-caps survive only as aliases onto the sans stack
  assert.match(css, /--est-serif:\s*var\(--est-sans\)/);
  assert.match(css, /--est-caps:\s*var\(--est-sans\)/);
  assert.equal(existsSync(new URL('../src/fonts', import.meta.url)), false, 'src/fonts/ still present');
});

test('tokens.css still reserves the scrollbar gutter', () => {
  assert.match(css, /html\s*\{[^}]*scrollbar-gutter:\s*stable/);
});
