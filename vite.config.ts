import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/window-display/", 
  plugins: [react()],
  build: {
    outDir: 'dist'  // Ensure this matches the publish_dir in the workflow
  }

})
