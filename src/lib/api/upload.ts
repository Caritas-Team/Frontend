import { apiClient } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

export interface Person {
  fullName: string;
  previousValues: File;
  currentValues: File;
  date: string;
}

export const uploadFiles = (people: Person[]) => {
  const formData = new FormData();
  people.forEach((person, index) => {
    formData.append(`people[${index}][fullName]`, person.fullName);
    formData.append(`people[${index}][previousValues]`, person.previousValues);
    formData.append(`people[${index}][currentValues]`, person.currentValues);
    formData.append(`people[${index}][date]`, person.date);
  });

  return apiClient.post(API_ENDPOINTS.upload, formData);
};
