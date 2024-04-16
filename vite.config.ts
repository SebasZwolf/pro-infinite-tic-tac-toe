import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base : process.env.VITE_base_URL,
  plugins: [react()],
})
