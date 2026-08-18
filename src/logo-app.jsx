// logo-app.jsx — Syntexia logo exploration

/* ────────────────── Mark components ────────────────── */

function MarkX({ mini })       { return <span className={`mk-x${mini ? ' mini' : ''}`} aria-hidden="true" />; }
function MarkLayer({ mini })   { return <span className={`mk-layer${mini ? ' mini' : ''}`} aria-hidden="true"><span className="inner" /></span>; }
function MarkSerif({ mini })   { return <span className={`mk-serif${mini ? ' mini' : ''}`} aria-hidden="true"><span>S</span></span>; }
function MarkBrk({ mini })     {
  return (
    <span className={`mk-brk${mini ? ' mini' : ''}`} aria-hidden="true">
      <span className="b">[</span><span className="s">s</span><span className="b">]</span>
    </span>
  );
}

// 5x5 grid forming a stylised "S" of dots. Filled positions:
//   ■ ■ ■ ■ ·
//   ■ · · · ·
//   ■ ■ ■ ■ ·     (middle row uses accent)
//   · · · · ■
//   ■ ■ ■ ■ ·     (mirror bottom)
const PIX_S = [
  1,1,1,1,0,
  1,0,0,0,0,
  2,2,2,2,2,   // 2 = accent
  0,0,0,0,1,
  1,1,1,1,0,
];
function MarkPix({ mini }) {
  return (
    <span className={`mk-pix${mini ? ' mini' : ''}`} aria-hidden="true">
      {PIX_S.map((v, i) => (
        <span key={i} className={`d ${v === 1 ? 'on' : v === 2 ? 'acc' : ''}`} />
      ))}
    </span>
  );
}

function MarkStack({ mini }) {
  return (
    <span className={`mk-stack${mini ? ' mini' : ''}`} aria-hidden="true">
      <span className="bar b1" />
      <span className="bar b2" />
      <span className="bar b3" />
      <span className="bar b4" />
    </span>
  );
}

/* ────────────────── Logo board (one per artboard) ────────────────── */

const META = [
  { id: 'x',     n: '01', Mark: MarkX,     name: 'Synthesis',  blurb: 'Two systems crossing. Intelligence at the intersection.' },
  { id: 'layer', n: '02', Mark: MarkLayer, name: 'Embedded',   blurb: 'A second shape, set inside the first. Intelligence that lives inside.' },
  { id: 'serif', n: '03', Mark: MarkSerif, name: 'Monogram',   blurb: 'Editorial italic S — premium, intelligent, quietly serious.' },
  { id: 'brk',   n: '04', Mark: MarkBrk,   name: 'Brackets',   blurb: 'Code-shaped. Syntexia as the layer between the systems.' },
  { id: 'pix',   n: '05', Mark: MarkPix,   name: 'Lattice',    blurb: 'Emergent S in a dot grid. Patterned, technical, machine-readable.' },
  { id: 'stack', n: '06', Mark: MarkStack, name: 'Stack',      blurb: 'Bars of varying weight. Intelligence stacked across the operations.' },
];

function LogoBoard({ meta, mode = 'dark' }) {
  const Mark = meta.Mark;
  return (
    <div className={`lb-board ${mode}`}>
      <div className="lb-header">
        <span className="num">{meta.n} / Mark</span>
        <span>Syntexia.AI</span>
      </div>

      <div className="lb-mark-wrap">
        <Mark />
      </div>

      <div className="lb-footer">
        <div className="lockup">
          <Mark mini />
          <span className="wm">Syntexia<em>.AI</em></span>
        </div>
        <div className="name">
          {meta.name}
          <span className="small">{meta.blurb}</span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────── Context artboards (applied) ────────────────── */

function CtxBoard({ Mark }) {
  return (
    <div className="ctx-board" style={{ '--bg-alt': '#161311' }}>

      {/* Favicon / app icon */}
      <div className="ctx-cell">
        <div className="ctx-label">App icon · 64</div>
        <div className="ctx-content">
          <div className="ctx-favicon" style={{ background: 'var(--ink)' }}>
            <Mark />
          </div>
        </div>
      </div>

      {/* Navigation header */}
      <div className="ctx-cell alt">
        <div className="ctx-label">Navigation bar</div>
        <div className="ctx-content" style={{ display:'flex', alignItems:'center', gap: 12, paddingTop: 12 }}>
          <Mark mini />
          <span style={{ fontFamily:'Geist', fontWeight:500, letterSpacing:'-0.01em', fontSize:16, color:'var(--ink)' }}>
            Syntexia<span style={{ color:'var(--mute)'}}>.AI</span>
          </span>
          <span style={{ flex:1 }} />
          <span style={{ fontFamily:'JetBrains Mono', fontSize:10, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--mute)' }}>Intelligence · Industries · About</span>
        </div>
      </div>

      {/* Business card */}
      <div className="ctx-cell">
        <div className="ctx-label">Business card · dark</div>
        <div className="ctx-content" style={{ display:'flex', justifyContent:'center', alignItems:'center', flex:1 }}>
          <div className="ctx-card">
            <div className="top">
              <Mark mini />
              <span className="nm">Syntexia<em>.AI</em></span>
            </div>
            <div className="person">
              <div className="nm2">Alex Mendez</div>
              <div className="role">Intelligence Lead · London</div>
            </div>
          </div>
        </div>
      </div>

      {/* Email signature */}
      <div className="ctx-cell alt">
        <div className="ctx-label">Email signature</div>
        <div className="ctx-content" style={{ marginTop: 16 }}>
          <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
            <Mark mini />
            <div style={{ fontFamily:'Geist', fontSize:13, lineHeight:1.5, color:'var(--ink)' }}>
              <div style={{ fontWeight:500 }}>Alex Mendez</div>
              <div style={{ color:'var(--mute)', fontSize:12 }}>Intelligence Lead, Syntexia.AI</div>
              <div style={{ marginTop:8, fontFamily:'JetBrains Mono', fontSize:10.5, letterSpacing:'.08em', color:'var(--mute)' }}>
                office@syntexia.ai · +44 20 4620 4570
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────── App ────────────────── */

function App() {
  return (
    <DesignCanvas>
      <DCSection
        id="marks"
        title="Logo directions"
        subtitle="Six marks for Syntexia.AI · each presented with the wordmark lockup beneath. Click any artboard to focus."
      >
        {META.map((m) => (
          <DCArtboard
            key={m.id}
            id={`mark-${m.id}`}
            label={`${m.n} · ${m.name}`}
            width={480}
            height={480}
          >
            <LogoBoard meta={m} mode="dark" />
          </DCArtboard>
        ))}
      </DCSection>

      <DCSection
        id="marks-light"
        title="On light surface"
        subtitle="Same six marks against the warm-paper light palette."
      >
        {META.map((m) => (
          <DCArtboard
            key={m.id}
            id={`light-${m.id}`}
            label={`${m.n} · ${m.name}`}
            width={480}
            height={480}
          >
            <LogoBoard meta={m} mode="light" />
          </DCArtboard>
        ))}
      </DCSection>

      <DCSection
        id="context"
        title="In context"
        subtitle="The strongest three directions applied across real surfaces — app icon, nav, business card, email signature."
      >
        <DCArtboard id="ctx-x"     label="Synthesis — in use" width={720} height={520}>
          <CtxBoard Mark={MarkX} />
        </DCArtboard>
        <DCArtboard id="ctx-serif" label="Monogram — in use" width={720} height={520}>
          <CtxBoard Mark={MarkSerif} />
        </DCArtboard>
        <DCArtboard id="ctx-brk"   label="Brackets — in use" width={720} height={520}>
          <CtxBoard Mark={MarkBrk} />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
