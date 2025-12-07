import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "127.0.0.1",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Performance Optimization: Manual Chunk Splitting
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Isolate React core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Isolate UI Library (Shadcn/Radix)
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-slot',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            'framer-motion'
          ],
          // Isolate Heavy Backends (Supabase/Firebase)
          'backend-vendor': ['@supabase/supabase-js', 'firebase'],
          // Isolate 3D Graphics (if used)
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
}));
