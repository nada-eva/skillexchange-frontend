import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],  

  server: {
    port: 5173,  
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,  
        //le proxy modifie l'origine de la requête pour qu'elle corresponde au serveur cible
      },
    },
  },
});