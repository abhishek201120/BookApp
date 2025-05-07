import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or vue, svelte, etc.

export default defineConfig({
  plugins: [
    react(), // or other framework plugins
  ],
  server: {
    proxy: {
      // Proxy API requests to your backend server
      '/api': {
        target: 'http://localhost:5000', // your backend server address
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // You can add more proxy rules as needed
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})