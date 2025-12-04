import axios from 'axios';
import { supabase } from './supabaseClient';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Interceptor MAIS SEGURO
api.interceptors.request.use(async (config) => {
  try {
    // Verifica se o supabase foi inicializado corretamente
    if (!supabase) return config;

    const sessionResponse = await supabase.auth.getSession();
    
    if (sessionResponse && sessionResponse.data && sessionResponse.data.session) {
      const token = sessionResponse.data.session.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.warn("Erro silencioso ao pegar token (usuário pode estar deslogado):", error);
  }
  
  return config;
});

export const getAnuncios = async (page = 1, filters = {}) => {
  const response = await api.get('/anuncios', { params: { page, ...filters } });
  return response.data;
};

export const getAnuncioById = async (id) => {
  const response = await api.get(`/anuncios/${id}`);
  return response.data;
};

export const createAnuncio = async (anuncioData) => {
  const response = await api.post('/anuncios', anuncioData);
  return response.data;
};

export const updateAnuncio = async (id, anuncioData) => {
  const response = await api.put(`/anuncios/${id}`, anuncioData);
  return response.data;
};

export const deleteAnuncio = async (id) => {
  const response = await api.delete(`/anuncios/${id}`);
  return response.data;
};

export default api;