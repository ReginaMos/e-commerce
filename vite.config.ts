/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  base: '/e-commerce/release-sprint-4/',
  plugins: [vue(), vuetify({ autoImport: true })],
  test: {
    setupFiles: ['./src/test/setupTests.ts'],
    globals: true,
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
    coverage: {
      reporter: 'text',
    },
  },
});
