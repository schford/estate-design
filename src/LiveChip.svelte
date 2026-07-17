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
  .est-chip { font-size: 0.85rem; color: var(--est-ink-soft); }
  .est-chip-label { font-family: var(--est-caps); font-size: 0.58rem;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--est-brass);
    margin-right: 6px; }
</style>
