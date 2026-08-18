// Generate 4 SVG variants for Karim's WhatsApp profile picture.
// Each is 1024×1024, designed to live inside the inscribed circle.

const LATTICE_DOTS = (cx, cy, scale, accentColor, dotColor, faintColor) => {
  // 5×5 grid forming an S, scaled and positioned.
  // Original viewBox was 0..512 with dots at multiples of 88px.
  const positions = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const x = (80 + col * 88) - 256;
      const y = (80 + row * 88) - 256;
      // S pattern
      let v;
      if ((row === 0 && col < 4) ||
          (row === 1 && col === 0) ||
          (row === 2 && col !== 2) ||
          (row === 3 && col === 4) ||
          (row === 4 && col < 4)) {
        v = 1;
      } else if (row === 2 && col === 2) {
        v = 2;
      } else {
        v = 0;
      }
      positions.push({ x: cx + x * scale, y: cy + y * scale, v, r: 25 * scale });
    }
  }
  return positions.map(p => {
    const fill = p.v === 2 ? accentColor : p.v === 1 ? dotColor : faintColor;
    const op = p.v === 0 ? 0.32 : 1;
    return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.r.toFixed(1)}" fill="${fill}" opacity="${op}"/>`;
  }).join('\n  ');
};

const variants = {
  // ── 01: Editorial — italic KSV centred, small lattice above, syntexia.ai below
  '01-editorial': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="#0B0A08"/>
  <!-- subtle copper glow -->
  <defs>
    <radialGradient id="g" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#D9A56B" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#0B0A08" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#g)"/>

  <!-- Lattice mark, small, top -->
  ${LATTICE_DOTS(512, 280, 0.32, '#D9A56B', '#F4F0E6', '#837C6F')}

  <!-- KSV — italic serif -->
  <text x="512" y="640" text-anchor="middle" fill="#F4F0E6"
        font-family="'Instrument Serif', Georgia, 'Times New Roman', serif"
        font-style="italic" font-weight="400" font-size="280" letter-spacing="-6">KSV</text>

  <!-- Bottom wordmark microcopy -->
  <text x="512" y="800" text-anchor="middle" fill="#837C6F"
        font-family="ui-monospace, 'JetBrains Mono', monospace"
        font-size="32" letter-spacing="6">SYNTEXIA.AI</text>
</svg>`,

  // ── 02: Bold mark dominant — lattice large, KSV monogram below
  '02-mark-first': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="#0B0A08"/>

  <!-- Lattice mark, large, upper area -->
  ${LATTICE_DOTS(512, 420, 0.78, '#D9A56B', '#F4F0E6', '#837C6F')}

  <!-- KSV — smaller sans, below the mark -->
  <text x="512" y="850" text-anchor="middle" fill="#F4F0E6"
        font-family="ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif"
        font-weight="500" font-size="120" letter-spacing="14">KSV</text>
</svg>`,

  // ── 03: Monogram badge — KSV inside a copper accent ring, lattice integrated as pattern
  '03-badge': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="#0B0A08"/>

  <!-- Outer accent ring -->
  <circle cx="512" cy="512" r="380" fill="none" stroke="#D9A56B" stroke-width="3" opacity="0.6"/>
  <circle cx="512" cy="512" r="360" fill="none" stroke="#2A2622" stroke-width="1"/>

  <!-- KSV — very large italic, centred -->
  <text x="512" y="600" text-anchor="middle" fill="#F4F0E6"
        font-family="'Instrument Serif', Georgia, 'Times New Roman', serif"
        font-style="italic" font-weight="400" font-size="380" letter-spacing="-12">
    K<tspan fill="#D9A56B">S</tspan>V
  </text>

  <!-- Top arc microcopy -->
  <text x="512" y="200" text-anchor="middle" fill="#837C6F"
        font-family="ui-monospace, 'JetBrains Mono', monospace"
        font-size="28" letter-spacing="6">SYNTEXIA.AI</text>

  <!-- Bottom small mark — 3 dots representing the lattice essence -->
  <circle cx="488" cy="820" r="6" fill="#837C6F" opacity="0.5"/>
  <circle cx="512" cy="820" r="6" fill="#D9A56B"/>
  <circle cx="536" cy="820" r="6" fill="#837C6F" opacity="0.5"/>
</svg>`,

  // ── 04: Split — lattice on the left, KSV initials stacked on the right
  '04-split': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="#0B0A08"/>

  <!-- Faint copper glow centred -->
  <defs>
    <radialGradient id="g4" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#D9A56B" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#0B0A08" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#g4)"/>

  <!-- Lattice on the left side, medium -->
  ${LATTICE_DOTS(360, 512, 0.52, '#D9A56B', '#F4F0E6', '#837C6F')}

  <!-- Vertical divider -->
  <line x1="600" y1="380" x2="600" y2="644" stroke="#2A2622" stroke-width="2"/>

  <!-- KSV — stacked vertical, italic serif -->
  <text x="720" y="475" text-anchor="middle" fill="#F4F0E6"
        font-family="'Instrument Serif', Georgia, 'Times New Roman', serif"
        font-style="italic" font-weight="400" font-size="150" letter-spacing="-4">K</text>
  <text x="720" y="585" text-anchor="middle" fill="#D9A56B"
        font-family="'Instrument Serif', Georgia, 'Times New Roman', serif"
        font-style="italic" font-weight="400" font-size="150" letter-spacing="-4">S</text>
  <text x="720" y="695" text-anchor="middle" fill="#F4F0E6"
        font-family="'Instrument Serif', Georgia, 'Times New Roman', serif"
        font-style="italic" font-weight="400" font-size="150" letter-spacing="-4">V</text>
</svg>`,
};

for (const [name, svg] of Object.entries(variants)) {
  await saveFile(`avatars/karim-${name}.svg`, svg);
  log(`Saved avatars/karim-${name}.svg`);
}

// Also render PNGs at 1024 for upload
for (const name of Object.keys(variants)) {
  const img = await readImage(`avatars/karim-${name}.svg`);
  const canvas = createCanvas(1024, 1024);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, 1024, 1024);
  await saveFile(`avatars/karim-${name}.png`, canvas);
  log(`Rendered avatars/karim-${name}.png`);
}
log('Done.');
