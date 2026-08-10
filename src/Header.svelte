<script>
  import SearchOverlay from './SearchOverlay.svelte';
  import { ICONS } from './icons.js';
  // homeUrl: the H-mark target. destinations: the destination-switcher config
  // (from the consuming app's nav config). current: active destination key.
  // chat is intentionally absent here — the bubble is a BottomTabs/app concern.
  let { homeUrl = '/', emergencyUrl, searchApi, destinations = [], current = 'home' } = $props();
  let searchOpen = $state(false);
  const currentLabel = $derived(destinations.find((d) => d.key === current)?.label ?? 'Home');
  function onKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); searchOpen = true; }
    else if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) {
      e.preventDefault(); searchOpen = true;
    }
  }
</script>

{#snippet glyph(key, size)}
  {@const ic = ICONS[key]}
  <svg viewBox={ic.vb} width={size} height={size} fill="none" stroke="currentColor"
       stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    {#each ic.d as p}<path d={p} />{/each}
  </svg>
{/snippet}

<svelte:window onkeydown={onKey} />

<header class="est-header">
  <div class="est-in">
    <a class="est-brand" href={homeUrl} aria-label="Home">
      <span class="est-mark" aria-hidden="true">H</span>
      <span class="est-brand-word">Home</span>
      <span class="est-brand-current" aria-hidden="true">{currentLabel}</span>
    </a>

    <span class="est-divider" aria-hidden="true"></span>

    <nav class="est-switch" aria-label="Sections">
      {#each destinations as d (d.key)}
        <a class="est-pill" class:on={d.key === current} href={d.href}
           aria-current={d.key === current ? 'page' : undefined}>{d.label}</a>
      {/each}
    </nav>

    <button class="est-search" type="button" aria-label="Search" onclick={() => (searchOpen = true)}>
      <span class="est-search-icon">{@render glyph('search', 15)}</span>
      <span class="est-search-label">Search everything</span>
    </button>

    <a class="est-em" href={emergencyUrl} aria-label="Emergency">
      <span class="est-em-icon">{@render glyph('warning', 16)}</span>
      <span class="est-em-label">Emergency</span>
      <span class="est-em-short" aria-hidden="true">SOS</span>
    </a>
  </div>
</header>

{#if searchOpen}
  <SearchOverlay {searchApi} onclose={() => (searchOpen = false)} />
{/if}

<style>
  /* ------------------------------------------------------------------ *
   * Phone (< 720px) is the base layer: a plain, non-sticky header row.
   * The desktop floating glass pill is the >= 720px override.
   * ------------------------------------------------------------------ */

  .est-header { position: static; }

  .est-in {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: max(52px, calc(env(safe-area-inset-top, 0px) + 12px)) 18px 22px;
  }

  .est-brand {
    display: flex;
    align-items: center;
    gap: 9px;
    color: var(--est-ink);
    text-decoration: none;
    min-width: 0;
  }
  .est-mark {
    width: 30px; height: 30px; border-radius: 10px; flex: none;
    background: var(--est-grad-brand);
    color: #ffffff;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 600;
    box-shadow: 0 4px 14px -2px rgba(110, 139, 255, 0.7);
  }
  .est-brand-word { display: none; font-size: 17px; font-weight: 600; letter-spacing: -0.02em; }
  .est-brand-current {
    font-size: 17px; font-weight: 600; letter-spacing: -0.02em; color: var(--est-ink);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .est-divider { display: none; width: 0.5px; height: 22px; flex: none;
    background: rgba(22, 22, 42, 0.13); margin: 0 4px; }

  .est-switch { display: none; align-items: center; gap: 2px; min-width: 0; }

  .est-search {
    margin-left: auto; flex: none;
    display: flex; align-items: center; justify-content: center;
    width: 38px; height: 38px; padding: 0;
    border-radius: 13px;
    font-family: var(--est-sans);
    color: var(--est-ink-soft);
    background: var(--est-control);
    border: 0.5px solid var(--est-bar-border);
    cursor: pointer;
    transition: background 200ms ease;
  }
  .est-search:hover { background: var(--est-paper-raised); }
  .est-search-icon { display: flex; }
  .est-search-label { display: none; }

  .est-em {
    display: inline-flex; align-items: center; gap: 7px; flex: none;
    font-family: var(--est-sans); font-size: 15px; font-weight: 500;
    color: #ffffff; background: var(--est-em-grad);
    border-radius: 13px; padding: 9px 15px; text-decoration: none;
    transition: filter 200ms ease;
  }
  .est-em:hover { filter: brightness(1.06); }
  .est-em-icon { display: flex; }
  .est-em-label { display: none; }
  .est-em-short { display: inline; }

  /* ------------------------------------------------------------------ *
   * Desktop (>= 720px): the floating glass pill.
   * ------------------------------------------------------------------ */

  @media (min-width: 720px) {
    .est-header {
      position: sticky;
      top: 16px;
      z-index: 30;
      display: flex;
      justify-content: center;
      padding: 0 var(--est-content-pad, 20px);
      margin-bottom: clamp(28px, 5vw, 52px);
    }

    .est-in {
      position: relative;
      width: 100%;
      max-width: var(--est-content-max, 1060px);
      margin: 0 auto;
      overflow: hidden;
      gap: 8px;
      padding: 9px 10px 9px 12px;
      border-radius: var(--est-radius);
      background: var(--est-bar);
      backdrop-filter: var(--est-bar-blur);
      -webkit-backdrop-filter: var(--est-bar-blur);
      border: 0.5px solid var(--est-bar-border);
      box-shadow: var(--est-bar-shadow);
    }

    .est-brand { gap: 10px; padding: 4px 12px 4px 4px; }
    .est-mark { width: 32px; height: 32px; border-radius: 11px; font-size: 15px; }
    .est-brand-word { display: block; }
    .est-brand-current { display: none; }

    .est-divider { display: block; }

    .est-switch { display: flex; }
    .est-pill {
      font-family: var(--est-sans); font-size: 15px; font-weight: 400;
      color: var(--est-mut); text-decoration: none;
      padding: 8px 15px; border-radius: 16px; white-space: nowrap;
      background: transparent;
      transition: background 220ms ease, color 220ms ease, box-shadow 220ms ease;
    }
    .est-pill:hover { background: var(--est-raise); color: var(--est-ink); }
    .est-pill.on {
      color: var(--est-ink);
      background: var(--est-active);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 0 20px -6px rgba(110, 139, 255, 0.5);
    }

    .est-search {
      width: auto; height: auto; min-width: 200px;
      justify-content: flex-start; gap: 9px;
      padding: 8px 16px; border-radius: 16px;
      font-size: 15px; font-weight: 400;
      color: var(--est-mut);
      background: var(--est-control);
      border: 0.5px solid var(--est-glass-border);
    }
    .est-search-label { display: inline; }

    .est-em {
      font-size: 15px; font-weight: 500;
      padding: 9px 17px; border-radius: 16px;
    }
    .est-em-icon { display: none; }
    .est-em-label { display: inline; }
    .est-em-short { display: none; }
  }

  /* Glass falls back to a near-solid fill when the reader has asked for less
     transparency. The package ships to other apps, so it carries its own
     fallback rather than relying on the host stylesheet. */
  @media (prefers-reduced-transparency: reduce) and (min-width: 720px) {
    .est-in {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .est-pill, .est-search, .est-em { transition-duration: 1ms; }
  }
</style>
