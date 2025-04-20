import api from '../utils/api';

export const getChats = async () => {
  return await api.get('/api/chat');
};

export const sendMessage = async (messageData) => {
  return await api.post('/api/chat', messageData);
};

export const getMessagesWithUser = async (userId) => {
  return await api.get(`/api/chat/${userId}`);
};
