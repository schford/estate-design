<script>
  import SearchOverlay from './SearchOverlay.svelte';
  let { app, homeUrl, emergencyUrl, searchApi } = $props();
  let searchOpen = $state(false);
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
    <a class="est-brand" href={homeUrl}><span class="est-mark">◆</span> {app}</a>
    <button class="est-search" type="button" aria-label="Search" onclick={() => (searchOpen = true)}>
      <span class="est-search-label">Search</span>
      <svg class="est-search-icon" viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
        <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    </button>
    <a class="est-em" href={emergencyUrl}>Emergency</a>
  </div>
</header>

{#if searchOpen}
  <SearchOverlay {searchApi} onclose={() => (searchOpen = false)} />
{/if}

<style>
  .est-header { position: sticky; top: 0; z-index: 10; background: var(--est-paper);
    border-bottom: 1px solid var(--est-rule); }
  .est-in { max-width: 1060px; margin: 0 auto; padding: 10px 20px;
    display: flex; align-items: center; gap: 16px; }
  .est-brand { font-family: var(--est-serif); font-size: 1.05rem;
    color: var(--est-ink); text-decoration: none; }
  .est-mark { color: var(--est-ink-soft); }
  .est-search { margin-left: auto; display: flex; align-items: center; gap: 6px;
    font-family: var(--est-caps); font-size: 0.68rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--est-mut); background: none;
    border: 1px solid var(--est-rule); border-radius: 3px; padding: 5px 10px;
    cursor: pointer; }
  .est-search:hover { background: var(--est-raise); }
  .est-search-icon { display: none; }
  .est-em { font-family: var(--est-caps); font-size: 0.68rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--est-seal); text-decoration: none; }
  @media (max-width: 640px) {
    .est-em { display: none; }
    .est-search-label { display: none; }
    .est-search-icon { display: block; }
    .est-search { border: none; padding: 5px; }
  }
</style>
