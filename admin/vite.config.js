import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react(),tailwindcss(),],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
=======
  plugins: [react()],
  server: { proxy: { '/api': { target: 'http://127.0.0.1:5000', changeOrigin: true } } },

>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
})
