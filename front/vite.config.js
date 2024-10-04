import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupNodePolyfills from 'rollup-plugin-polyfill-node';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ws': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      // Alias to support 'buffer' and other Node.js modules
      buffer: 'rollup-plugin-polyfill-node/polyfills/buffer-es6',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Define `global` for the browser
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Rollup polyfill for Node.js globals like 'global', 'Buffer', etc.
        rollupNodePolyfills(),
      ],
    },
  },
})
