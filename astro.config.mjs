// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Le site est statique. L'adaptateur Vercel n'est là que pour la seule route
// rendue à la demande : src/pages/api/contact.ts (prerender = false).
export default defineConfig({
  site: 'https://www.syntexia.ai',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  // Aucun script inline dans le rendu : la CSP peut rester script-src 'self'
  // sans 'unsafe-inline'. Sans cette option, Astro inline les petits scripts
  // hoistés, ce qui violerait la politique une fois qu'elle sera bloquante.
  vite: {
    build: { assetsInlineLimit: 0 },
  },
  devToolbar: {
    enabled: false,
  },
});
