# estate-design

Shared design layer for the estate app constellation (see
`C:\claude_code\constellation\SPEC.md`). v0.3.0 is the "Tinted Tiles" set
(design handoff 2026-07-18, option 2d): warm off-white paper, one pastel per
section (`--est-tint-*` pairs), 22px card radius, pill buttons, and the
**Outfit** typeface self-hosted in the package (`src/fonts/`, latin +
latin-ext variable woff2 — no external font fetches, CM must render offline).
Light-only. `--est-serif` survives as a display alias pointing at Outfit so
pre-v0.3 heading rules keep working.

**Import order matters:** apps must import `estate-design/tokens.css` BEFORE their
own stylesheet — tokens.css carries `:root` defaults (e.g. `--est-content-max`),
and a later-loaded tokens.css silently clobbers same-selector app overrides
(bit reading-app, 2026-07-18).

Contents (hard cap, no component zoo): `tokens.css`, `Header`, `SearchOverlay`,
`LiveChip`, `BottomTabs` (v0.4.0). Consumed at build time as an npm tarball dependency:
`"estate-design": "https://github.com/schford/estate-design/archive/refs/tags/v0.4.0.tar.gz"`

Since v0.3.3 tokens.css also sets `html { scrollbar-gutter: stable }` — centred
layouts (header `.est-in`, app content columns) must not shift when navigation
crosses the scrollbar threshold. Don't re-add per-app scrollbar/overflow fixes.

Header contract (v0.4.0 "Adaptive Tabs" — nav design of record:
`C:\claude_code\constellation\NAV-DESIGN.md`): identical in every app, never forks.
Brand is a green circle-H plus the word "Home" → `/`. Desktop (≥900px): destination
switcher pills from the `destinations` prop (`{key,label,href}[]`, active one filled
per `current`) — the consuming app supplies them (home-app: `src/lib/nav/nav.js`
filtered by identity, with Home omitted because the brand is the home link); search
is a white pill opening the overlay (`searchApi`); Emergency is a terracotta pill
(`--est-seal`; critical only, estate-wide). Phone (<900px): circle-H + current-module
label + search icon + round Emergency icon — Emergency stays visible at every width.
The pre-0.4 `app`/`appUrl` props are gone.

`BottomTabs` (v0.4.0): fixed phone-only tab bar (hidden ≥900px). Props: `items`
(same destination shape; icon keys `home`/`cookbook`/`reading`/`dining`/`guides`),
`current`, and `chat` — a reserved Phase-6 bubble slot that renders nothing while
false. Safe-area inset padding built in. Apps align/blend the shell by setting
`--est-content-max` / `--est-content-pad` / `--est-header-bg` on the page
(defaults 1060px / 20px / paper).
