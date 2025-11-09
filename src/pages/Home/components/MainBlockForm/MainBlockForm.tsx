import help_Icon from '../../../../assets/help_Icon.svg';
import person_add from '../../../../assets/person_add.svg';
import { useCallback, useState } from 'react';
import styles from './MainBlockForm.module.css';
import { PersonForm } from './PersonForm/PersonForm';
import { v4 as uuidv4 } from 'uuid';

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
  const [form, setForm] = useState<boolean>(false); // Ключ для принудительного пересоздания

  const counterDiscovered = persons.filter(person => person.nameValid).length;

  const counterFiles = persons.reduce((total, person) => {
    return (
      total +
      (person.previousFileValid ? 1 : 0) +
      (person.currentFileValid ? 1 : 0)
    );
  }, 0);

  const addPerson = () => {
    if (persons.length < MAX_PERSONS - 1) {
      setPersons(prev => [
        ...prev,
        {
          id: uuidv4(),
          name: '',
          nameValid: false,
          previousFileValid: false,
          previouFile: null,
          currentFileValid: false,
          currentFile: null,
        },
      ]);
    } else {
      console.log(`Достигнут лимит в ${MAX_PERSONS} человек`);
    }
  };

  const removePerson = (idToRemove: string) => {
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

  // Самбит формы
  const canSubmit = persons.every(
    person =>
      person.nameValid && person.previousFileValid && person.currentFileValid
  );

  const resetForm = () => {
    //Список объектов для отправкм
    console.log(persons);
    // Создаем новый массив
    setPersons([createMainForm()]);
    // Меняем ключ для принудительного пересоздания
    setForm(!form);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // TODO Пределать когда будет шаблон для отправки

    e.preventDefault();

    if (canSubmit) {
      alert(
        `Отправлено данных: ${persons.length} обследуемых, ${counterFiles} файлов`
      );

      resetForm();
    }
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
            className={styles.buttonAdd}
            onClick={addPerson}
            disabled={persons.length >= MAX_PERSONS - 1}
          >
            <img
              className={styles.imgPersonAdd}
              src={person_add}
              alt="Добавить обследуемого"
              width={'24'}
            />
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
                persons.length != 1 ? () => removePerson(person.id) : undefined
              }
              onUpdate={updatePerson}
              formData={person}
            />
          ))}
        </div>

        <button
          type="submit"
          className={`${styles.formContainerSubmitBtn} ${!canSubmit ? styles.submitBtnDisabled : ''}`}
          disabled={!canSubmit}
        >
          <div className={styles.buttonIcon} />
          Рассчитать динамику
        </button>
      </form>
    </div>
  );
};

export default MainBlockForm;
