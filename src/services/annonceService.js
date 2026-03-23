import api from './api';

// params = { type, categorie, search, niveauRequis, page, limit }
export const getAnnonces = (params = {}) =>
  api.get('/annonces', { params });

export const getAnnonceById = (id) =>
  api.get(`/annonces/${id}`);

export const getAnnoncesByUser = (userId) =>
  api.get(`/annonces/user/${userId}`);

// JWT requis
export const createAnnonce = (data) =>
  api.post('/annonces', data);

export const updateAnnonce = (id, data) =>
  api.put(`/annonces/${id}`, data);

export const deleteAnnonce = (id) =>
  api.delete(`/annonces/${id}`);