import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: '/',
  appType: 'spa',
  resolve: {
    alias: {
      // Force single React instance to avoid Invalid hook call errors
      react: path.resolve(__dirname, 'node_modules', 'react'),
      'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom')
    }
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    }
  }
})
