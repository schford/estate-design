<script>
  let { src } = $props();
  let chip = $state(null);
  $effect(() => {
    fetch(src)
      .then((r) => (r.status === 200 ? r.json() : null))
      .then((d) => (chip = d))
      .catch(() => (chip = null));
  });
</script>

{#if chip}
  <span class="est-chip"><span class="est-chip-label">{chip.label}</span>{chip.value}</span>
{/if}

<style>
  /* Label and value read as one quiet line: sentence case, no tracking. The
     v0.4 brass micro-caps are retired — --est-brass survives as a token name
     only, and no longer means brass. */
  .est-chip { font-family: var(--est-sans); font-size: 13.5px; color: var(--est-ink); }
  .est-chip-label { font-size: 13.5px; color: var(--est-mut); margin-right: 6px; }
</style>
