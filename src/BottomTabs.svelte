<script>
  import { ICONS } from './icons.js';
  // Floating phone tab bar — v0.10.0: up to six equal slots across the width, an
  // 11px label under a 21px icon, and the selected tab marked the iOS 26/27 way:
  // a capsule filling its slot, the icon and label tinted, the glyph soft-filled.
  // The bar itself carries no colour. Desktop (>= 720px) hides it — the Header's
  // switcher pills take over. `chat` documents that a chat bubble floats above
  // this bar and the app must clear it (bar = 64px tall + the bottom offset).
  //
  // `position: fixed`: the consuming apps reserve the space with page bottom
  // padding. iOS Safari ignores prefers-reduced-transparency, so the bar has to
  // read on its own surface without that fallback.
  let { items = [], current = 'home', chat = false } = $props();
</script>

{#snippet icon(key)}
  {@const ic = ICONS[key] ?? ICONS.home}
  <svg viewBox={ic.vb} width="21" height="21" fill="none" stroke="currentColor"
       stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    {#each ic.d as p}<path d={p} />{/each}
  </svg>
{/snippet}

<nav class="est-tabs" aria-label="Primary">
  <div class="est-tabs-in">
    {#each items as t (t.key)}
      <a class="est-tab" class:on={t.key === current} href={t.href}
         aria-current={t.key === current ? 'page' : undefined}>
        <span class="est-tab-ico">{@render icon(t.icon ?? t.key)}</span>
        <span class="est-tab-lbl">{t.label}</span>
      </a>
    {/each}
  </div>
</nav>

<style>
  .est-tabs {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    z-index: 30;
    display: flex;
    justify-content: center;
    /* 26px off the bottom on a home-indicator phone (inset 34px); 10px floor. */
    padding: 0 8px max(10px, calc(env(safe-area-inset-bottom, 0px) - 8px));
    pointer-events: none;
  }

  .est-tabs-in {
    display: flex;
    gap: 2px;
    padding: 6px;
    width: 100%;
    max-width: 520px;
    border-radius: var(--est-radius);
    background: var(--est-bar);
    backdrop-filter: var(--est-bar-blur);
    -webkit-backdrop-filter: var(--est-bar-blur);
    border: 0.5px solid var(--est-bar-border);
    box-shadow: var(--est-bar-shadow);
    pointer-events: auto;
  }

  .est-tab {
    flex: 1 1 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 2px; min-width: 0; min-height: 50px;
    padding: 6px 2px;
    border-radius: 20px;
    text-decoration: none;
    color: var(--est-mut);
    background: transparent;
    transition: background 220ms ease, color 220ms ease, box-shadow 220ms ease;
  }
  .est-tab-ico { width: 21px; height: 21px; display: block; }
  .est-tab-ico :global(svg) { width: 21px; height: 21px; display: block; }
  .est-tab-lbl {
    font-family: var(--est-sans); font-size: 11px; font-weight: 400; letter-spacing: -0.01em;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;
  }
  .est-tab.on {
    color: var(--est-tint-info-fg);
    background: var(--est-tint-info);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95), inset 0 0 0 0.5px rgba(255, 255, 255, 0.7),
      0 0 18px -6px rgba(110, 139, 255, 0.55);
  }
  .est-tab.on .est-tab-lbl { font-weight: 600; }
  .est-tab.on .est-tab-ico :global(svg) { fill: currentColor; fill-opacity: 0.22; }

  @media (min-width: 720px) {
    .est-tabs { display: none; }
  }

  @media (prefers-reduced-transparency: reduce) {
    .est-tabs-in {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .est-tab { transition-duration: 1ms; }
  }
</style>
