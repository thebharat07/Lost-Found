import api from '../utils/api';

export const postLostItem = async (itemData) => {
  return await api.post('/api/items/lost', itemData);
};

export const postFoundItem = async (itemData) => {
  return await api.post('/api/items/found', itemData);
};

export const getAllItems = async () => {
  return await api.get('/api/items');
};

export const searchItems = async (query) => {
  return await api.get(`/api/items/search?q=${query}`);
};
