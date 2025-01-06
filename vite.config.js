import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // This ensures that React Router handles routing during development
  },
  build: {
    outDir: 'dist', // This should be set to where you want to output the build
    // Remove rollupOptions.input unless you really need it. Vite usually handles it for you.
  },
})
