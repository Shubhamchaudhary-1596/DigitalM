import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
<<<<<<< HEAD
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
=======
  server: { proxy: { '/api': { target: 'http://127.0.0.1:5000', changeOrigin: true } } },

>>>>>>> e1bdb7a24845c3cf6417333fb6ace59d1500573e
})
