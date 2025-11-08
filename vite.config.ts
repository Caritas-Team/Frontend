import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@page-layout': path.resolve(__dirname, 'src/widgets/page-layout'),
      '@main-wrapper/*': path.resolve(__dirname, 'src/widgets/main-wrapper'),
      pages: path.resolve(__dirname, './src/pages'),
    },
  },
});
