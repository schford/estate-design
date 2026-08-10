<script>
  import { ICONS } from './icons.js';
  // Floating phone tab bar — constellation NAV-DESIGN "Adaptive Tabs", reskinned
  // for v0.5.0 "Nebula". Up to five slots, icon over a short label, active pill,
  // safe-area inset. Desktop (>= 720px) hides it entirely — the Header's
  // switcher pills take over. `chat` reserves the chat-bubble affordance: the
  // bar renders nothing extra for it, it simply documents that a bubble floats
  // above this bar and the app must clear it.
  //
  // The bar is `position: fixed`, not the prototype's `position: sticky` — the
  // consuming apps put it in normal document flow, where the mock's sticky +
  // negative-margin trick has nothing to hang off. Apps reserve the space with
  // page bottom padding instead.
  let { items = [], current = 'home', chat = false } = $props();
</script>

{#snippet icon(key)}
  {@const ic = ICONS[key] ?? ICONS.home}
  <svg viewBox={ic.vb} width="19" height="19" fill="none" stroke="currentColor"
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
    padding: 0 16px max(22px, calc(env(safe-area-inset-bottom, 0px) + 10px));
    pointer-events: none;
  }

  .est-tabs-in {
    display: flex;
    gap: 2px;
    padding: 6px;
    max-width: 100%;
    border-radius: var(--est-radius);
    background: var(--est-bar);
    backdrop-filter: var(--est-bar-blur);
    -webkit-backdrop-filter: var(--est-bar-blur);
    border: 0.5px solid var(--est-bar-border);
    box-shadow: var(--est-bar-shadow);
    pointer-events: auto;
  }

  .est-tab {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 3px; min-width: 0; min-height: 46px;
    padding: 6px 14px;
    border-radius: 16px;
    text-decoration: none;
    color: var(--est-mut);
    background: transparent;
    transition: background 220ms ease, color 220ms ease, box-shadow 220ms ease;
  }
  .est-tab-ico { width: 19px; height: 19px; display: block; }
  .est-tab-ico :global(svg) { width: 19px; height: 19px; display: block; }
  .est-tab-lbl {
    font-family: var(--est-sans); font-size: 13px; font-weight: 400;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;
  }
  .est-tab.on {
    color: var(--est-ink);
    background: var(--est-active);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 0 20px -6px rgba(110, 139, 255, 0.5);
  }

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
