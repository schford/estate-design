<script>
  import SearchOverlay from './SearchOverlay.svelte';
  // homeUrl: circle-H target. destinations: the five-destination switcher config
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

<svelte:window onkeydown={onKey} />

<header class="est-header">
  <div class="est-in">
    <a class="est-brand" href={homeUrl} aria-label="Home">
      <span class="est-mark">H</span>
      <span class="est-brand-word">Home</span>
      <span class="est-brand-current" aria-hidden="true">{currentLabel}</span>
    </a>

    <nav class="est-switch" aria-label="Sections">
      {#each destinations as d (d.key)}
        <a class="est-pill" class:on={d.key === current} href={d.href}
           aria-current={d.key === current ? 'page' : undefined}>{d.label}</a>
      {/each}
    </nav>

    <button class="est-search" type="button" aria-label="Search" onclick={() => (searchOpen = true)}>
      <svg class="est-search-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" stroke-width="1.5"/>
      </svg>
      <span class="est-search-label">Search</span>
    </button>

    <a class="est-em" href={emergencyUrl} aria-label="Emergency">
      <svg class="est-em-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M12 3l9 16H3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <line x1="12" y1="10" x2="12" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="12" cy="17.2" r="1.1" fill="currentColor"/>
      </svg>
      <span class="est-em-label">Emergency</span>
    </a>
  </div>
</header>

{#if searchOpen}
  <SearchOverlay {searchApi} onclose={() => (searchOpen = false)} />
{/if}

<style>
  .est-header { position: sticky; top: 0; z-index: 10; background: var(--est-header-bg, var(--est-paper)); }
  .est-in { max-width: var(--est-content-max, 1060px); margin: 0 auto; padding: 12px var(--est-content-pad, 20px);
    display: flex; align-items: center; gap: 10px; }
  .est-brand { display: flex; align-items: center; gap: 10px; color: var(--est-ink); text-decoration: none; min-width: 0; }
  .est-mark { width: 38px; height: 38px; border-radius: 50%; background: var(--est-mb);
    color: var(--est-paper); display: flex; align-items: center; justify-content: center;
    font-size: 17px; font-weight: 600; flex: none; }
  .est-brand-word { font-size: 20px; font-weight: 600; letter-spacing: -0.01em; }
  .est-brand-current { font-size: 18px; font-weight: 600; color: var(--est-ink);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: none; }
  .est-brand:hover .est-brand-word { color: var(--est-mb); }

  /* desktop switcher pills — current one filled */
  .est-switch { display: flex; align-items: center; gap: 4px; margin-left: 8px; min-width: 0; }
  .est-pill { font-family: var(--est-sans); font-size: 14px; font-weight: 500;
    color: var(--est-ink-soft); text-decoration: none; padding: 7px 14px;
    border-radius: var(--est-radius-pill); white-space: nowrap;
    transition: background 150ms ease-out, color 150ms ease-out; }
  .est-pill:hover { background: var(--est-raise); color: var(--est-ink); }
  .est-pill.on { background: var(--est-ink); color: var(--est-paper); }

  .est-search { margin-left: auto; display: flex; align-items: center; gap: 7px;
    font-family: var(--est-sans); font-size: 13px; font-weight: 500;
    color: var(--est-mb); background: var(--est-paper-raised);
    border: none; border-radius: var(--est-radius-pill); padding: 9px 18px;
    cursor: pointer; transition: filter 150ms ease-out; }
  .est-search:hover { filter: brightness(0.94); }

  .est-em { display: inline-flex; align-items: center; gap: 7px; font-family: var(--est-sans);
    font-size: 13px; font-weight: 600; color: #ffffff; background: var(--est-seal);
    border-radius: var(--est-radius-pill); padding: 9px 18px; text-decoration: none;
    transition: filter 150ms ease-out; }
  .est-em:hover { filter: brightness(0.94); }
  .est-em-icon { display: none; }

  /* phone: H + current-module label, search icon, Emergency icon (all visible) */
  @media (max-width: 900px) {
    .est-brand-word { display: none; }
    .est-brand-current { display: block; }
    .est-switch { display: none; }
    .est-search-label { display: none; }
    .est-search { padding: 0; width: 44px; height: 44px; justify-content: center; }
    .est-em-label { display: none; }
    .est-em-icon { display: block; }
    .est-em { padding: 0; width: 44px; height: 44px; justify-content: center; border-radius: 50%; }
  }
</style>
