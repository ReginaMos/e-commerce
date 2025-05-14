import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  base: '/e-commerce/release-sprint-2/',
  plugins: [vue(), vuetify({ autoImport: true })],
});
