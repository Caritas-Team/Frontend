import { API_ENDPOINTS } from './endpoints';
import type { UploadAssessmentParams } from '../../api/types';

export interface IuploadAssessment extends UploadAssessmentParams {
  request_id: string;
}

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

const getAssessment = async (request_id: string) => {
  const response = await fetch(
    import.meta.env.VITE_API_URL + API_ENDPOINTS.results + `${request_id}`
  );
  return response;
};

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
