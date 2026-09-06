import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          anime: ['animejs'],
          three: ['three']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});