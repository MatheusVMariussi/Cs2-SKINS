import axios from 'axios';
import { supabase } from './supabaseClient';

// Cria a instância do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// INTERCEPTOR: Injeta o Token JWT do Supabase em toda requisição
// Isso é o que permite o backend saber quem é o usuário logado
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  
  return config;
});

export const getAnuncios = async (page = 1, filters = {}) => {
  try {
    const response = await api.get('/anuncios', { 
      params: { page, ...filters } 
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar anúncios:', error);
    throw error;
  }
};

export const getAnuncioById = async (id) => {
  try {
    const response = await api.get(`/anuncios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar anúncio ${id}:`, error);
    throw error;
  }
};

export const createAnuncio = async (anuncioData) => {
  try {
    const response = await api.post('/anuncios', anuncioData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar anúncio:', error);
    throw error;
  }
};

export const updateAnuncio = async (id, anuncioData) => {
  try {
    const response = await api.put(`/anuncios/${id}`, anuncioData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar anúncio ${id}:`, error);
    throw error;
  }
};

export const deleteAnuncio = async (id) => {
  try {
    const response = await api.delete(`/anuncios/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir anúncio ${id}:`, error);
    throw error;
  }
};

export default api;