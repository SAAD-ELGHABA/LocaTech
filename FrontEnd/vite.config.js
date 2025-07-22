import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      }
    },
    '/node': {
      target: 'http://localhost:5000', 
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/node/, '')
    },
      host: true,
      port: 5173,
      strictPort: true,
      allowedHosts: [
        'aeb3-160-177-94-208.ngrok-free.app',
      ],
  },
})
