import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  optimizeDeps: {
    include: ['three']
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    chunkSizeWarningLimit: 800,
    cssCodeSplit: false,
    rollupOptions: {
      input: { main: './index.html' },
      output: {
        // Hash file names for cache-busting
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (/\.(css)$/.test(assetInfo.name)) return 'css/[name].[hash][extname]';
          if (/\.(webp|avif|png|jpg|jpeg|svg|gif|ico)$/.test(assetInfo.name)) return 'images/[name].[hash][extname]';
          return 'assets/[name].[hash][extname]';
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
