import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export const uploadFiles = (files: File[]) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));

  return apiClient.post(API_ENDPOINTS.upload, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
