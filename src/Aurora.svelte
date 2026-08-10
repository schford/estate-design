<script>
  // Aurora — the estate's ambient background stack, v0.5.0 "Nebula".
  //
  // Three slowly drifting blue/violet/cyan radial gradients under a flattening
  // veil. Purely decorative: fixed to the viewport, non-interactive, hidden from
  // assistive tech, no props.
  //
  // MOUNTING: render it as the FIRST child of the page root. It is a positioned
  // element, so page content must itself be positioned (`position: relative`,
  // or any z-index above 0) or it will paint underneath the veil — the same
  // constraint the design prototype has. The stack is `position: fixed` rather
  // than absolute so it does not scroll with the page and stays off the
  // scrolling layer; the three animated layers carry `will-change: transform`
  // for the same reason.
  //
  // The durations (26s / 34s / 42s) are deliberately near-coprime so the
  // composite never visibly loops.
</script>

<div class="est-aurora" aria-hidden="true">
  <div class="est-aurora-wrap">
    <div class="est-aurora-a"></div>
    <div class="est-aurora-b"></div>
    <div class="est-aurora-c"></div>
  </div>
  <div class="est-aurora-veil"></div>
</div>

<style>
  .est-aurora {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: clip;
  }

  .est-aurora-wrap {
    position: absolute;
    inset: -20%;
    pointer-events: none;
    filter: blur(10px);
  }

  .est-aurora-a,
  .est-aurora-b,
  .est-aurora-c {
    position: absolute;
    inset: 0;
    will-change: transform;
  }

  .est-aurora-a {
    background-image: radial-gradient(620px 520px at 18% 14%, rgba(96, 124, 255, 0.4), transparent 64%);
    animation: auroraA 26s ease-in-out infinite;
  }
  .est-aurora-b {
    background-image: radial-gradient(680px 540px at 82% 8%, rgba(168, 124, 255, 0.36), transparent 62%);
    animation: auroraB 34s ease-in-out infinite;
  }
  .est-aurora-c {
    background-image: radial-gradient(900px 620px at 52% 96%, rgba(64, 196, 255, 0.26), transparent 66%);
    animation: auroraC 42s ease-in-out infinite;
  }

  .est-aurora-veil {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(247, 246, 253, 0.3) 0%,
      rgba(247, 246, 253, 0.58) 48%,
      rgba(247, 246, 253, 0.8) 100%
    );
  }

  @keyframes auroraA {
    0%, 100% { transform: translate3d(-6%, -4%, 0) scale(1); }
    50% { transform: translate3d(8%, 6%, 0) scale(1.18); }
  }
  @keyframes auroraB {
    0%, 100% { transform: translate3d(6%, 5%, 0) scale(1.1); }
    50% { transform: translate3d(-7%, -6%, 0) scale(0.94); }
  }
  @keyframes auroraC {
    0%, 100% { transform: translate3d(0, 4%, 0) scale(1.04); }
    50% { transform: translate3d(-5%, -8%, 0) scale(1.22); }
  }

  /* Reduced motion: the aurora stays — it is the canvas, not an ornament — but
     freezes at frame 0. Removing it entirely would leave a different design. */
  @media (prefers-reduced-motion: reduce) {
    .est-aurora-a { animation: none; transform: translate3d(-6%, -4%, 0) scale(1); }
    .est-aurora-b { animation: none; transform: translate3d(6%, 5%, 0) scale(1.1); }
    .est-aurora-c { animation: none; transform: translate3d(0, 4%, 0) scale(1.04); }
  }
</style>
