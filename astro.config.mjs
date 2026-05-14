import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://flippers-guitar-archives.github.io',
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
