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
`LiveChip`. Consumed at build time as an npm tarball dependency:
`"estate-design": "https://github.com/schford/estate-design/archive/refs/tags/v0.3.2.tar.gz"`

Header contract: identical in every app, never forks. Brand is a green circle-H
plus the labelled word "Home" → the home app; on sub-apps the app's own name
follows as a separate link to that app's root (`[H] Home · kb`). Search is a
white pill opening the overlay (federated `/api/search` on home); Emergency is
a terracotta pill (`--est-seal`; critical only, estate-wide). On phones it
collapses to circle-H + app name + search icon. Apps align/blend the header by
setting `--est-content-max` / `--est-content-pad` / `--est-header-bg` on the page
(defaults 1060px / 20px / paper).
