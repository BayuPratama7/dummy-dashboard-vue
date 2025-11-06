/**
 * Vitest Configuration
 * Konfigurasi untuk unit testing dengan Vue 3 dan Pinia
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true
  }
})