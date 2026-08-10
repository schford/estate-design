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
+ soft glow, 220ms), a recessed "Search everything" pill, and the Emergency
gradient pill.

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

A floating glass bar: `position: fixed`, centred, 26px radius, 6px padding, bar
surface, `z-index: 30`, bottom offset
`max(22px, calc(env(safe-area-inset-bottom, 0px) + 10px))`. Items are ≥46px tall
with a 19px icon over a 13px label; the active item gets the same pill + glow as
the desktop tabs. Hidden at ≥720px.

Because the bar floats and is fixed, **the app must reserve the space** with
page bottom padding (bar height + 22px + safe-area) — the bar no longer occupies
document flow at the bottom of the page.
