import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    // Add or update the 'base' property:
  base: '/simulateur/', // <--- IMPORTANT: Replace YOUR_REPO_NAME with your actual repository name

})
