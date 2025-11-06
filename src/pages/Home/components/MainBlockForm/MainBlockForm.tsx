import help_Icon from './help_Icon.svg';
import person_add from './person_add.svg';
import { useCallback, useState } from 'react';
import './MainBlockForm.css';
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

const createMainForm = (): PersonFormData => ({
  id: uuidv4(),
  name: '',
  nameValid: false,
  previousFileValid: false,
  previouFile: null,
  currentFileValid: false,
  currentFile: null,
});

export const MainBlockForm = () => {
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
    <div className="main-form__container">
      <div className="form__stats">
        <div className="stats__counter">
          <h3 className="stats-text counter__discovered">
            Обследуемых:{' '}
            <span className="form__stats__counter">{counterDiscovered}</span>
          </h3>
          <h3 className="stats-text counter__Files">
            Загружено файлов:{' '}
            <span className="form__stats__counter">{counterFiles}</span>
          </h3>
        </div>
        <div className="stats__buttons">
          <button
            className="component-reset-button button-add"
            onClick={addPerson}
            disabled={persons.length >= MAX_PERSONS - 1}
          >
            <img
              className="img__person_add"
              src={person_add}
              alt="Добавить обследуемого"
              width={'24'}
            />
            Добавить к расчёту
          </button>
          <button className="component-reset-button button-info" type="button">
            <img src={help_Icon} alt="Кнопка подсказки" width={'24'} />
          </button>
        </div>
      </div>

      <form className="form-speaker-calculator" onSubmit={handleSubmit}>
        <div className="form-speaker-calculator__groups">
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
          className={`component-reset-button form__container__submit-btn ${!canSubmit ? 'submit-btn--disabled' : ''}`}
          disabled={!canSubmit}
        >
          <div className="button-icon" />
          Рассчитать динамику
        </button>
      </form>
    </div>
  );
};
