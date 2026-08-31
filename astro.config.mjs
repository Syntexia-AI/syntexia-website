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
  devToolbar: {
    enabled: false,
  },
});
