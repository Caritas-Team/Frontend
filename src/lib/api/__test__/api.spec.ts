import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdater from 'axios-mock-adapter';
import { apiClient } from '../apiClient';
import { API_ENDPOINTS } from '../endpoints';
import { getResult } from '../result';
import { uploadFiles, type Person } from '../upload';

describe('Тестирование uploadFiles и getResult', () => {
  let mock: MockAdater;

  beforeEach(() => {
    mock = new MockAdater(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it('Отправляет данные методом POST и возвращает результат методом GET', async () => {
    const file_1 = new File(['Тестовый pdf 1'], '1.pdf');
    const file_2 = new File(['Тестовый pdf 2'], '2.pdf');

    const people: Person[] = [
      {
        fullName: 'Иван Сидоров',
        previousValues: file_1,
        currentValues: file_2,
        date: '18-11-2025',
      },
    ];

    mock.onPost(API_ENDPOINTS.upload).reply(conf => {
      expect(conf.headers!['X-Timestamp']).toBeDefined();
      expect(conf.headers!['X-Request-UUID']).toBeDefined();

      expect(conf.data).toBeDefined();
      return [200, { id: '123456' }];
    });

    const uploadResponse = await uploadFiles(people);

    expect(uploadResponse).toHaveProperty('id', '123456');

    mock.onGet(`${API_ENDPOINTS.results}/123456`).reply(200, {
      status: 'done',
      data: { result: true },
    });

    const resultResponse = await getResult('123456');

    expect(resultResponse).toEqual({
      status: 'done',
      data: { result: true },
    });
  });
});
