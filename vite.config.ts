import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "127.0.0.1",
    port: 8080,
  },
  plugins: [
    react(),
    // Bundle analyzer - generates stats.html after build
    mode === 'analyze' && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Performance Optimization: Enhanced Chunk Splitting
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : [],
      },
    },
    rollupOptions: {
      output: {
        // Improved manual chunk splitting
        manualChunks: (id) => {
          // React core - critical for all pages
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/')) {
            return 'react-vendor';
          }

          // Radix UI components - used across landing
          if (id.includes('@radix-ui/')) {
            return 'ui-vendor';
          }

          // Framer Motion - animations
          if (id.includes('framer-motion')) {
            return 'animation-vendor';
          }

          // Backend services - lazy load these
          if (id.includes('@supabase/supabase-js') || id.includes('firebase')) {
            return 'backend-vendor';
          }

          // 3D Graphics - only for specific pages
          if (id.includes('three') || id.includes('@react-three/')) {
            return 'three-vendor';
          }

          // TanStack Query - data fetching
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor';
          }

          // Icons - lucide-react
          if (id.includes('lucide-react')) {
            return 'icons-vendor';
          }

          // Other large dependencies
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
    exclude: [
      // Exclude heavy deps from pre-bundling
      '@react-three/fiber',
      '@react-three/drei',
      'three',
    ],
  },
}));
