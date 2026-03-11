import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/nihongo-n5/', // <--- esto es clave para GitHub Pages
  plugins: [react()],
})
