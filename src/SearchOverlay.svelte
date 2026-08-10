<script>
  let { searchApi, onclose } = $props();
  let q = $state('');
  let results = $state([]);
  let input = $state();
  let timer;
  $effect(() => { input?.focus(); });
  function onInput() {
    clearTimeout(timer);
    const query = q;
    timer = setTimeout(async () => {
      if (!query.trim()) { results = []; return; }
      try {
        const r = await fetch(`${searchApi}?q=${encodeURIComponent(query)}`);
        results = r.ok ? await r.json() : [];
      } catch { results = []; }
    }, 150);
  }
  function onKey(e) { if (e.key === 'Escape') onclose(); }
</script>

<svelte:window onkeydown={onKey} />

<div class="est-veil" onclick={onclose} role="presentation">
  <div class="est-panel" onclick={(e) => e.stopPropagation()} role="dialog" aria-label="Search">
    <input bind:this={input} bind:value={q} oninput={onInput}
           placeholder="Search everything…" />
    <ul>
      {#each results as r}
        <li><a href={r.url}>{r.title}</a><span class="est-badge">{r.badge}</span></li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .est-veil {
    position: fixed; inset: 0; z-index: 100;
    background: rgba(40, 34, 82, 0.25);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 12vh 16px 0;
  }
  .est-panel {
    max-width: 560px; margin: 0 auto; overflow: hidden;
    border-radius: var(--est-radius);
    background: var(--est-glass);
    backdrop-filter: var(--est-glass-blur);
    -webkit-backdrop-filter: var(--est-glass-blur);
    border: 0.5px solid var(--est-glass-border);
    box-shadow: var(--est-glass-shadow);
  }
  .est-panel input {
    width: 100%; box-sizing: border-box;
    font: 17px var(--est-sans); color: var(--est-ink); background: transparent;
    padding: 15px 18px; border: 0;
    border-bottom: 0.5px solid rgba(22, 22, 42, 0.10);
    outline: none;
  }
  .est-panel input::placeholder { color: var(--est-mut); }
  .est-panel ul { list-style: none; margin: 0; padding: 6px 0;
    max-height: 50vh; overflow-y: auto; }
  .est-panel li { display: flex; align-items: baseline; gap: 12px;
    padding: 10px 18px; transition: background 200ms ease; }
  .est-panel li:hover { background: rgba(70, 60, 160, 0.06); }
  .est-panel li a { font-size: 15px; color: var(--est-ink); text-decoration: none; }
  .est-panel li a:hover { text-decoration: underline; }
  /* Result badge: sentence case, no tracking — the v0.4 uppercase-letterspaced
     micro-caps are gone estate-wide. */
  .est-badge { margin-left: auto; font-family: var(--est-sans);
    font-size: 13px; color: var(--est-mut); white-space: nowrap; }

  @media (prefers-reduced-transparency: reduce) {
    .est-veil { background: rgba(40, 34, 82, 0.55); backdrop-filter: none; -webkit-backdrop-filter: none; }
    .est-panel { background: rgba(255, 255, 255, 0.92); backdrop-filter: none; -webkit-backdrop-filter: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .est-panel li { transition-duration: 1ms; }
  }
</style>
