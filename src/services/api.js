//Instance Axios pour l'API backend
// Utilisation dans les composants :
//   import api from '../services/api';
//   const response = await api.get('/annonces');
//   const response = await api.post('/auth/login', { email, password });

import axios from 'axios';

// Créer une instance Axios avec configuration de base
const api = axios.create({
  // URL de base : toutes les requêtes seront préfixées par /api
  // En dev : le proxy Vite redirige vers http://localhost:5000/api
  // En prod : VITE_API_URL pointe vers l'API Render
  baseURL: import.meta.env.VITE_API_URL || '/api',

  // Headers par défaut pour toutes les requêtes
  headers: {
    'Content-Type': 'application/json',
  },

  // Timeout : annuler la requête si le serveur ne répond pas en 10s
  timeout: 10000,
});

// ───────────────────────────────────────────────────
// INTERCEPTEUR DE REQUÊTES
// Ajoute automatiquement le token JWT à chaque requête
// ───────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis localStorage
    const token = localStorage.getItem('se_token');

    // Si un token existe, l'ajouter dans l'en-tête Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ───────────────────────────────────────────────────
// INTERCEPTEUR DE RÉPONSES
// Gestion centralisée des erreurs
// ───────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,  // succès → retourner la réponse
  (error) => {
    // Si le serveur retourne 401 (non autorisé) → déconnecter l'utilisateur
    if (error.response?.status === 401) {
      localStorage.removeItem('se_token');
      localStorage.removeItem('se_user');
      window.location.href = '/login';  // rediriger vers login
    }
    return Promise.reject(error);
  }
);

export default api;