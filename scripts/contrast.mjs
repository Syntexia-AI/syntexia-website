// Calcul des ratios WCAG 2.1 pour chaque couple texte/fond du site.
// Palette de la direction d'octobre 2026, voir src/styles/tokens.css et
// docs/DA-2026-10.md. Trois surfaces : papier, bureau, noir.
//
//   node scripts/contrast.mjs
//
// Sort en code 1 si un couple échoue. Les seuils suivent WCAG 2.1 :
// 4.5:1 pour le texte courant, 3:1 pour le grand texte (24px, ou 18.66px
// gras) et pour les objets graphiques porteurs de sens (1.4.11).

const srgbToLin = (c) => {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const lum = ([r, g, b]) => 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
const hex = (h) => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

const T = {
  white: '#FFFFFF',
  desk: '#EEEDEA',
  black: '#000000',
  graphite: '#3D3B37',
  stone: '#6A6761',
  'paper-2': '#F7F6F4',
  typewriter: '#1E1D1B',
  copper: '#B36A2A',
  'copper-lit': '#E39B5E',
  ash: '#C9C6C0',
  'ash-2': '#8F8B84',
  'soot-2': '#66635E',
};

const pairs = [
  // Papier
  ['black', 'white', 'Titres et texte principal sur papier', 4.5],
  ['graphite', 'white', 'Paragraphes sur papier', 4.5],
  ['stone', 'white', 'Dates, rôles, légendes sur papier', 4.5],
  ['white', 'black', 'Bouton principal, texte blanc sur noir', 4.5],
  ['copper', 'white', 'Point final, coches, anneau de focus : objet graphique', 3.0],
  // Bureau
  ['black', 'desk', 'Titres sur le bureau', 4.5],
  ['graphite', 'desk', 'Paragraphes sur le bureau', 4.5],
  ['stone', 'desk', 'Légendes sur le bureau (démonstration, pièces)', 4.5],
  ['copper', 'desk', 'Point final et focus sur le bureau : objet graphique', 3.0],
  // Objets reproduits
  ['typewriter', 'white', 'Encre des pièces reproduites', 4.5],
  ['stone', 'paper-2', 'Rail de phases de l interface reproduite', 4.5],
  // Noir
  ['white', 'black', 'Titres et texte principal sur noir', 4.5],
  ['ash', 'black', 'Paragraphes sur noir', 4.5],
  ['ash-2', 'black', 'Légendes, pied de page sur noir', 4.5],
  ['soot-2', 'black', 'Verbes au repos des onglets, 40px et plus : grand texte', 3.0],
  ['copper-lit', 'black', 'Point final, filet de progression, focus sur noir', 3.0],
  // Sélection
  ['black', 'copper-lit', 'Texte sélectionné', 4.5],
];

const rows = pairs.map(([f, b, use, min]) => {
  const r = ratio(hex(T[f]), hex(T[b]));
  return { f, b, use, min, r: Math.round(r * 100) / 100, pass: r >= min };
});

console.log('| texte | fond | usage | ratio | seuil | verdict |');
console.log('|---|---|---|---|---|---|');
for (const x of rows) {
  console.log(
    `| \`--${x.f}\` | \`--${x.b}\` | ${x.use} | **${x.r.toFixed(2)}:1** | ${x.min}:1 | ${x.pass ? 'PASSE' : 'ECHEC'} |`
  );
}
const fails = rows.filter((x) => !x.pass);
console.log('');
console.log(`Couples évalués : ${rows.length}. Échecs : ${fails.length}.`);
if (fails.length) {
  fails.forEach((x) => console.log(`ECHEC: --${x.f} sur --${x.b} = ${x.r}:1`));
  process.exitCode = 1;
}
