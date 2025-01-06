import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // This ensures that React Router handles routing during development
  },
  build: {
    outDir: 'dist', // Make sure the build output directory is set
    rollupOptions: {
      input: '/index.html', // Ensure the entry point is correctly configured
    },
  },
})
