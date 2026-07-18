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
  .est-veil { position: fixed; inset: 0; z-index: 100;
    background: rgba(51, 56, 43, 0.35); padding: 12vh 16px 0; }
  .est-panel { max-width: 560px; margin: 0 auto; background: var(--est-paper-raised);
    border-radius: var(--est-radius); overflow: hidden;
    box-shadow: 0 10px 30px rgba(51, 56, 43, 0.18); }
  .est-panel input { width: 100%; box-sizing: border-box;
    font: 1rem var(--est-sans); color: var(--est-ink); background: transparent;
    padding: 12px 14px; border: 0; border-bottom: 1px solid var(--est-rule);
    outline: none; }
  .est-panel ul { list-style: none; margin: 0; padding: 4px 0;
    max-height: 50vh; overflow-y: auto; }
  .est-panel li { display: flex; align-items: baseline; gap: 10px;
    padding: 8px 14px; }
  .est-panel li a { color: var(--est-ink); text-decoration: none; }
  .est-panel li a:hover { text-decoration: underline; }
  .est-badge { margin-left: auto; font-family: var(--est-caps);
    font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--est-faint); }
</style>
