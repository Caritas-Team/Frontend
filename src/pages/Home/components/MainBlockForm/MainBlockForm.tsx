import help_Icon from '../../../../assets/help_Icon.svg';
import { useCallback, useMemo, useRef, useState } from 'react';
import styles from './MainBlockForm.module.css';
import { PersonForm } from './PersonForm/index';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { exchangeWithServer } from '../../../../lib/api/exchangeWithServer';
import type { IuploadAssessment } from '../../../../lib/api/exchangeWithServer';

const MAX_PERSONS = 10;

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
  openLoader: () => void;
  openErrorPopup: (errors: string[]) => void;
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

export const MainBlockForm = ({
  openPopup,
  openLoader,
  openErrorPopup,
}: MainBlockFormProps) => {
  const navigate = useNavigate();
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

    openLoader();
    exchangeWithServer(data)
      .then(result => {
        openLoader();
        if (data.files && data.files?.length > 2) {
          navigate('/result_group', { state: { result } });
        }
        if (data.files && data.files?.length === 2) {
          navigate('/result', { state: { result } });
        }
      })
      .catch(err => {
        openLoader();
        openErrorPopup(err.message);
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
