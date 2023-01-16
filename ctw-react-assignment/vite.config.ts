import * as path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const { resolve } = path

const PORT = 8080

const PATHS = {
  // Source files
  src: resolve(__dirname, './src')
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': PATHS.src
    }
  },
  server: {
    port: PORT,
    strictPort: true
  }
})
