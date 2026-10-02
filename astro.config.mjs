// @ts-check
import { defineConfig } from 'astro/config';

// Site entièrement statique : aucune route rendue à la demande, aucun
// adaptateur. Vercel détecte Astro et sert dist/ sans configuration ; les
// en-têtes de sécurité et les redirections sont dans vercel.json.
export default defineConfig({
  site: 'https://www.syntexia.ai',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  // Les titres sont composés de spans en ligne séparés par des espaces.
  // Astro 7 retire par défaut les blancs entre éléments, à la manière de
  // JSX ; true garde la compression HTML, qui conserve ces espaces.
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  // Aucun script inline dans le rendu : la CSP peut rester script-src 'self'
  // sans 'unsafe-inline'. Sans cette option, Vite inline les petits scripts.
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
