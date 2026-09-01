// Calcul des ratios WCAG 2.1 pour chaque couple texte/fond du site.
// --accent est declare en oklch avec un fallback hex. On calcule les deux :
// le fallback pour les navigateurs sans oklch, et la conversion oklch->sRGB.

const srgbToLin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const lum = ([r, g, b]) => 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const ratio = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };

// oklch -> sRGB
function oklch(L, C, Hdeg) {
  const h = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(h), bb = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * bb;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * bb;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * bb;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  const enc = (v) => { const c = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055; return Math.max(0, Math.min(255, Math.round(c * 255))); };
  return [enc(lr), enc(lg), enc(lb)];
}

const T = {
  bg: hex('#0B0A08'), 'bg-2': hex('#15120E'), surface: hex('#201C16'),
  line: hex('#2A2622'), 'line-strong': hex('#655C52'), ink: hex('#F4F0E6'), 'ink-2': hex('#C9C3B5'),
  mute: hex('#8B8376'), 'mute-2': hex('#7F796C'),
  'accent-fallback': hex('#EDA968'), 'accent-oklch': oklch(0.79, 0.12, 65),
  'accent-ink': hex('#0B0A08'),
};

const pairs = [
  ['ink', 'bg', 'Corps et titres sur le fond', 4.5],
  ['ink-2', 'bg', 'Paragraphes, texte des lignes horaires', 4.5],
  ['mute', 'bg', 'Modalite des lignes, labels de champs, dates', 4.5],
  ['mute-2', 'bg', 'Mention d illustration, legende, mention legale', 4.5],
  ['accent-fallback', 'bg', 'Chiffre de preuve, 44px, grand texte', 3.0],
  ['accent-oklch', 'bg', 'Idem, valeur oklch reelle', 3.0],
  ['accent-ink', 'accent-fallback', 'Texte du bouton principal', 4.5],
  ['accent-ink', 'accent-oklch', 'Idem, valeur oklch reelle', 4.5],
  ['ink', 'surface', 'Titre de document reproduit', 4.5],
  ['ink-2', 'surface', 'Corps de document reproduit', 4.5],
  ['mute', 'surface', 'Libelles dans un document reproduit', 4.5],
  ['ink', 'bg-2', 'Saisie de formulaire', 4.5],
  ['line-strong', 'bg', 'Bordure des champs de formulaire, composant d interface', 3.0],
  ['line', 'bg', 'Separateurs decoratifs. Hors champ de WCAG 1.4.11, seuil indicatif', 1.0],
];

const rows = pairs.map(([f, b, use, min]) => {
  const r = ratio(T[f], T[b]);
  return { f, b, use, min, r: Math.round(r * 100) / 100, pass: r >= min };
});

console.log('| texte | fond | usage | ratio | seuil | verdict |');
console.log('|---|---|---|---|---|---|');
for (const x of rows) {
  console.log(`| \`--${x.f}\` | \`--${x.b}\` | ${x.use} | **${x.r.toFixed(2)}:1** | ${x.min}:1 | ${x.pass ? 'PASSE' : 'ECHEC'} |`);
}
const fails = rows.filter((x) => !x.pass);
console.log('');
console.log(`accent oklch(0.79 0.12 65) converti en sRGB : rgb(${T['accent-oklch'].join(', ')})`);
console.log(`Couples evalues : ${rows.length}. Echecs : ${fails.length}.`);
if (fails.length) { fails.forEach((x) => console.log(`ECHEC: --${x.f} sur --${x.b} = ${x.r}:1`)); process.exitCode = 1; }
