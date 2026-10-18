import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        projects: resolve(import.meta.dirname, 'projects.html'),
        certifications: resolve(import.meta.dirname, 'certifications.html'),
      },
    },
  },
});
