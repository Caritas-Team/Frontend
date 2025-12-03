import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export const getResult = (id: string) => {
  return apiClient.get(`${API_ENDPOINTS.results}/${id}`);
};
