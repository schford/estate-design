<script>
  // Fixed phone tab bar — constellation NAV-DESIGN "Adaptive Tabs". Up to five
  // slots, icon + short label, active state, safe-area inset. Desktop hides it
  // entirely (the Header switcher pills take over at >=900px). `chat` reserves
  // the Phase-6 chat-bubble affordance: nothing renders until chat ships; the
  // bar simply leaves room for a bubble to float above it later.
  let { items = [], current = 'home', chat = false } = $props();
</script>

{#snippet icon(key)}
  {#if key === 'home'}
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
  {:else if key === 'cookbook'}
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10h14v4a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M4 10h16M9 10V7m6 3V7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
  {:else if key === 'reading'}
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6c-2-1.3-4.5-1.3-7-1v12c2.5-.3 5-.3 7 1 2-1.3 4.5-1.3 7-1V5c-2.5-.3-5-.3-7 1z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><line x1="12" y1="6" x2="12" y2="18" stroke="currentColor" stroke-width="1.7"/></svg>
  {:else if key === 'dining'}
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v7m0 0a2 2 0 0 0 2-2V3M7 10v11M17 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
  {:else if key === 'guides'}
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h9l3 3v13H6z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 9h6M9 13h6M9 17h4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
  {:else}
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>
  {/if}
{/snippet}

<nav class="est-tabs" aria-label="Primary">
  {#each items as t (t.key)}
    <a class="est-tab" class:on={t.key === current} href={t.href}
       aria-current={t.key === current ? 'page' : undefined}>
      <span class="est-tab-ico">{@render icon(t.icon ?? t.key)}</span>
      <span class="est-tab-lbl">{t.label}</span>
    </a>
  {/each}
</nav>

<style>
  .est-tabs { display: none; }
  @media (max-width: 900px) {
    .est-tabs { display: flex; position: fixed; left: 0; right: 0; bottom: 0; z-index: 20;
      background: var(--est-paper-raised); border-top: 1px solid var(--est-rule);
      padding-bottom: env(safe-area-inset-bottom, 0px); }
    .est-tab { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px;
      padding: 8px 4px 6px; text-decoration: none; color: var(--est-mut); min-width: 0; }
    .est-tab-ico { width: 22px; height: 22px; display: block; }
    .est-tab-ico :global(svg) { width: 22px; height: 22px; display: block; }
    .est-tab-lbl { font-family: var(--est-sans); font-size: 11px; font-weight: 500;
      letter-spacing: 0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }
    .est-tab.on { color: var(--est-mb); }
  }
</style>
