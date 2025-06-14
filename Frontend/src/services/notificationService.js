import API from '../api/api';

export const getNotifications = async () => {
  const res = await API.get('/notifications');
  return res.data;
};
