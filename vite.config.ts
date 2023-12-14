import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@credit': path.resolve(__dirname, './src/features/credit'),
      '@vehicles': path.resolve(__dirname, './src/features/vehicles'),
      '@auth': path.resolve(__dirname, './src/features/auth'),
      '@misc': path.resolve(__dirname, './src/features/misc'),
    },
  },
  plugins: [react()],
})
