import { realpathSync } from 'fs';
import { copySync } from 'fs-extra';
import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  hooks: {
    'nitro:build:public-assets': () => {
      const src = resolve(__dirname, 'node_modules/freemarker');
      const realpath = realpathSync(src);
      const dest = resolve(__dirname, '.output/server/node_modules/freemarker');
      copySync(realpath, dest, { overwrite: true });
    },
  },
});
