# estate-design

Shared design layer for the estate app constellation (see
`C:\claude_code\constellation\SPEC.md`). Tokens extracted from the Cookbook's
frozen v5 "Front Door" set (estate-hub `src/app.css`, locked 2026-07-07).
Light-only. Fonts are system stacks (Iowan Old Style/Palatino serif; SF/Segoe
sans) — there are no font assets by design.

Contents (hard cap, no component zoo): `tokens.css`, `Header`, `SearchOverlay`,
`LiveChip`. Consumed at build time as an npm tarball dependency:
`"estate-design": "https://github.com/schford/estate-design/archive/refs/tags/v0.2.0.tar.gz"`

Header contract: identical in every app, never forks. `◆ <wordmark>` → the home
app; Search opens the overlay (federated `/api/search` on home); Emergency in
seal red (red = critical only, estate-wide). On phones it collapses to
wordmark + search icon.
