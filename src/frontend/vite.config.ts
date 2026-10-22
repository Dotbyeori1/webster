import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const BACKEND = 'http://localhost'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'global-builtin',
          'color-functions',
          'if-function',
          'color-module-compat',
        ],
        quietDeps: true,
      },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  server: {
    port: 80,
    host: true,
    proxy: {
      '/api': { target: BACKEND, changeOrigin: true, secure: false }, // ← true 권장
      '/ws':  { target: BACKEND, ws: true, changeOrigin: true, secure: false }
    }
  },
  build: { outDir: 'dist', emptyOutDir: true }
})
