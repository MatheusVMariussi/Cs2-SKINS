// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
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