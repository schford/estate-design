<script>
  import SearchOverlay from './SearchOverlay.svelte';
  let { app, homeUrl, emergencyUrl, searchApi } = $props();
  let searchOpen = $state(false);
  const isHome = app === 'Home';
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
    <nav class="est-brand-group" aria-label="Estate">
      <a class="est-brand" href={homeUrl}><span class="est-mark">H</span><span class="est-brand-word">Home</span></a>
      {#if !isHome}
        <span class="est-brand-sep" aria-hidden="true">·</span>
        <a class="est-app" href="/">{app}</a>
      {/if}
    </nav>
    <button class="est-search" type="button" aria-label="Search" onclick={() => (searchOpen = true)}>
      <svg class="est-search-icon" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" stroke-width="1.5"/>
      </svg>
      <span class="est-search-label">Search</span>
    </button>
    <a class="est-em" href={emergencyUrl}>Emergency</a>
  </div>
</header>

{#if searchOpen}
  <SearchOverlay {searchApi} onclose={() => (searchOpen = false)} />
{/if}

<style>
  .est-header { position: sticky; top: 0; z-index: 10; background: var(--est-paper); }
  .est-in { max-width: 1060px; margin: 0 auto; padding: 12px 20px;
    display: flex; align-items: center; gap: 10px; }
  .est-brand-group { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .est-brand { display: flex; align-items: center; gap: 10px;
    color: var(--est-ink); text-decoration: none; }
  .est-mark { width: 38px; height: 38px; border-radius: 50%; background: var(--est-mb);
    color: var(--est-paper); display: flex; align-items: center; justify-content: center;
    font-size: 17px; font-weight: 600; flex: none; }
  .est-brand-word { font-size: 20px; font-weight: 600; letter-spacing: -0.01em; }
  .est-brand-sep { color: var(--est-faint); font-size: 20px; }
  .est-app { font-size: 20px; font-weight: 600; letter-spacing: -0.01em;
    color: var(--est-ink); text-decoration: none; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis; }
  .est-brand:hover .est-brand-word, .est-app:hover { color: var(--est-mb); }
  .est-search { margin-left: auto; display: flex; align-items: center; gap: 7px;
    font-family: var(--est-sans); font-size: 13px; font-weight: 500;
    color: var(--est-mb); background: var(--est-paper-raised);
    border: none; border-radius: var(--est-radius-pill); padding: 9px 18px;
    cursor: pointer; transition: filter 150ms ease-out; }
  .est-search:hover { filter: brightness(0.94); }
  .est-em { font-family: var(--est-sans); font-size: 13px; font-weight: 600;
    color: #ffffff; background: var(--est-seal); border-radius: var(--est-radius-pill);
    padding: 9px 18px; text-decoration: none; transition: filter 150ms ease-out; }
  .est-em:hover { filter: brightness(0.94); }
  @media (max-width: 640px) {
    .est-em { display: none; }
    .est-search-label { display: none; }
    .est-search { padding: 0; width: 44px; height: 44px; justify-content: center; }
    .est-brand-word { display: none; }
    .est-brand-sep { display: none; }
  }
</style>
