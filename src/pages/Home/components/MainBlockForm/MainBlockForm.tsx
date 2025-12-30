import help_Icon from '../../../../assets/help_Icon.svg';
import { useCallback, useMemo, useRef, useState } from 'react';
import styles from './MainBlockForm.module.css';
import { PersonForm } from './PersonForm/index';
import { v4 as uuidv4 } from 'uuid';
import type { UploadAssessmentParams } from '../../../../api/types';

const MAX_PERSONS = 10;

interface IuploadAssessment extends UploadAssessmentParams {
  request_id: string;
}

export type PersonFormData = {
  id: string;
  name: string;
  nameValid: boolean;
  previousFileValid: boolean;
  previouFile: File | null;
  currentFileValid: boolean;
  currentFile: File | null;
};

interface MainBlockFormProps {
  openPopup: () => void;
}

const createMainForm = (): PersonFormData => ({
  id: uuidv4(),
  name: '',
  nameValid: false,
  previousFileValid: false,
  previouFile: null,
  currentFileValid: false,
  currentFile: null,
});

export const MainBlockForm = ({ openPopup }: MainBlockFormProps) => {
  const [persons, setPersons] = useState<PersonFormData[]>([createMainForm()]);
  const [counterDiscovered, setCounterDiscovered] = useState<number>(1);

  const buttonSumbit = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState<boolean>(false); // Ключ для принудительного пересоздания

  const counterFiles = persons.reduce((total, person) => {
    return (
      total +
      (person.previousFileValid ? 1 : 0) +
      (person.currentFileValid ? 1 : 0)
    );
  }, 0);

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
      'https://caritas.rassokha.pro/api/v1/assessments/upload',
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
      `https://caritas.rassokha.pro/api/v1/assessments/${request_id}`
    );

    return response;
  };

  const exchangeWithServer = async (data: IuploadAssessment) => {
    try {
      const postFile = await uploadAssessment(data);

      if (!postFile.ok) {
        const errorBody = await postFile.json();
        switch (postFile.status) {
          case 400:
            console.log('Ошибка 400', errorBody.message);
            break;
          case 409:
            console.log('Ошибка 409', errorBody.message);
            break;
          case 500:
            console.log('Ошибка 500', errorBody.message);
            break;
          default:
            console.error('Ошибка', postFile.status, errorBody.message);
        }
        throw new Error('Ошибка при загрузке файлов');
      }

      const resultPost = await postFile.json();
      console.log('PostResult:', resultPost);

      if (resultPost.status === 'processing') {
        await new Promise(resolve => setTimeout(resolve, 5000));

        let resultGet;
        let attempts = 0;
        const maxAttempts = 12;

        do {
          attempts++;
          console.log(`Попытка ${attempts} из ${maxAttempts}`);

          const getAssessmentResponse = await getAssessment(data.request_id);

          if (!getAssessmentResponse.ok) {
            const errorBody = await getAssessmentResponse.json();
            switch (getAssessmentResponse.status) {
              case 404:
                console.log('Ошибка 404', errorBody.message);
                if (attempts > 3) {
                  throw new Error(
                    'Результаты не найдены после нескольких попыток'
                  );
                }
                await new Promise(resolve => setTimeout(resolve, 5000));
                continue;
              case 500:
                console.log('Ошибка 500', errorBody.message);
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
          console.log('GetResult:', responseData);

          if (resultGet.status === 'failed') {
            console.error('Обработка завершилась с ошибкой');
            throw new Error(
              `Расчет завершился с ошибкой: ${resultGet.error?.message}`
            );
          }

          if (resultGet.status !== 'completed') {
            console.log('Статус не completed, ждем 5 секунд...');
            await new Promise(resolve => setTimeout(resolve, 5000));
          }

          if (attempts >= maxAttempts && resultGet.status !== 'completed') {
            throw new Error('Превышено максимальное количество попыток');
          }
        } while (resultGet.status !== 'completed');

        console.log('Расчет успешно завершен!');
        return resultGet;
      }

      return resultPost;
    } catch (e) {
      console.log('error', e);
      throw e;
    }
  };

  const addPerson = () => {
    if (persons.length <= MAX_PERSONS) {
      setCounterDiscovered(counterDiscovered + 1);
      setPersons(prev => [
        {
          id: uuidv4(),
          name: '',
          nameValid: false,
          previousFileValid: false,
          previouFile: null,
          currentFileValid: false,
          currentFile: null,
        },
        ...prev,
      ]);
    } else {
      console.log(`Достигнут лимит в ${MAX_PERSONS} человек`);
    }
  };

  const removePerson = (idToRemove: string) => {
    setCounterDiscovered(counterDiscovered - 1);
    setPersons(prev => prev.filter(person => person.id !== idToRemove));
  };

  const updatePerson = useCallback(
    (id: string, updates: Partial<PersonFormData>) => {
      setPersons(prev =>
        prev.map(person =>
          person.id === id ? { ...person, ...updates } : person
        )
      );
    },
    []
  );

  const isFormValid = useMemo(() => {
    return persons.every(
      person =>
        person.nameValid && person.previousFileValid && person.currentFileValid
    );
  }, [persons]);

  // Самбит формы
  const resetForm = () => {
    //Список объектов для отправкм
    console.log(persons);
    // Создаем новый массив
    setPersons([createMainForm()]);
    setCounterDiscovered(1);
    // Меняем ключ для принудительного пересоздания
    setForm(!form);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // TODO Пределать когда будет шаблон для отправки

    e.preventDefault();

    if (!isFormValid) return;

    const data: IuploadAssessment = {
      files: [],
      meta: {},
      request_id: uuidv4(),
    };

    persons.forEach(person => {
      if (person.previousFileValid) {
        data.files?.push(person.previouFile!);
      }
      if (person.currentFileValid) {
        data.files?.push(person.currentFile!);
      }
    });

    exchangeWithServer(data)
      .then(result => {
        console.log('Итоговый результат', result);
      })
      .catch(err => {
        console.log(err);
      });

    resetForm();
  };

  return (
    <div className={styles.mainFormContainer}>
      <div className={styles.formStats}>
        <div className={styles.statsCounter}>
          <h3 className={styles.statsText}>
            Обследуемых:{' '}
            <span className={styles.formStatsCounter}>{counterDiscovered}</span>
          </h3>
          <h3 className={styles.statsText}>
            Загружено файлов:{' '}
            <span className={styles.formStatsCounter}>{counterFiles}</span>
          </h3>
        </div>
        <div className={styles.statsButtons}>
          <button
            className={`${styles.buttonAdd} ${persons.length >= MAX_PERSONS || !isFormValid ? styles.buttonAddDisabled : ''}`}
            onClick={addPerson}
            disabled={persons.length >= MAX_PERSONS || !isFormValid}
          >
            <div
              className={`${styles.buttonIcon} ${styles.buttonIconPersonAdd}`}
            ></div>
            Добавить к расчёту
          </button>
          <button
            className={styles.buttonInfo}
            type="button"
            onClick={openPopup}
          >
            <img src={help_Icon} alt="Кнопка подсказки" width={'24'} />
          </button>
        </div>
      </div>

      <form className={styles.formSpeakerCalculator} onSubmit={handleSubmit}>
        <div className={styles.formSpeakerCalculatorGroups}>
          {persons.map(person => (
            <PersonForm
              key={person.id}
              id={person.id}
              onRemove={
                persons.length !== 1 ? () => removePerson(person.id) : undefined
              }
              onUpdate={updatePerson}
              formData={person}
            />
          ))}
        </div>

        <button
          type="submit"
          ref={buttonSumbit}
          className={`${styles.formContainerSubmitBtn} ${!isFormValid ? styles.submitBtnDisabled : ''}`}
          disabled={!isFormValid}
        >
          <div className={`${styles.buttonIcon} ${styles.buttonIconSumbit}`} />
          Рассчитать динамику
        </button>
      </form>
    </div>
  );
};
