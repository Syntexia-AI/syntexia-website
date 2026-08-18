// sections.jsx — Syntexia.AI redesign sections
// All section components for the redesigned site.

const { useState, useEffect, useRef, useMemo } = React;

/* ───────────────── helpers ───────────────── */

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, as: As = 'div', className = '', style }) {
  const ref = useReveal();
  return (
    <As ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </As>
  );
}

/* ───────────────── BRAND MARK (animated lattice) ───────────────── */

// 5x5 grid. Filled positions form a stylised S.
//   ■ ■ ■ ■ ·
//   ■ · · · ·
//   ■ ■ ★ ■ ■   (centre is accent)
//   · · · · ■
//   ■ ■ ■ ■ ·
const BRAND_PATTERN = [
  1,1,1,1,0,
  1,0,0,0,0,
  1,1,2,1,1,
  0,0,0,0,1,
  1,1,1,1,0,
];
function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      {BRAND_PATTERN.map((v, i) => (
        <span key={i} className={`d ${v === 1 ? 'on' : v === 2 ? 'acc' : ''}`} />
      ))}
    </span>
  );
}

/* ───────────────── NAV ───────────────── */

function Nav({ onScrollTo }) {
  return (
    <nav className="nav">
      <div className="shell nav-inner">
        <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); onScrollTo('top'); }}>
          <BrandMark />
          <span className="brand-name">Syntexia<em>.AI</em></span>
        </a>
        <div className="nav-links">
          <button className="nav-link" onClick={() => onScrollTo('intelligence')}>Intelligence</button>
          <button className="nav-link" onClick={() => onScrollTo('industries')}>Industries</button>
          <a className="nav-link" href="/blog">Insights</a>
          <a className="nav-link" href="/about">About</a>
          <a className="nav-link" href="/team">Team</a>
          <a className="nav-cta" href="#contact" onClick={(e) => { e.preventDefault(); onScrollTo('contact'); }}>
            Get in touch
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ───────────────── HERO ───────────────── */

const HERO_VARIANTS = {
  editorial: {
    eyebrow: '/ Intelligence Layer',
    title: (
      <>
        Intelligence<br />
        that <span className="verb">lives</span> in your<br />
        ecosystem.
      </>
    ),
    sub: 'Not a chatbot. Not a co-pilot. A real intelligence layer that runs inside the systems your business already uses — quiet, embedded, always on.',
  },
  bold: {
    eyebrow: '/ Built for operations',
    title: (
      <>
        Real <span className="verb">Intelligence</span><br />
        runs your present.<br />
        Shows your future.
      </>
    ),
    sub: 'We embed intelligence into your phones, inbox, CRM, ERP and operations stack — so your team stops keying data and starts deciding.',
  },
  quiet: {
    eyebrow: '/ Intelligence company',
    title: (
      <>
        The intelligence<br />
        layer for <span className="verb">serious</span><br />
        operations.
      </>
    ),
    sub: 'Syntexia builds intelligence that lives inside your business — reading, routing, drafting, reconciling, anticipating. Live in real organizations, every day.',
  },
};

function Hero({ variant, showLog }) {
  const v = HERO_VARIANTS[variant] || HERO_VARIANTS.editorial;
  return (
    <section className="hero" id="top">
      <div className="shell">
        <Reveal>
          <div className="hero-eyebrow">
            <span className="badge">Live</span>
            <span className="text">{v.eyebrow}</span>
          </div>
        </Reveal>

        <Reveal>
          <h1 className="hero-title">
            {v.title}
            <span className="small">{v.sub}</span>
          </h1>
        </Reveal>

        {showLog && (
          <Reveal>
            <LiveLog />
          </Reveal>
        )}

        <Reveal>
          <div className="hero-cta-row">
            <a href="#contact" className="btn btn-primary">
              Get in touch <span className="arr" aria-hidden="true"></span>
            </a>
            <a href="#intelligence" className="btn btn-ghost">
              See how it works
            </a>
          </div>
        </Reveal>

        <Reveal>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <span className="label">Sectors live</span>
              <span className="value">Finance · Audit · <em>Public</em></span>
            </div>
            <div className="hero-meta-item">
              <span className="label">Embedded systems</span>
              <span className="value">CRM · ERP · <em>Comms</em></span>
            </div>
            <div className="hero-meta-item">
              <span className="label">Operating model</span>
              <span className="value"><em>Always-on</em> · invisible</span>
            </div>
            <div className="hero-meta-item">
              <span className="label">Partner network</span>
              <span className="value">Anthropic <em>Claude</em></span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────── LIVE LOG ───────────────── */

const LOG_SEED = [
  { tag: 'ROUTE',    msg: 'Citizen request #48921 → Planning Dept.',          ok: '0.3s' },
  { tag: 'DRAFT',    msg: 'Supplier invoice reply — €12,400 / PO-7733',       ok: 'ok'   },
  { tag: 'MATCH',    msg: 'GRN ↔ Invoice ↔ PO  (3-way, no variance)',         ok: 'ok'   },
  { tag: 'FORECAST', msg: 'Stock-out risk: SKU LX-204 — 9 days',              ok: 'flag' },
  { tag: 'CLASSIFY', msg: 'Email "rate review" → Mortgage / High priority',   ok: 'ok'   },
  { tag: 'CALL',     msg: 'Voicemail transcribed · summary delivered',        ok: '4.1s' },
  { tag: 'REPORT',   msg: 'Cash position pulled across 3 ledgers',            ok: 'ok'   },
  { tag: 'ESCALATE', msg: 'Discrepancy £842 → Finance lead',                  ok: 'flag' },
  { tag: 'RESOLVE',  msg: 'Customer query — refund processed end-to-end',     ok: 'ok'   },
  { tag: 'PREDICT',  msg: 'Repeat-buy signal: cohort Q1-26 · +14%',           ok: 'ok'   },
];

function pad2(n) { return n < 10 ? '0' + n : '' + n; }
function nowTs() {
  const d = new Date();
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

function LiveLog() {
  const [lines, setLines] = useState(() =>
    LOG_SEED.slice(0, 6).map((l, i) => ({ ...l, id: i, ts: nowTs() }))
  );
  const idRef = useRef(6);

  useEffect(() => {
    const t = setInterval(() => {
      const next = LOG_SEED[idRef.current % LOG_SEED.length];
      idRef.current += 1;
      setLines((prev) => {
        const copy = [...prev.slice(-7), { ...next, id: idRef.current, ts: nowTs() }];
        return copy;
      });
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="log-feed">
      <div className="log-feed-header">
        <span className="lhs"><span className="live-dot" /> Intelligence · live ops feed</span>
        <span className="rhs">/ inside customer environment · anonymized</span>
      </div>
      <div className="log-lines">
        {lines.map((l) => (
          <div key={l.id} className="line">
            <span className="ts">{l.ts}</span>
            <span className="tag">{l.tag}</span>
            <span className="msg">{l.msg}</span>
            <span className="ok">{l.ok === 'ok' ? '✓' : l.ok === 'flag' ? '⚑' : l.ok}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────── MARQUEE STRIP ───────────────── */

function Strip() {
  const items = [
    'Live in production',
    'UK · Headquartered London',
    'Anthropic Claude Partner Network',
    'Operations across Europe',
    'Real organisations · real ops',
    'Embedded, not bolted on',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="strip">
      <div className="strip-track">
        {doubled.map((t, i) => (
          <span key={i} className="strip-item">{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────── PILLARS ───────────────── */

const PILLARS = [
  {
    verb: 'Lives',
    label: <>It <em>lives</em> inside your systems</>,
    industry: 'Public Sector',
    title: <>Intelligence that <em>runs where</em> your business already runs.</>,
    body: 'Your Intelligence isn\'t a separate platform staff log into. It runs inside the systems you already use — phones, inbox, documents, CRM, accounting, operations stack. Quiet, embedded, always on.',
    metrics: [
      { n: '~70', u: '%',  l: 'Citizen requests triaged without manual handling' },
      { n: 'Days', u: '→ hrs', l: 'Response time reduction across council services' },
      { n: '0',    u: '',  l: 'New platforms for staff to learn' },
    ],
  },
  {
    verb: 'Communicates',
    label: <>It <em>communicates</em> with your teams</>,
    industry: 'Financial Services',
    title: <>It picks up the phone, drafts the report, <em>pulls the number.</em></>,
    body: 'Your Intelligence speaks the language of the people who run your business — answering internal questions, drafting reports, surfacing the numbers that matter, inside the tools the team already uses.',
    metrics: [
      { n: '60', u: '%',  l: 'Reduction in time answering internal data requests' },
      { n: '3',  u: '→ 1', l: 'Disconnected ledgers unified for finance teams' },
      { n: 'Now', u: '',  l: 'Decisions made on current data, not last week\'s' },
    ],
  },
  {
    verb: 'Acts',
    label: <>It <em>acts</em> alongside them</>,
    industry: 'Procurement',
    title: <>Not advice — <em>it does the work.</em> End to end.</>,
    body: 'Scheduling, processing, routing, drafting, reconciling, escalating. The repetitive operations that consume your team\'s time happen automatically, accurately, and continuously — escalating only what needs a human.',
    metrics: [
      { n: '~80', u: '%',  l: 'Routine procurement docs processed automatically' },
      { n: 'Days', u: '→ hrs', l: 'Approval cycle time across the supplier base' },
      { n: 'Pre', u: '-pay', l: 'Discrepancies caught before invoice settlement' },
    ],
  },
  {
    verb: 'Shows',
    label: <>It <em>shows</em> you what’s next</>,
    industry: 'Retail & Luxury',
    title: <>Foresight that <em>surfaces</em> what matters before it becomes urgent.</>,
    body: 'Your Intelligence doesn\'t only describe what already happened — it looks forward, at your data, patterns, risks and opportunities, and tells your team what to act on now to change the outcome.',
    metrics: [
      { n: '↑', u: '',  l: 'Repeat-purchase rates lifted across cohorts' },
      { n: '↓', u: '',  l: 'Stock-outs reduced on high-velocity SKUs' },
      { n: 'Act', u: '· not react', l: 'Teams acting ahead, not chasing the report' },
    ],
  },
];

function Pillars() {
  const [i, setI] = useState(0);
  const p = PILLARS[i];

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % PILLARS.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section" id="intelligence" data-screen-label="03 Intelligence">
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <div className="num">03 / Intelligence</div>
          </div>
          <div>
            <h2>
              Four things your <em>Intelligence</em> does, every day,<br />
              inside the systems you already run.
            </h2>
          </div>
        </Reveal>

        <div className="pillars">
          <div className="pillar-tabs">
            {PILLARS.map((pp, idx) => (
              <button
                key={idx}
                className={`pillar-tab ${idx === i ? 'active' : ''}`}
                onClick={() => setI(idx)}
              >
                <span className="pt-num">{`0${idx + 1}`}</span>
                <span className="pt-label">{pp.label}</span>
                <span className="pt-chev">→</span>
              </button>
            ))}
          </div>

          <div className="pillar-detail" key={i}>
            <div className="pd-fade">
              <div className="pd-eyebrow">
                <span>In practice</span>
                <span className="industry">{p.industry}</span>
              </div>
              <h3 style={{ marginTop: 24 }}>{p.title}</h3>
              <p className="pd-body" style={{ marginTop: 24 }}>{p.body}</p>
            </div>
            <div className="pillar-metrics pd-fade">
              {p.metrics.map((m, idx) => (
                <div className="pillar-metric" key={idx}>
                  <div className="pm-num">
                    <em>{m.n}</em>
                    {m.u && <span className="unit">{m.u}</span>}
                  </div>
                  <span className="pm-label">{m.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── INDUSTRIES ───────────────── */

const INDUSTRIES = [
  { num: '01', name: 'Financial Services',   desc: 'Cross-ledger answers, plain-language reports, decisions on current data.', kpi: 'Internal data requests', v: '−60%' },
  { num: '02', name: 'Audit & Assurance',    desc: 'Evidence-grade workpapers. Methodical at machine speed.',                  kpi: 'Workpaper prep',         v: 'Hours saved' },
  { num: '03', name: 'Public Sector',         desc: 'Triage citizen requests, route across departments, draft responses.',     kpi: 'Requests automated',     v: '~70%' },
  { num: '04', name: 'Retail & Luxury',       desc: 'Customer foresight, inventory risk, trends caught before the peak.',      kpi: 'Stock-out reduction',    v: 'Live' },
  { num: '05', name: 'Legal Services',  desc: "Contract analysis, due diligence at scale, and the knowledge bench \u2014 the firm's own expertise made queryable.",    kpi: 'Operational lift',       v: 'Live' },
];

function Industries() {
  return (
    <section className="section" id="industries" data-screen-label="04 Industries" style={{ paddingBottom: 0 }}>
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <div className="num">04 / Industries</div>
          </div>
          <div>
            <h2>Live in <em>real organisations</em>, processing real operations, every day.</h2>
            <p style={{ marginTop: 24 }}>
              Our intelligence runs inside organisations across regulated, operational
              and customer-facing industries — never as a side-tool, always as the layer
              the team works with.
            </p>
          </div>
        </Reveal>
      </div>
      <Reveal>
        <div className="industries">
          {INDUSTRIES.map((it, idx) => (
            <div className="industry-card" key={idx}>
              <div className="ic-num">{it.num}</div>
              <div className="ic-name">{it.name}</div>
              <div className="ic-desc">{it.desc}</div>
              <div className="ic-bullet">
                <span>{it.kpi}</span>
                <span className="v">{it.v}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────── INSIGHTS ───────────────── */

const POSTS = [
  {
    cat: 'Sector',
    date: 'May 2026',
    title: 'Precedent meets pace: AI is rewriting the economics of legal work.',
    desc: 'A profession built on precedent has no precedent for this. Where machine intelligence already moves the work — contracts, diligence, the knowledge bench.',
    label: 'Legal',
    display: 'Legal.',
    href: '/posts/precedent-meets-pace',
  },
  {
    cat: 'Field Note',
    date: 'Apr 2026',
    title: 'The quiet revolution coming to audit.',
    desc: 'How artificial intelligence is beginning to reshape one of the world\u2019s most methodical professions.',
    label: 'Audit',
    display: 'Audit.',
    href: '/posts/the-quiet-revolution-coming-to-audit',
  },
  {
    cat: 'Sector',
    date: 'Mar 2026',
    title: 'Hospitality intelligence, beyond the dashboard.',
    desc: 'How embedded intelligence unlocks signal across bookings, records and front-of-house operations.',
    label: 'Hospitality',
    display: 'Hospitality.',
    href: '/blog',
  },
];

function Insights() {
  return (
    <section className="section" id="insights" data-screen-label="05 Insights">
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <div className="num">05 / Insights</div>
          </div>
          <div>
            <h2>Latest <em>field notes</em> from the intelligence layer.</h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="insights">
            {POSTS.map((p, i) => (
              <a href={p.href || '/blog'} className="insight" key={i}>
                <div className="ph" data-label={p.label} data-display={p.display || p.cat}>
                  <span className="pattern" aria-hidden="true">
                    <span className="pd on"></span><span className="pd on"></span><span className="pd on"></span><span className="pd on"></span><span className="pd"></span>
                    <span className="pd on"></span><span className="pd"></span><span className="pd"></span><span className="pd"></span><span className="pd"></span>
                    <span className="pd on"></span><span className="pd on"></span><span className="pd acc"></span><span className="pd on"></span><span className="pd on"></span>
                    <span className="pd"></span><span className="pd"></span><span className="pd"></span><span className="pd"></span><span className="pd on"></span>
                    <span className="pd on"></span><span className="pd on"></span><span className="pd on"></span><span className="pd on"></span><span className="pd"></span>
                  </span>
                  <span className="accent-line"></span>
                </div>
                <div className="meta">
                  <span className="cat">{p.cat}</span>
                  <span>{p.date}</span>
                </div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────── ABOUT ───────────────── */

function About() {
  return (
    <section className="section" id="about" data-screen-label="06 About">
      <div className="shell">
        <Reveal className="section-head">
          <div>
            <div className="num">06 / About</div>
          </div>
          <div>
            <h2>An <em>intelligence</em> company — not an AI vendor.</h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="about">
            <div className="lhs">
              <h2>
                We build the intelligence <em>businesses run on.</em>
              </h2>
              <div className="about-stats">
                <div className="stat">
                  <div className="sn"><em>5</em></div>
                  <span className="sl">Industries live in production</span>
                </div>
                <div className="stat">
                  <div className="sn">UK</div>
                  <span className="sl">Headquartered · London</span>
                </div>
                <div className="stat">
                  <div className="sn">EU</div>
                  <span className="sl">Operations across Europe</span>
                </div>
              </div>
            </div>
            <div className="rhs">
              <p>
                Syntexia is an intelligence company. We help organisations put
                intelligence at the core of how they operate, decide, and grow —
                intelligence that lives in their business ecosystem, runs their
                present, and shows them the future.
              </p>
              <p>
                We work across financial and audit services, public sector,
                legal, retail and hospitality. Our products are live in real
                organisations, processing real operations, every day.
              </p>
              <p>
                We’re a proud member of the Anthropic Claude Partner Network,
                headquartered in the UK with operations across Europe.
              </p>
              <div className="signoff">
                — we build the intelligence businesses run on.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────── CTA ───────────────── */

function CTA() {
  return (
    <section className="cta" id="contact" data-screen-label="07 Contact">
      <div className="shell">
        <Reveal>
          <div className="cta-eyebrow"><span className="dot" style={{display:'inline-block',width:6,height:6,background:'var(--accent)',borderRadius:'50%',marginRight:10,verticalAlign:'middle',transform:'translateY(-1px)'}}/>Let’s put intelligence inside your business</div>
        </Reveal>
        <Reveal>
          <h2 className="cta-title">
            Run your present.<br />
            <em>See your future.</em>
          </h2>
        </Reveal>
        <Reveal>
          <div className="cta-contacts">
            <a className="cta-contact" href="mailto:office@syntexia.ai">
              <span className="lbl">Email</span>
              office@syntexia.ai
            </a>
            <a className="cta-contact" href="tel:+442046204570">
              <span className="lbl">Phone</span>
              +44 20 4620 4570
            </a>
            <a className="cta-contact" href="#">
              <span className="lbl">Location</span>
              London · Lisbon
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────── FOOTER ───────────────── */

function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="brand-block">
            <a href="#top" className="brand">
              <BrandMark />
              <span className="brand-name">Syntexia<em>.AI</em></span>
            </a>
            <p>
              The intelligence layer for serious operations — embedded in the
              systems your business already runs on.
            </p>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <ul>
              <li><a href="#intelligence">Intelligence</a></li>
              <li><a href="#industries">Industries</a></li>
              <li><a href="#">Approach</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/team">Team</a></li>
              <li><a href="/blog">Insights</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Connect</h5>
            <ul>
              <li><a href="mailto:office@syntexia.ai">office@syntexia.ai</a></li>
              <li><a href="tel:+442046204570">+44 20 4620 4570</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Syntexia.AI · London · Lisbon</span>
          <span className="anthropic"><span className="pip" /> Member · Anthropic Claude Partner Network</span>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────── exports ───────────────── */

Object.assign(window, {
  Nav, Hero, Strip, Pillars, Industries, Insights, About, CTA, Footer
});
