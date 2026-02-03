import { API_ENDPOINTS } from './endpoints';
import type { UploadAssessmentParams } from '../../api/types';

export interface IuploadAssessment extends UploadAssessmentParams {
  request_id: string;
}

/**
 * Загружает файлы и метаданные для оценки на сервер
 *
 * @function uploadAssessment
 * @private
 * @description
 * Вспомогательная функция для отправки данных оценки на сервер.
 * Преобразует данные в FormData, добавляет обязательные заголовки
 * и выполняет POST-запрос к эндпоинту загрузки.
 *
 * @param {IuploadAssessment} data - Данные для загрузки, включая файлы и метаданные
 * @returns {Promise<Response>} Promise с объектом Response от fetch
 *
 * @throws {Error} При ошибках сети или сервера
 *
 * @example
 * const data = {
 *   request_id: '123e4567-e89b-12d3-a456-426614174000',
 *   files: [file1, file2],
 *   meta: { organization: 'Компания', specialist: 'Иванов И.И.' }
 * };
 * const response = await uploadAssessment(data);
 */

const uploadAssessment = async (data: IuploadAssessment) => {
  const formData = new FormData();
  data.files?.forEach(file => {
    formData.append('files', file);
  });
  const meta = {
    ...data.meta,
    organization: data.meta?.organization || '',
    specialist: data.meta?.specialist || '',
  };
  formData.append('meta', JSON.stringify(meta));

  const response = await fetch(
    import.meta.env.VITE_API_URL + API_ENDPOINTS.upload,
    {
      method: 'POST',
      headers: {
        'X-Request-Id': data.request_id,
      },
      body: formData,
    }
  );

  return response;
};

/**
 * Получает результаты оценки по ID запроса
 *
 * @function getAssessment
 * @private
 * @description
 * Выполняет GET-запрос для получения результатов оценки
 * по уникальному идентификатору запроса.
 *
 * @param {string} request_id - Уникальный идентификатор запроса оценки
 * @returns {Promise<Response>} Promise с объектом Response от fetch
 *
 * @throws {Error} При ошибках сети или сервера
 *
 * @example
 * const response = await getAssessment('123e4567-e89b-12d3-a456-426614174000');
 */

const getAssessment = async (request_id: string) => {
  const response = await fetch(
    import.meta.env.VITE_API_URL + API_ENDPOINTS.results + `${request_id}`
  );
  return response;
};

/**
 * Основная функция для обмена данными с сервером оценки
 *
 * @function exchangeWithServer
 * @description
 * Выполняет полный цикл взаимодействия с сервером оценки:
 * 1. Загружает файлы и метаданные
 * 2. Обрабатывает возможные ошибки загрузки
 * 3. Если расчет требует времени - запускает механизм опроса
 * 4. Дожидается завершения расчета с экспоненциальной задержкой
 * 5. Возвращает финальные результаты или выбрасывает ошибку
 *
 * @param {IuploadAssessment} data - Данные для отправки на оценку
 * @returns {Promise<Object>} Promise с результатами расчета
 *
 * @throws {Error} В случаях:
 * - Ошибка загрузки файлов (400, 409, 500)
 * - Ошибка получения результатов (404, 500)
 * - Расчет завершился с ошибкой (status: 'failed')
 * - Превышено время ожидания (более 13 попыток)
 * - Результаты не найдены после нескольких попыток
 *
 * @example
 * try {
 *   const data = {
 *     request_id: '123e4567-e89b-12d3-a456-426614174000',
 *     files: [file1, file2],
 *     meta: { organization: 'Компания', specialist: 'Иванов И.И.' }
 *   };
 *   const results = await exchangeWithServer(data);
 *   console.log('Результаты расчета:', results);
 * } catch (error) {
 *   console.error('Ошибка расчета:', error.message);
 * }
 *
 * @example
 * // Сценарий с быстрым расчетом
 * const results = await exchangeWithServer(data);
 * // Результаты возвращаются сразу, если статус не 'processing'
 *
 * @example
 * // Сценарий с долгим расчетом
 * const results = await exchangeWithServer(data);
 * // Функция будет опрашивать сервер с экспоненциальной задержкой
 *
 * @note
 * Стратегия опроса (polling):
 * - Начальный интервал: 2 секунды
 * - Максимальный интервал: 5 секунд
 * - Максимальное количество попыток: 13
 * - Экспоненциальное увеличение интервала: +1 секунда за попытку
 *
 * @warning
 * Функция имеет ограничение по времени ожидания:
 * Максимальное время ≈ (2+3+4+5*10) = ~59 секунд при 13 попытках
 *
 * @see API_ENDPOINTS - Конфигурация конечных точек API
 * @see UploadAssessmentParams - Типы параметров загрузки
 *
 * @todo
 * - Добавить поддержку отмены запроса (AbortController)
 * - Реализовать механизм WebSocket для получения уведомлений
 * - Добавить возможность кастомизации параметров опроса
 * - Добавить логгирование процесса опроса
 */

export const exchangeWithServer = async (data: IuploadAssessment) => {
  const postFile = await uploadAssessment(data);

  if (!postFile.ok) {
    const errorBody = await postFile.json();
    switch (postFile.status) {
      case 400:
        break;
      case 409:
        break;
      case 500:
        break;
    }
    throw new Error(errorBody.message);
  }

  const resultPost = await postFile.json();

  if (resultPost.status === 'processing') {
    const initialPollInterval = 2000;
    const maxPollInterval = 5000;
    const maxAttempts = 13;
    const sleep = (ms: number) =>
      new Promise(resolve => setTimeout(resolve, ms));
    let resultGet;
    let attempts = 0;
    let pollInterval = initialPollInterval;

    do {
      attempts++;
      await sleep(pollInterval);
      const getAssessmentResponse = await getAssessment(data.request_id);

      if (!getAssessmentResponse.ok) {
        const errorBody = await getAssessmentResponse.json();
        switch (getAssessmentResponse.status) {
          case 404:
            if (attempts > 3) {
              throw new Error('Результаты не найдены после нескольких попыток');
            }
            pollInterval = Math.min(pollInterval + 1000, maxPollInterval);
            continue;
          case 500:
            throw new Error('Ошибка сервера при получении результата');
          default:
            console.error(
              'Ошибка',
              getAssessmentResponse.status,
              errorBody.message
            );
            throw new Error(`Ошибка ${getAssessmentResponse.status}`);
        }
      }

      const responseData = await getAssessmentResponse.json();
      resultGet = responseData;

      if (resultGet.status === 'failed') {
        throw new Error(
          `Расчет завершился с ошибкой: ${resultGet.error?.message}`
        );
      }

      if (resultGet.status !== 'completed') {
        pollInterval = Math.min(pollInterval + 1000, maxPollInterval);
      }

      if (attempts >= maxAttempts && resultGet.status !== 'completed') {
        throw new Error('Превышено максимальное количество попыток');
      }
    } while (resultGet.status !== 'completed');

    return resultGet;
  }

  return resultPost;
};
