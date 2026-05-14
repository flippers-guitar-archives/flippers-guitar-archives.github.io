import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://flippers-guitar.github.io',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
