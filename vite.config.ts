import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Add bundle analyzer for analyze mode
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    base: '/website/',
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor libraries into separate chunks
            vue: ['vue', 'vue-router'],
            pinia: ['pinia'],
            aplayer: ['aplayer'],
            axios: ['axios']
          }
        }
      },
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Reduce chunk size warnings
      chunkSizeWarningLimit: 1000,
      // Enable minification
      minify: 'esbuild' as const,
      // Optimize assets
      assetsInlineLimit: 4096,
    },
    // Enable gzip compression
    esbuild: {
      drop: ['console', 'debugger'] as ('console' | 'debugger')[]
    },
    // Optimize images
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
  }

  // Add bundle analyzer in analyze mode
  if (mode === 'analyze') {
    config.plugins.push(visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }))
  }

  return config
})
