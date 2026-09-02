// @ts-check
import { defineConfig } from 'astro/config';

// Site entièrement statique. Aucune route rendue à la demande depuis que le
// formulaire de contact a été remplacé par les coordonnées directes.
//
// L'adaptateur Vercel a donc été retiré : il ne servait qu'à empaqueter une
// fonction serveur qui n'existe plus. Bénéfice mesuré, ce n'est pas
// cosmétique : il emportait @vercel/routing-utils et path-to-regexp, soit
// trois des six vulnérabilités remontées par npm audit. Vercel détecte Astro
// et sert dist/ sans configuration.
export default defineConfig({
  site: 'https://www.syntexia.ai',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  devToolbar: {
    enabled: false,
  },
  // Aucun script inline dans le rendu : la CSP peut rester script-src 'self'
  // sans 'unsafe-inline'. Sans cette option, Astro inline les petits scripts.
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
