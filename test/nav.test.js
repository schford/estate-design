import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

const read = (f) => readFileSync(new URL(`../src/${f}`, import.meta.url), 'utf8');

const header = read('Header.svelte');
const tabs = read('BottomTabs.svelte');
const aurora = read('Aurora.svelte');
const overlay = read('SearchOverlay.svelte');
const chip = read('LiveChip.svelte');
const icons = read('icons.js');
const index = read('index.js');
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const SRC = readdirSync(new URL('../src', import.meta.url));
const ALL = SRC.map(read).join('\n');

/* ----------------------------------------------------------------- Header */

test('Header takes a destinations switcher and a current key', () => {
  assert.match(header, /destinations/);
  assert.match(header, /current/);
  assert.match(header, /est-switch/);
  assert.match(header, /est-pill/);
});

test('Header keeps every class name the consuming apps pin', () => {
  for (const c of ['est-header', 'est-in', 'est-brand', 'est-mark', 'est-switch',
                   'est-pill', 'est-search', 'est-em']) {
    assert.match(header, new RegExp(`class="[^"]*\\b${c}\\b`), `${c} missing from markup`);
  }
  assert.match(header, /class:on=/);
});

test('Header keeps the search affordance and its shortcuts', () => {
  assert.match(header, /aria-label="Search"/);
  assert.match(header, /e\.key === 'k'/);
  assert.match(header, /e\.key === '\/'/);
  assert.match(header, /Search everything/);
});

test('Header keeps Emergency reachable on phone via an icon', () => {
  assert.match(header, /est-em-icon/);
  // the phone layer must NOT hide the whole Emergency control
  assert.doesNotMatch(header, /\.est-em\s*\{[^}]*display:\s*none/);
  // phone reads "SOS", desktop reads "Emergency"
  assert.match(header, /est-em-short/);
  assert.match(header, />SOS</);
});

test('Header phone/desktop boundary is 720px, mobile-first', () => {
  assert.match(header, /@media \(min-width: 720px\)/);
  assert.doesNotMatch(header, /900px/);
});

test('Header desktop is the floating glass pill', () => {
  assert.match(header, /position:\s*sticky/);
  assert.match(header, /top:\s*16px/);
  assert.match(header, /z-index:\s*30/);
  assert.match(header, /background:\s*var\(--est-bar\)/);
  assert.match(header, /background:\s*var\(--est-grad-brand\)/); // H mark
  assert.match(header, /background:\s*var\(--est-em-grad\)/); // Emergency pill
  assert.match(header, /background:\s*var\(--est-active\)/); // active tab pill
});

test('Header no longer reads the --est-header-bg hook', () => {
  assert.doesNotMatch(header, /--est-header-bg/);
});

/* ------------------------------------------------------------- BottomTabs */

test('BottomTabs is a fixed, phone-only floating bar with a safe-area inset', () => {
  assert.match(tabs, /class="est-tabs"/);
  assert.match(tabs, /class="est-tab"|class="est-tab"|est-tab\b/);
  assert.match(tabs, /position:\s*fixed/);
  assert.match(tabs, /env\(safe-area-inset-bottom/);
  assert.match(tabs, /@media \(min-width: 720px\)/);
  assert.doesNotMatch(tabs, /900px/);
  assert.match(tabs, /chat/); // documented chat-bubble slot
});

test('BottomTabs wears the bar surface and the shared active pill', () => {
  assert.match(tabs, /background:\s*var\(--est-bar\)/);
  assert.match(tabs, /backdrop-filter:\s*var\(--est-bar-blur\)/);
  assert.match(tabs, /min-height:\s*46px/);
  assert.match(tabs, /background:\s*var\(--est-active\)/);
});

test('BottomTabs draws from the shared icon set, not inline paths', () => {
  assert.match(tabs, /import \{ ICONS \} from '\.\/icons\.js'/);
  assert.doesNotMatch(tabs, /<path d="M/); // no hard-coded geometry left
});

/* ----------------------------------------------------------------- Aurora */

test('Aurora is a fixed, inert background stack', () => {
  assert.match(aurora, /class="est-aurora"/);
  assert.match(aurora, /aria-hidden="true"/);
  assert.match(aurora, /position:\s*fixed/);
  assert.match(aurora, /pointer-events:\s*none/);
  assert.match(aurora, /inset:\s*-20%/);
  assert.match(aurora, /filter:\s*blur\(10px\)/);
});

test('Aurora runs three near-coprime drifts, GPU-promoted', () => {
  assert.match(aurora, /animation:\s*auroraA 26s ease-in-out infinite/);
  assert.match(aurora, /animation:\s*auroraB 34s ease-in-out infinite/);
  assert.match(aurora, /animation:\s*auroraC 42s ease-in-out infinite/);
  assert.match(aurora, /@keyframes auroraA/);
  assert.match(aurora, /@keyframes auroraB/);
  assert.match(aurora, /@keyframes auroraC/);
  assert.match(aurora, /will-change:\s*transform/);
});

test('Aurora freezes at frame 0 under reduced motion rather than vanishing', () => {
  const rm = aurora.slice(aurora.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.ok(rm.length > 0, 'no reduced-motion block');
  assert.match(rm, /animation:\s*none/);
  assert.match(rm, /transform:\s*translate3d\(-6%,\s*-4%,\s*0\)\s*scale\(1\)/);
  assert.doesNotMatch(rm, /display:\s*none/);
});

/* ------------------------------------------------- SearchOverlay, LiveChip */

test('SearchOverlay keeps its API and debounce, and wears the new veil + glass', () => {
  assert.match(overlay, /searchApi/);
  assert.match(overlay, /onclose/);
  assert.match(overlay, /}, 150\)/);
  assert.match(overlay, /role="dialog"/);
  assert.match(overlay, /background:\s*rgba\(40,\s*34,\s*82,\s*0\.25\)/);
  assert.match(overlay, /backdrop-filter:\s*blur\(8px\)/);
  assert.match(overlay, /background:\s*var\(--est-glass\)/);
  assert.match(overlay, /border-radius:\s*var\(--est-radius\)/);
});

test('SearchOverlay row hover goes through the semantic role, not a literal', () => {
  assert.match(overlay, /\.est-panel li:hover\s*\{\s*background:\s*var\(--est-row-hover\)/);
});

test('no component hardcodes a value the v0.6 roles now own', () => {
  // Same rgba the roles carry — components must read the token instead. The
  // literals still live in tokens.css; ALL is src/, which includes it, so check
  // the components only.
  const components = ['Header.svelte', 'BottomTabs.svelte', 'SearchOverlay.svelte',
                      'LiveChip.svelte', 'Aurora.svelte'].map(read).join('\n');
  assert.doesNotMatch(components, /rgba\(70,\s*60,\s*160,\s*0\.06\)/);
  assert.doesNotMatch(components, /rgba\(110,\s*108,\s*138,\s*0\.12\)/);
  assert.doesNotMatch(components, /rgba\(208,\s*51,\s*92,\s*0\.12\)/);
  assert.doesNotMatch(components, /rgba\(255,\s*255,\s*255,\s*0\.85\)/);
});

test('LiveChip keeps its fetch contract and pinned class names', () => {
  assert.match(chip, /fetch\(src\)/);
  assert.match(chip, /r\.status === 200/);
  assert.match(chip, /class="est-chip"/);
  assert.match(chip, /class="est-chip-label"/);
  assert.match(chip, /\.est-chip-label\s*\{[^}]*color:\s*var\(--est-mut\)/);
});

/* ------------------------------------------------------------------ icons */

test('ICONS covers every key the constellation needs, on a 24 grid', () => {
  for (const k of ['home', 'cookbook', 'reading', 'dining', 'guides', 'systems',
                   'finances', 'travel', 'knowledge', 'search', 'warning', 'chevron']) {
    assert.match(icons, new RegExp(`\\b${k}:\\s*\\{`), `ICONS.${k} missing`);
  }
  const grids = icons.match(/vb: '0 0 24 24'/g) ?? [];
  assert.equal(grids.length, 12, 'every icon must declare the 24x24 viewBox');
});

test('ICONS reuses the v0.4 BottomTabs geometry verbatim', () => {
  assert.match(icons, /M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z/);
  assert.match(icons, /M5 10h14v4a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z/);
  assert.match(icons, /M6 4h9l3 3v13H6z/);
});

/* -------------------------------------------------------- package surfaces */

test('index exports the full v0.5.0 surface', () => {
  for (const s of ['Header', 'SearchOverlay', 'LiveChip', 'BottomTabs', 'Aurora', 'ICONS']) {
    assert.match(index, new RegExp(`\\b${s}\\b`), `${s} not exported`);
  }
});

test('package version is bumped for the semantic-roles release', () => {
  assert.equal(pkg.version, '0.6.0');
  assert.equal(pkg.exports['./tokens.css'], './src/tokens.css');
});

/* -------------------------------------------------- estate-wide invariants */

test('no uppercase letterspaced metadata survives anywhere in src', () => {
  assert.doesNotMatch(ALL, /text-transform:\s*uppercase/);
  // positive tracking is the tell; negative tracking on display type is by design
  assert.doesNotMatch(ALL, /letter-spacing:\s*0?\.\d/);
});

test('the trimmed-motion decisions hold: no toolbar sheen, no Emergency pulse', () => {
  assert.doesNotMatch(ALL, /sheen/i);
  assert.doesNotMatch(ALL, /pulse/i);
});

test('every backdrop-filter ships its -webkit- twin', () => {
  const plain = (ALL.match(/(?<!-webkit-)backdrop-filter:/g) ?? []).length;
  const webkit = (ALL.match(/-webkit-backdrop-filter:/g) ?? []).length;
  assert.equal(plain, webkit, `${plain} backdrop-filter vs ${webkit} -webkit-backdrop-filter`);
});

test('the retired display face and the 900px breakpoint are gone package-wide', () => {
  assert.doesNotMatch(ALL, /Outfit/i);
  assert.doesNotMatch(ALL, /@font-face/);
  // 900px survives only as an aurora gradient size, never as a breakpoint
  assert.doesNotMatch(ALL, /(?:min|max)-width:\s*900px/);
  assert.equal(SRC.includes('fonts'), false, 'src/fonts/ still present');
});
