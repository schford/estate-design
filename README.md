# estate-design

Shared design layer for the estate app constellation (see
`C:\claude_code\constellation\SPEC.md`). **v0.6.0 is the "Nebula" set plus a
semantic role tier** (see *What changed in v0.6.0*). Nebula (design
handoff 2026-08, Nebula variant): one calm pale-lavender canvas, a slowly
drifting blue/violet aurora behind everything, and controls that float above the
content as a translucent glass layer. Colour identifies rather than fills. It
replaces the v0.3/v0.4 "Tinted Tiles" set — the per-section pastels are gone,
though every `--est-tint-*` token *name* survives with new values.

Light-only, deliberately: there is no `prefers-color-scheme` block. Dark mode
under this treatment is not an inversion (glass alphas, the specular inset
highlight, the aurora alphas and the veil all need their own values) and is a
follow-up, not a freebie.

**Import order matters:** apps must import `estate-design/tokens.css` BEFORE their
own stylesheet — tokens.css carries `:root` defaults (e.g. `--est-content-max`),
and a later-loaded tokens.css silently clobbers same-selector app overrides
(bit reading-app, 2026-07-18).

Contents (hard cap, no component zoo): `tokens.css`, `icons.js`, `Aurora`,
`Header`, `BottomTabs`, `SearchOverlay`, `LiveChip`. Consumed at build time as a
git/tarball dependency pinned to the release tag.

Since v0.3.3 tokens.css also sets `html { scrollbar-gutter: stable }` — centred
layouts must not shift when navigation crosses the scrollbar threshold. Don't
re-add per-app scrollbar/overflow fixes.

## What changed in v0.10.3

**Header holds with fonts up to ~20% wider than SF.** v0.10.2's steps were tuned in SF on a Mac
and left 19px spare at 720px; Linux CI's fallback sans is wider and ran the pills under the search
box again at 720 and 1000px. Steps now come earlier, and a third one is added (all desktop-only; the
phone layer is untouched, and in SF at 1260px and up the header renders exactly as v0.10.1):

- **720–1259.98px** (was 1179.98): icon-only search, pill side padding 12px.
- **720–1059.98px** (was 999.98): SOS, account icon, home mark alone, pill side padding 9px, gap 6px.
- **720–799.98px** (new): pill text 14px with 8px sides, divider hidden, gap 4px, SOS padding 10px.

Measured in home-app as admin (five pills + account), spare row space at the tightest point of
each step, SF / a font calibrated 15% wider / 20% wider: 720px 69/33/18, 800px 86/46/31, 1060px
101/30/7, 1260px 109/35/5. A font 15% wider than SF keeps the full header at 1280px.

## What changed in v0.10.2

**Header compacts between 720 and 1180px.** With six destinations the full desktop row needs
about 1135px of viewport, so below that the pills ran under the search box. Two steps now, both
desktop-only (the phone layer is untouched, and at 1180px and up the header renders as v0.10.1):

- **720–1179.98px:** search becomes the 38px icon-only square (label hidden, no 200px floor);
  pill side padding 15px → 12px.
- **720–999.98px:** also the "SOS" Emergency pill, the account's person icon (the link keeps
  the person's name as its accessible name), the home mark without the word "Home" (the link
  keeps its "Home" name), pill side padding 9px, row gap 6px.

The brand lockup no longer shrinks on desktop (`flex: none`), so "Home" is never clipped. Pill
text stays 15px and no destination is hidden. Measured in home-app as admin (five pills +
account): tightest fit is 19px of spare row at 720px and 37px at 1180px.

## What changed in v0.10.1

**BottomTabs: slots give their whole width to the label.** `.est-tab` side padding 2px → 0 and
the gap between slots 2px → 0, so a label has about 58px on a 390pt phone. With six equal slots
an 11px "Cookbook" was clipped in wider fallback fonts (Linux CI); SF on iOS always fitted.

## What changed in v0.10.0

**BottomTabs: six labelled slots, Liquid Glass capsule.** The bar now spans the width (8px
sides, capped at 520px) with up to six equal slots — 21px icon over an 11px label — and sits
lower: `max(10px, inset - 8px)` off the bottom (26px on a home-indicator phone, was 44px). The
selected tab is a capsule filling its slot (`--est-tint-info`), icon and label tinted
(`--est-tint-info-fg`, label 600) and the glyph soft-filled. The bar itself carries no colour.
Basis: iOS 26/27 tab bars (Apple DTS: the capsule is the system-standard indicator; HIG: keep
labels, prefer filled symbols). Bar footprint is 64px — apps re-clear their chat bubble and
page bottom padding. Props and class names are unchanged.

## What changed in v0.9.0

**Phone header air removed.** The phone `.est-in` top padding drops its
`max(52px, …)` floor and is now `calc(env(safe-area-inset-top, 0px) + 12px)`.
The floor came from the Nebula mock's fake status bar; real Safari starts the
page below the status bar and reports a 0px inset (iOS 26.5 and 27.0, verified
2026-09-17), so every phone page paid 52px of empty air before the header row.
A Home Screen (standalone) launch still clears the notch through the inset.

**BottomTabs fits five labels.** `.est-tab` side padding drops from 14px to
6px so five 13px labels (Home / Cookbook / Reading / Forecast / Guides — the
admin set) fit a 375pt phone without ellipsising. Six tabs do **not** fit at
13px on anything narrower than 402pt — a Phase-4 (Dining) decision, not a
package concern.

## What changed in v0.8.0

**Header brand tile is the home mark.** The `H` letter in `.est-mark` is replaced
by the app icon's mark (design handoff 2026-09-17, concept 3c "three and a
button": three white dashboard tiles + the Emergency button bottom-right). The
tile keeps `--est-grad-brand` as its ground; the button is drawn with the two
stops of `--est-em-grad`. Same geometry as home-app's `static/icon.svg`, so the
Home Screen icon, favicon and nav tile match. No prop or layout change.

## What changed in v0.7.0

**Header `account` prop.** `Header` takes an optional `account={{ label, href }}`
— the signed-in person's account link (or "Sign in") — rendered as a pill on
desktop and a `person` glyph (new in `icons.js`) on phone. It is never a nav
destination. Omitting the prop leaves the header exactly as it was.

## What changed in v0.6.1

**Header gap tightened.** The desktop floating pill's `margin-bottom` drops from
`clamp(28px, 5vw, 52px)` to `clamp(18px, 2.5vw, 28px)`. At full desktop/iPad
widths every page was paying 52px of empty air below the header before its own
hero even started; consumers (home-app front door) were already clawing it back
with negative margins. Those workarounds should be removed when taking this
version.

## What changed in v0.6.0

**Semantic roles.** `tokens.css` gains a role tier that apps consume instead of
the primitives, so the estate speaks one colour vocabulary: mainly white
(neutral), blue tint (informational), violet tint (editorial), seal red
(critical only). The roles are aliases onto the existing Nebula primitives —
**no new hues** — plus four new alpha values.

| Role | Wash | Foreground | Means |
| --- | --- | --- | --- |
| info | `--est-tint-info` | `--est-tint-info-fg` | informational: status, callouts, neutral-positive badges |
| editorial | `--est-tint-editorial` | `--est-tint-editorial-fg` | recommendations, assistant/authored content |
| neutral | `--est-tint-neutral` | `--est-tint-neutral-fg` | the default; most chips and badges |
| crit | `--est-tint-crit` | `--est-tint-crit-fg` | critical/emergency only — never decorative |

Plus `--est-control-hover` (hover fill for control surfaces) and
`--est-row-hover` (list/table row hover; `--est-active` stays reserved for the
*selected* state), and `--est-link` / `--est-link-hover` — defined since v0.5,
now the required route for every link.

Nothing was removed. This is a public package: every v0.4/v0.5 token name is
still defined, including the ones the role tier supersedes in practice
(`--est-brass`, `--est-cyan*`, the per-section `--est-tint-*` pairs).

Component sweep: `SearchOverlay`'s row hover now reads `var(--est-row-hover)`
instead of the literal. Rendered output is unchanged — v0.6 is a token
substitution, not a restyle.

## What changed in v0.5.0

- **Outfit is retired.** The `@font-face` blocks and `src/fonts/` are deleted.
  `--est-sans` is now the platform stack (`-apple-system, 'SF Pro Text',
  system-ui, 'Segoe UI', Roboto, sans-serif`); `--est-serif` and `--est-caps`
  remain as aliases so pre-v0.5 rules keep resolving. No webfont is fetched, so
  CM still renders correctly offline.
- **No uppercase letterspaced metadata anywhere.** `LiveChip`'s label and the
  search-result badge were the package's two instances; both are now sentence
  case at 13.5px/13px in `--est-mut`. `--est-brass` survives as a token name but
  no longer means brass (it is now the same value as `--est-mut`).
- **The breakpoint is 720px**, not 900px, in both `Header` and `BottomTabs`.
  Both components are written mobile-first: the phone layout is the base and
  `@media (min-width: 720px)` is the desktop override.
- **New tokens**: `--est-under`, `--est-ghost`, `--est-cyan`/`--est-cyan-bright`,
  `--est-mb-bright`, `--est-cm-bright`, `--est-em-grad`, `--est-link`/
  `--est-link-hover`, `--est-active`, `--est-radius-ctl`, `--est-ease`, the
  glass/bar/control surface sets, `--est-flat-card`, `--est-grad-brand`,
  `--est-grad-text`.
- **Motion is trimmed** relative to the mock: the aurora drifts and hovers lift,
  but there is **no toolbar sheen** and **no Emergency pulse** (the Emergency
  control is a solid gradient pill). Entrance staggers are the consuming app's
  business, and are first-mount only there.

## Surfaces

True glass — `backdrop-filter` — is expensive to composite continuously, and
worst on older iPhones during scroll. It is reserved for the toolbar, the phone
tab bar, popovers, score badges, the chat panel and the search overlay. Grid
cards use the flat `--est-flat-card` fill instead. Every `backdrop-filter` in
this package ships with its `-webkit-` twin.

| Token set | Use |
| --- | --- |
| `--est-bar`, `--est-bar-blur`, `--est-bar-border`, `--est-bar-shadow` | header pill, tab bar |
| `--est-glass`, `--est-glass-blur`, `--est-glass-border`, `--est-glass-shadow` | glass cards, search panel, popovers |
| `--est-control` | fields, buttons, segmented tracks |
| `--est-flat-card` | grid cards (recipe, book) — no blur |

Components carry their own `prefers-reduced-transparency` fallback
(`rgba(255,255,255,0.92)`, blur off) and their own `prefers-reduced-motion`
handling, because they ship to other apps that may not have a global rule.

## `Aurora`

The ambient background stack: three drifting radial gradients (26s / 34s / 42s,
near-coprime so the composite never visibly loops) under a flattening veil.
No props. `position: fixed`, `pointer-events: none`, `aria-hidden`.

Mount it as the **first child of the page root**. Two things the host must get
right:

1. It is a positioned element, so **page content must itself be positioned**
   (`position: relative`, or any z-index above 0) or it will paint underneath
   the veil.
2. The page root wants `overflow: clip`, **not** `overflow: hidden` — `hidden`
   turns the root into a scroll container.

Under `prefers-reduced-motion` the aurora stays and freezes at frame 0. It is
the canvas, not an ornament; removing it would be a different design.

## `icons.js`

`ICONS` is the central monoline set: `{ home, cookbook, reading, dining, guides,
systems, finances, travel, knowledge, search, warning, chevron }`, each
`{ vb: '0 0 24 24', d: [<path strings>] }`. Colour comes from `currentColor`;
stroke weight lives with the consumer (1.7 at UI sizes) so a decorative oversize
glyph can drop to a hairline without a second copy of the path:

```svelte
{@const ic = ICONS[key]}
<svg viewBox={ic.vb} width="20" height="20" fill="none" stroke="currentColor"
     stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  {#each ic.d as p}<path d={p} />{/each}
</svg>
```

## `Header`

Props unchanged from v0.4: `homeUrl`, `emergencyUrl`, `searchApi`,
`destinations` (`{key,label,href}[]`), `current`. Class names unchanged too
(`est-header`, `est-in`, `est-brand`, `est-mark`, `est-switch`, `est-pill`/`on`,
`est-search`, `est-em`). `⌘K` and `/` still open the search overlay, and the
search control still carries `aria-label="Search"`.

**Desktop (≥720px)** is a floating glass pill: `position: sticky; top: 16px;
z-index: 30` — note the z-index rose from 10, so app chrome that used to sit
above the header no longer does. Centred, capped at `--est-content-max`, bar
surface, 26px radius. Inside: a 32×32 11px-radius gradient `H` mark plus the
word "Home" (the whole lockup links to `homeUrl`), a hairline divider, the
destination pills (15px; active = `--est-active` fill + inset specular highlight
+ soft glow, 220ms), a recessed "Search everything" pill, the Emergency
gradient pill and the account pill. Below 1260px the search pill becomes a 38px
icon square; below 1060px Emergency reads "SOS", the account shows its person
icon and the lockup drops the word "Home"; below 800px the pills drop to 14px
and the divider goes (v0.10.3).

**Phone (<720px)** is a compact, **non-sticky** header row: the `H` mark plus
the *adaptive current-section label* (`est-brand-current` — a deliberate
deviation from the mock's static "Home", carried over from v0.4), a 38px glass
search square, and an "SOS" gradient pill. Emergency stays reachable at every
width. Top padding is
`max(52px, calc(env(safe-area-inset-top, 0px) + 12px))`, so the app's viewport
meta needs `viewport-fit=cover`.

The `--est-header-bg` hook is **gone**. There is one canvas now; the header pill
floats and the page shows through it. Apps still set `--est-content-max` /
`--est-content-pad`.

## `BottomTabs`

Props unchanged: `items` (same destination shape; icon keys index `ICONS`),
`current`, and `chat` — a reserved bubble slot that renders nothing while false.

A floating glass bar: `position: fixed`, full width less 8px sides (capped at
520px), 26px radius, 6px padding, bar surface, `z-index: 30`, bottom offset
`max(10px, calc(env(safe-area-inset-bottom, 0px) - 8px))`. Up to six equal slots,
each ≥50px tall with a 21px icon over an 11px label; the active slot is a capsule
(`--est-tint-info`) with icon and label in `--est-tint-info-fg` and the glyph
soft-filled. Hidden at ≥720px.

Because the bar floats and is fixed, **the app must reserve the space** with
page bottom padding (64px of bar + the bottom offset + a gap) — the bar does not
occupy document flow at the bottom of the page.
