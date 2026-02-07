import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/users': 'http://localhost:5000',
            '/items': 'http://localhost:5000',
            '/carts': 'http://localhost:5000',
            '/orders': 'http://localhost:5000'
        }
    }
})
