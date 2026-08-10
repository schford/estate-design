// estate-design icon set — v0.5.0 "Nebula".
//
// One central monoline set for the whole constellation. Every icon is drawn on a
// 24×24 grid and is rendered by the consumer as:
//
//   <svg viewBox={ic.vb} width={n} height={n} fill="none" stroke="currentColor"
//        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
//        aria-hidden="true">
//     {#each ic.d as p}<path d={p} />{/each}
//   </svg>
//
// Colour comes from `currentColor`, so an icon inherits the tint of whatever
// chip or pill it sits in. Stroke weight lives with the consumer (1.7 at UI
// sizes) rather than in the data, so a decorative oversize glyph can drop to a
// hairline without a second copy of the path.
//
// home / cookbook / reading / dining / guides are the paths that shipped in
// v0.4 BottomTabs, lifted here unchanged (the reading spine was a <line>; it is
// the same geometry expressed as a path). The rest were drawn to match their
// optical weight. The design mock's hand-drawn 20×20 paths are deliberately NOT
// ported — they exist only to avoid a dependency in the prototype.

export const ICONS = {
  home: {
    vb: '0 0 24 24',
    d: ['M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z']
  },
  cookbook: {
    vb: '0 0 24 24',
    d: ['M5 10h14v4a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z', 'M4 10h16M9 10V7m6 3V7']
  },
  reading: {
    vb: '0 0 24 24',
    d: [
      'M12 6c-2-1.3-4.5-1.3-7-1v12c2.5-.3 5-.3 7 1 2-1.3 4.5-1.3 7-1V5c-2.5-.3-5-.3-7 1z',
      'M12 6v12'
    ]
  },
  dining: {
    vb: '0 0 24 24',
    d: ['M7 3v7m0 0a2 2 0 0 0 2-2V3M7 10v11M17 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9']
  },
  guides: {
    vb: '0 0 24 24',
    d: ['M6 4h9l3 3v13H6z', 'M9 9h6M9 13h6M9 17h4']
  },
  // gear — hub plus eight spokes, the SF `gearshape` silhouette simplified to
  // monoline so it holds together at 19px and at the 132px decorative size.
  systems: {
    vb: '0 0 24 24',
    d: [
      'M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Z',
      'M12 2.4v3.2M12 18.4v3.2M2.4 12h3.2M18.4 12h3.2',
      'M5.2 5.2 7.5 7.5M18.8 5.2 16.5 7.5M5.2 18.8 7.5 16.5M18.8 18.8 16.5 16.5'
    ]
  },
  // credit-card
  finances: {
    vb: '0 0 24 24',
    d: [
      'M5 5.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z',
      'M3 9.5h18',
      'M6.5 14.5h3'
    ]
  },
  // airplane, nose up
  travel: {
    vb: '0 0 24 24',
    d: [
      'M12 2.2c.9 0 1.6 1.1 1.6 2.5v3.6l7.2 4.3v2.1l-7.2-2.2v3.9l2.4 1.8v1.6L12 18.9l-4 .9v-1.6l2.4-1.8v-3.9L3.2 14.7v-2.1l7.2-4.3V4.7c0-1.4.7-2.5 1.6-2.5Z'
    ]
  },
  // lightbulb
  knowledge: {
    vb: '0 0 24 24',
    d: [
      'M12 2.6a6 6 0 0 0-3.4 10.9c.7.5 1.1 1.3 1.1 2.1v.4h4.6v-.4c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 2.6Z',
      'M9.7 18.6h4.6',
      'M10.6 21.2h2.8'
    ]
  },
  search: {
    vb: '0 0 24 24',
    d: ['M11 4.2a6.8 6.8 0 1 0 0 13.6 6.8 6.8 0 0 0 0-13.6Z', 'M15.9 15.9 20.4 20.4']
  },
  // warning triangle — the Emergency affordance. The dot is a zero-length
  // segment: a round linecap renders it as a disc.
  warning: {
    vb: '0 0 24 24',
    d: ['M12 3.6 21.2 19.6H2.8Z', 'M12 9.6v4', 'M12 16.4v.01']
  },
  chevron: {
    vb: '0 0 24 24',
    d: ['M9.5 5.5 16 12l-6.5 6.5']
  }
};

export default ICONS;
