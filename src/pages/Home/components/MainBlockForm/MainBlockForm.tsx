import help_Icon from '../../../../assets/help_Icon.svg';
import { useCallback, useMemo, useRef, useState } from 'react';
import styles from './MainBlockForm.module.css';
import { PersonForm } from './PersonForm/index';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { exchangeWithServer } from '../../../../lib/api/exchangeWithServer';
import type { IuploadAssessment } from '../../../../lib/api/exchangeWithServer';

const MAX_PERSONS = 10;

/**
 * Тип данных для формы персоны
 * @typedef {Object} PersonFormData
 * @property {string} id - Уникальный идентификатор персоны
 * @property {string} name - Имя персоны
 * @property {boolean} nameValid - Флаг валидности имени
 * @property {boolean} previousFileValid - Флаг валидности файла предыдущей диагностики
 * @property {File | null} previouFile - Файл предыдущей диагностики
 * @property {boolean} currentFileValid - Флаг валидности файла текущей диагностики
 * @property {File | null} currentFile - Файл текущей диагностики
 */

export type PersonFormData = {
  id: string;
  name: string;
  nameValid: boolean;
  previousFileValid: boolean;
  previouFile: File | null;
  currentFileValid: boolean;
  currentFile: File | null;
};

/**
 * Тип пропсов для компонента MainBlockForm
 * @typedef {Object} MainBlockFormProps
 * @property {string} completionsDate - Дата завершения диагностики
 * @property {() => void} openPopup - Функция открытия попапа с инструкцией
 * @property {() => void} openLoader - Функция открытия/закрытия лоадера
 * @property {(errors: string[]) => void} openErrorPopup - Функция открытия попапа с ошибками
 */

interface MainBlockFormProps {
  completionsDate: string;
  openPopup: () => void;
  openLoader: () => void;
  openErrorPopup: (errors: string[]) => void;
}

/**
 * Создает начальную форму для персоны
 * @returns {PersonFormData} Инициализированный объект формы персоны
 */

const createMainForm = (): PersonFormData => ({
  id: uuidv4(),
  name: '',
  nameValid: false,
  previousFileValid: false,
  previouFile: null,
  currentFileValid: false,
  currentFile: null,
});

/**
 * Основной блок формы для загрузки диагностических данных
 *
 * @component MainBlockForm
 * @description
 * Компонент управления формой загрузки диагностических данных для одного или нескольких человек.
 * Позволяет добавлять до 10 персон, загружать файлы предыдущей и текущей диагностик (JSON формат),
 * валидировать данные и отправлять их на сервер для расчета динамики.
 *
 * **Ключевые особенности:**
 * - Управление несколькими формами персон (динамическое добавление/удаление)
 * - Валидация всех полей перед отправкой
 * - Ограничение на максимальное количество персон (10)
 * - Интеграция с API для отправки данных и получения результатов
 * - Навигация на страницы результатов (индивидуальных или групповых)
 * - Статистика по загруженным файлам и обследуемым
 *
 * **Бизнес-логика:**
 * 1. Пользователь заполняет формы для одного или нескольких человек
 * 2. Для каждого человека загружаются 2 файла: предыдущая и текущая диагностики
 * 3. При отправке формируется запрос к API с собранными файлами
 * 4. После успешного расчета происходит навигация на страницу результатов
 * 5. Для одного человека - страница индивидуальных результатов
 * 6. Для группы (2+ человека) - страница групповых результатов
 *
 * @param {MainBlockFormProps} props - Свойства компонента
 * @returns {JSX.Element} Основной блок формы с управлением персонами
 *
 * @example
 * // Использование в родительском компоненте
 * const DiagnosticPage = () => {
 *   const [showInstruction, setShowInstruction] = useState(false);
 *   const [showLoader, setShowLoader] = useState(false);
 *   const [errors, setErrors] = useState<string[]>([]);
 *
 *   return (
 *     <div>
 *       <DatePicker
 *         value={completionsDate}
 *         onChange={setCompletionsDate}
 *       />
 *
 *       <MainBlockForm
 *         completionsDate={completionsDate}
 *         openPopup={() => setShowInstruction(true)}
 *         openLoader={() => setShowLoader(!showLoader)}
 *         openErrorPopup={setErrors}
 *       />
 *
 *       {showInstruction && (
 *         <InstructionPopup
 *           isOpen={showInstruction}
 *           doClose={() => setShowInstruction(false)}
 *         />
 *       )}
 *     </div>
 *   );
 * };
 *
 * @example
 * // Интеграция с состоянием приложения
 * const App = () => {
 *   const [globalState, setGlobalState] = useState({
 *     isLoading: false,
 *     errors: [],
 *     showHelp: false
 *   });
 *
 *   const handlers = {
 *     openLoader: () => setGlobalState(prev => ({...prev, isLoading: !prev.isLoading})),
 *     openErrorPopup: (errors) => setGlobalState(prev => ({...prev, errors})),
 *     openPopup: () => setGlobalState(prev => ({...prev, showHelp: true}))
 *   };
 *
 *   return (
 *     <MainBlockForm
 *       completionsDate="2023-12-31"
 *       {...handlers}
 *     />
 *   );
 * };
 *
 * @note
 * - Использует UUID для генерации уникальных идентификаторов персон
 * - Максимальное количество персон ограничено константой MAX_PERSONS = 10
 * - Форма становится активной только когда все поля всех персон валидны
 * - Кнопка "Добавить к расчёту" активна только при валидной текущей форме
 * - Навигация происходит через react-router-dom с передачей данных в state
 * - Для сброса формы используется техника изменения ключа (form state)
 *
 * @warning
 * 1. Компонент зависит от корректной работы дочернего компонента PersonForm
 * 2. Обработка ошибок API должна быть реализована в родительском компоненте
 * 3. UUID генерация может создавать коллизии в очень редких случаях
 * 4. Отсутствует валидация формата файлов (ожидается JSON)
 * 5. Лимит в 10 персон может быть недостаточным для некоторых сценариев
 * 6. Сброс формы через изменение ключа может привести к потере состояния дочерних компонентов
 *
 * @state_management
 * **Локальное состояние:**
 * - persons: массив форм персон
 * - counterDiscovered: счетчик добавленных персон
 * - form: булевый ключ для принудительного сброса формы
 *
 * **Вычисляемые значения:**
 * - counterFiles: общее количество загруженных файлов
 * - isFormValid: общая валидность всей формы
 *
 * @validation_logic
 * Форма считается валидной если:
 * 1. completionsDate не пустая строка
 * 2. Для каждой персоны:
 *    - nameValid = true
 *    - previousFileValid = true
 *    - currentFileValid = true
 *
 * @api_integration
 * **Процесс отправки:**
 * 1. Собирает все валидные файлы из всех персон
 * 2. Создает объект IuploadAssessment с request_id
 * 3. Вызывает exchangeWithServer для отправки на бэкенд
 * 4. Обрабатывает успешный ответ и ошибки
 * 5. Навигация на соответствующую страницу результатов
 *
 * @navigation_logic
 * - 2 файла (1 человек): навигация на /result
 * - 4+ файлов (2+ человек): навигация на /result_group
 * - В state передается результат расчета и дата завершения
 *
 * @accessibility
 * - Кнопка помощи имеет alt-текст "Кнопка подсказки"
 * - Кнопки добавления/удаления имеют визуальные индикаторы состояния
 * - Форма использует семантический тег <form> для навигации с клавиатуры
 * - Disabled состояния кнопок предотвращают невалидные действия
 * - Рекомендуется добавить aria-live регионы для динамических счетчиков
 *
 * @dependencies
 * - PersonForm: дочерний компонент формы для отдельной персоны
 * - uuid: генерация уникальных идентификаторов
 * - react-router-dom: навигация между страницами
 * - exchangeWithServer: API интеграция для отправки данных
 *
 * @see PersonForm - Компонент формы отдельной персоны
 * @see exchangeWithServer - Функция взаимодействия с API
 * @see MainBlockForm.module.css - Стили компонента
 *
 * @todo
 * - Добавить валидацию формата файлов (JSON) с понятными сообщениями об ошибках
 * - Реализовать drag-and-drop для загрузки файлов
 * - Добавить превью загруженных файлов с возможностью удаления
 * - Реализовать пакетную загрузку файлов (zip архив)
 * - Добавить сохранение черновика формы в localStorage
 * - Реализовать импорт данных из CSV/Excel
 * - Добавить прогресс-бар для загрузки файлов
 * - Реализовать отмену отправки формы (AbortController)
 * - Добавить подтверждение при удалении персоны
 * - Поддержка темной/светлой темы
 * - Добавить анимации добавления/удаления персон
 * - Реализовать сортировку персон по имени или дате добавления
 * - Добавить поиск/фильтрацию по списку персон при большом количестве
 * - Реализовать экспорт списка персон в CSV
 * - Добавить валидацию размера файлов
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Управление сложной формой с динамическим количеством полей
 * 2. Обеспечение удобного интерфейса для групповой диагностики
 * 3. Визуальная обратная связь о состоянии заполнения формы
 * 4. Интеграция с системой навигации приложения
 * 5. Обработка и отображение ошибок загрузки
 * 6. Предотвращение ошибок пользователя через валидацию
 *
 * @ux_considerations
 * 1. Кнопка "Добавить к расчёту" активна только при валидной текущей форме
 * 2. Новые персоны добавляются в начало списка для удобства заполнения
 * 3. Счетчики предоставляют быстрый обзор состояния формы
 * 4. Кнопка помощи всегда доступна для получения инструкций
 * 5. Визуальные индикаторы disabled состояний помогают понять требования
 */

export const MainBlockForm = ({
  completionsDate,
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
    const isCompletionsDataValid = completionsDate.trim().length > 0;
    return (
      isCompletionsDataValid &&
      persons.every(
        person =>
          person.nameValid &&
          person.previousFileValid &&
          person.currentFileValid
      )
    );
  }, [persons, completionsDate]);

  // Самбит формы
  const resetForm = () => {
    //Список объектов для отправкм
    //console.log(persons);
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
        resetForm();
        if (data.files && data.files?.length > 2) {
          navigate('/result_group', { state: { result, completionsDate } });
        }
        if (data.files && data.files?.length === 2) {
          navigate('/result', { state: { result, completionsDate } });
        }
      })
      .catch(err => {
        openLoader();
        openErrorPopup(err.message);
      });
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
