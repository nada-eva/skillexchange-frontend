import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],  // activer le support JSX et React

  server: {
    port: 5173,  // port du serveur de développement

    // PROXY : redirige les requêtes /api vers le backend Express
    // Exemple : fetch('/api/annonces') → http://localhost:5000/api/annonces
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,  // modifie l'en-tête Origin de la requête
      },
    },
  },
});