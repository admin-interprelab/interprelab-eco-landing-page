import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import compression from 'vite-plugin-compression';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    // Gzip compression for all static assets
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files > 1KB
    }),
    // Brotli compression for even better compression
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),
  ],
  resolve: {
    alias: {
      '@/components/ui': path.resolve(__dirname, '../../packages/ui/src/components/ui'),
      '@/lib/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@': path.resolve(__dirname, './src'),
      '@interprelab/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@interprelab/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@interprelab/types': path.resolve(__dirname, '../../packages/types/src'),
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, './node_modules/react/jsx-runtime'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Optimized manual chunks for better caching
        manualChunks: (id) => {
          // React core - rarely changes
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // React Router - separate chunk
          if (id.includes('node_modules/react-router')) {
            return 'router';
          }
          // Framer Motion - animation library
          if (id.includes('node_modules/framer-motion')) {
            return 'animations';
          }
          // Lucide icons - separate chunk
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          // UI components from shared package
          if (id.includes('packages/ui')) {
            return 'ui-components';
          }
          // Landing-specific components
          if (id.includes('src/components/landing')) {
            return 'landing-components';
          }
        },
        // Optimize chunk file names for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Aggressive minification with esbuild (faster than terser, still excellent compression)
    minify: 'esbuild',
    esbuildOptions: {
      drop: ['console', 'debugger'], // Remove console.logs and debuggers in production
    },
    // Target modern browsers for smaller bundle
    target: 'es2020',
    // CSS code splitting
    cssCodeSplit: true,
    // Chunk size warnings
    chunkSizeWarningLimit: 150,
    // Source maps for production debugging (optional)
    sourcemap: false,
    // Optimize assets
    assetsInlineLimit: 4096, // Inline assets < 4KB as base64
  },
  // Tree-shaking optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    // Exclude large dependencies from pre-bundling
    exclude: ['@interprelab/ui'],
  },
  // Server configuration for development
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },
  // Preview configuration
  preview: {
    port: 4173,
    strictPort: false,
  },
});
