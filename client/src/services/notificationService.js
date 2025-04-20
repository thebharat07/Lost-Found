import api from '../utils/api';

export const getNotifications = async () => {
  return await api.get('/api/notifications');
};

export const clearNotification = async (notificationId) => {
  return await api.delete(`/api/notifications/${notificationId}`);
};
