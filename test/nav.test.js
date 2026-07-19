import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const header = readFileSync(new URL('../src/Header.svelte', import.meta.url), 'utf8');
const tabs = readFileSync(new URL('../src/BottomTabs.svelte', import.meta.url), 'utf8');
const index = readFileSync(new URL('../src/index.js', import.meta.url), 'utf8');
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

test('Header takes a destinations switcher and a current key', () => {
  assert.match(header, /destinations/);
  assert.match(header, /current/);
  assert.match(header, /est-switch/);
  assert.match(header, /est-pill/);
});

test('Header keeps Emergency reachable on phone via an icon', () => {
  assert.match(header, /est-em-icon/);
  // the phone media query must NOT hide the whole Emergency control
  assert.doesNotMatch(header, /\.est-em\s*\{[^}]*display:\s*none/);
});

test('Header phone/desktop boundary is 900px', () => {
  assert.match(header, /max-width:\s*900px/);
});

test('BottomTabs is a fixed, phone-only bar with a safe-area inset', () => {
  assert.match(tabs, /class="est-tabs"/);
  assert.match(tabs, /position:\s*fixed/);
  assert.match(tabs, /env\(safe-area-inset-bottom/);
  assert.match(tabs, /max-width:\s*900px/);
  assert.match(tabs, /chat/); // documented Phase-6 slot
});

test('index exports BottomTabs', () => {
  assert.match(index, /BottomTabs/);
});

test('package version is bumped for the nav release', () => {
  assert.equal(pkg.version, '0.4.0');
});
