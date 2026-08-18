// app.jsx — Syntexia.AI redesign top-level app.

const { useEffect, useState, useCallback } = React;

function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.palette = t.palette;
    html.dataset.mode = t.mode;
    html.dataset.density = t.density;
  }, [t.palette, t.mode, t.density]);

  const scrollTo = useCallback((id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <Nav onScrollTo={scrollTo} />
      <Hero variant={t.hero} showLog={t.showLog} />
      <Strip />
      <Pillars />
      <Industries />
      <Insights />
      <About />
      <CTA />
      <Footer />

      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakRadio
          label="Theme"
          value={t.palette}
          options={['copper', 'steel', 'mono']}
          onChange={(v) => setTweak('palette', v)}
        />
        <TweakRadio
          label="Mode"
          value={t.mode}
          options={['dark', 'light']}
          onChange={(v) => setTweak('mode', v)}
        />

        <TweakSection label="Hero" />
        <TweakSelect
          label="Variant"
          value={t.hero}
          options={['editorial', 'bold', 'quiet']}
          onChange={(v) => setTweak('hero', v)}
        />
        <TweakToggle
          label="Live ops log"
          value={t.showLog}
          onChange={(v) => setTweak('showLog', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
