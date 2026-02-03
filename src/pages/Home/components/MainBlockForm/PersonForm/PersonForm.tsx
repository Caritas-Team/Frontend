import { InputFile } from '../InputFile/index';
import { InputFullName } from '../InputFullName/index';
import type { PersonFormData } from '../MainBlockForm';
import { useMemo } from 'react'; // Убрали useEffect, useRef
import clossButtom from '../../../../../assets/closeButton.svg';
import styles from '../MainBlockForm.module.css';

/**
 * Тип пропсов для компонента PersonForm
 * @typedef {Object} PersonFormProps
 * @property {string} id - Уникальный идентификатор формы персоны
 * @property {() => void} [onRemove] - Callback для удаления формы (опционально)
 * @property {(id: string, updates: Partial<PersonFormData>) => void} onUpdate - Callback для обновления данных формы
 * @property {PersonFormData} formData - Текущие данные формы
 */

type PersonFormProps = {
  id: string;
  onRemove?: () => void;
  onUpdate: (id: string, updates: Partial<PersonFormData>) => void;
  formData: PersonFormData;
};

/**
 * Компонент формы для ввода данных одного обследуемого
 *
 * @component PersonForm
 * @description
 * Индивидуальная форма для сбора данных по одному человеку в системе диагностики.
 * Объединяет поле ввода ФИО и два поля загрузки файлов (предыдущий и текущий результаты).
 * Предоставляет визуальную обратную связь о состоянии заполнения формы и возможность удаления.
 *
 * **Структура формы:**
 * 1. Поле ввода ФИО (обязательное)
 * 2. Поле загрузки файла предыдущего результата диагностики (обязательное)
 * 3. Поле загрузки файла текущего результата диагностики (обязательное)
 * 4. Кнопка удаления формы (если разрешено родительским компонентом)
 *
 * **Визуальная обратная связь:**
 * - При полном заполнении всех полей форма подсвечивается активным стилем
 * - Кнопка удаления меняет внешний вид в зависимости от активности формы
 * - Поля отображают ошибки валидации в реальном времени
 *
 * @param {PersonFormProps} props - Свойства компонента
 * @returns {JSX.Element} Форма для ввода данных обследуемого
 *
 * @example
 * // Базовое использование в родительском компоненте
 * const ParentForm = () => {
 *   const [persons, setPersons] = useState<PersonFormData[]>([...]);
 *
 *   const handleUpdate = (id: string, updates: Partial<PersonFormData>) => {
 *     setPersons(prev =>
 *       prev.map(person =>
 *         person.id === id ? { ...person, ...updates } : person
 *       )
 *     );
 *   };
 *
 *   const handleRemove = (id: string) => {
 *     setPersons(prev => prev.filter(person => person.id !== id));
 *   };
 *
 *   return (
 *     <div>
 *       {persons.map(person => (
 *         <PersonForm
 *           key={person.id}
 *           id={person.id}
 *           formData={person}
 *           onUpdate={handleUpdate}
 *           onRemove={() => handleRemove(person.id)}
 *         />
 *       ))}
 *     </div>
 *   );
 * };
 *
 * @example
 * // Использование с одним обязательным полем
 * const SinglePersonForm = () => {
 *   const [personData, setPersonData] = useState<PersonFormData>({
 *     id: '1',
 *     name: '',
 *     nameValid: false,
 *     previousFileValid: false,
 *     previouFile: null,
 *     currentFileValid: false,
 *     currentFile: null
 *   });
 *
 *   return (
 *     <PersonForm
 *       id={personData.id}
 *       formData={personData}
 *       onUpdate={(id, updates) =>
 *         setPersonData(prev => ({ ...prev, ...updates }))
 *       }
 *       // onRemove не передаем - форма обязательная
 *     />
 *   );
 * };
 *
 * @note
 * - Кнопка удаления отображается только если передан пропс onRemove
 * - Состояние активности формы вычисляется через useMemo на основе валидности всех полей
 * - Каждое поле формы управляет своим состоянием валидации через колбэки
 * - Обновление данных происходит через частичное обновление (Partial<PersonFormData>)
 * - CSS-классы меняются динамически в зависимости от состояния формы
 * - Иконка кнопки удаления использует SVG из статических ассетов
 *
 * @warning
 * 1. Компонент зависит от корректной работы дочерних компонентов InputFile и InputFullName
 * 2. Состояние активности формы может не обновляться при внешних изменениях formData
 * 3. Отсутствует защита от повторных кликов по кнопке удаления
 * 4. Нет подтверждения при удалении формы (может привести к потере данных)
 * 5. Визуальные стили активности применяются ко всему контейнеру, а не к отдельным полям
 * 6. Компонент не поддерживает режим "только для чтения"
 *
 * @accessibility
 * - Кнопка удаления имеет alt-текст "удалить форму"
 * - Форма имеет семантическую структуру с четкой визуальной иерархией
 * - Доступность отдельных полей обеспечивается дочерними компонентами
 * - Динамические CSS-классы могут не передавать информацию для скринридеров
 * - Рекомендуется добавить aria-label для всей формы с номером или идентификатором
 *
 * @state_management
 * **Получаемые данные (props):**
 * - formData: текущие данные формы
 *
 * **Вычисляемые значения:**
 * - activForm: флаг полной валидности формы (useMemo)
 * - containerClassName: динамические CSS-классы контейнера
 * - buttonClassName: динамические CSS-классы кнопки удаления
 *
 * **Колбэки обработки изменений:**
 * - handleNameChange: обработка изменения имени
 * - handlePreviousFileChange: обработка изменения файла предыдущего результата
 * - handleCurrentFileChange: обработка изменения файла текущего результата
 *
 * @validation_logic
 * Форма считается активной (валидной) когда все три условия выполнены:
 * 1. formData.nameValid === true (имя валидно)
 * 2. formData.previousFileValid === true (файл предыдущего результата валиден)
 * 3. formData.currentFileValid === true (файл текущего результата валиден)
 *
 * @layout
 * Структура компонента:
 * ```
 * <div class="speakerCalculatorGroupContainer">
 *   {onRemove && (
 *     <button class="buttonClossForm [buttonClossFormActiv]">
 *       <img src={clossButtom} alt="удалить форму" />
 *     </button>
 *   )}
 *   <div class="formSpeakerCalculatorGroupsContainer [groupContainerActiv]">
 *     <InputFullName ... />
 *     <InputFile label="Предыдущий результат" ... />
 *     <InputFile label="Текущий результат" ... />
 *   </div>
 * </div>
 * ```
 *
 * @css_classes
 * Основные CSS-классы (из MainBlockForm.module.css):
 * - .speakerCalculatorGroupContainer - Основной контейнер формы
 * - .buttonClossForm - Кнопка удаления формы (базовый стиль)
 * - .buttonClossFormActiv - Модификатор активной кнопки удаления
 * - .buttonClossFormIcon - Иконка кнопки удаления
 * - .formSpeakerCalculatorGroupsContainer - Контейнер полей формы
 * - .groupContainerActiv - Модификатор активного контейнера формы
 *
 * @dependencies
 * - InputFile: компонент загрузки файлов с валидацией
 * - InputFullName: компонент ввода ФИО с валидацией
 * - PersonFormData: тип данных формы (импортируется из родителя)
 *
 * @see InputFile - Компонент загрузки файлов
 * @see InputFullName - Компонент ввода ФИО
 * @see clossButtom.svg - Иконка кнопки удаления
 * @see MainBlockForm.module.css - Стили компонента
 *
 * @todo
 * - Добавить подтверждение при удалении формы (модальное окно)
 * - Реализовать режим "только для чтения" для просмотра данных
 * - Добавить нумерацию форм при отображении нескольких персон
 * - Реализовать drag-and-drop для перестановки форм
 * - Добавить копирование данных из одной формы в другую
 * - Реализовать сохранение черновика формы в localStorage
 * - Добавить подсказки по заполнению полей (tooltip)
 * - Реализовать валидацию уникальности имени в рамках группы
 * - Поддержка темной/светлой темы
 * - Добавить анимацию добавления/удаления формы
 * - Реализовать свертывание/развертывание формы для экономии места
 * - Добавить индикатор прогресса заполнения (прогресс-бар)
 * - Реализовать экспорт данных отдельной формы (JSON)
 * - Добавить возможность отметки "основной" или "контрольный" обследуемый
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Предоставляет структурированную форму для сбора данных по обследуемому
 * 2. Обеспечивает визуальную обратную связь о состоянии заполнения
 * 3. Позволяет гибко управлять несколькими формами через родительский компонент
 * 4. Интегрирует специализированные компоненты ввода с единым стилем
 * 5. Поддерживает сценарий как одиночного, так и группового заполнения
 * 6. Упрощает UX через интуитивное удаление ненужных форм
 *
 * @ux_considerations
 * 1. Визуальное выделение активной формы помогает быстро оценить готовность данных
 * 2. Кнопка удаления всегда видна, но меняет стиль в зависимости от состояния
 * 3. Поля расположены в логическом порядке (имя → предыдущий результат → текущий результат)
 * 4. Единый стиль всех форм создает консистентный интерфейс
 * 5. Отсутствие кнопки удаления у первой формы предотвращает случайную потерю всех данных
 * 6. Динамическая валидация помогает исправлять ошибки по мере ввода
 */

export const PersonForm = ({
  id,
  onRemove,
  onUpdate,
  formData,
}: PersonFormProps) => {
  // Определяем активна ли форма
  const activForm = useMemo(() => {
    return (
      formData.nameValid &&
      formData.previousFileValid &&
      formData.currentFileValid
    );
  }, [
    formData.nameValid,
    formData.previousFileValid,
    formData.currentFileValid,
  ]);

  const handleNameChange = (isValid: boolean, name?: string) => {
    onUpdate(id, { name, nameValid: isValid });
  };

  const handlePreviousFileChange = (
    isValid: boolean,
    previouFile?: File | null
  ) => {
    onUpdate(id, { previousFileValid: isValid, previouFile });
  };

  const handleCurrentFileChange = (
    isValid: boolean,
    currentFile?: File | null
  ) => {
    onUpdate(id, { currentFileValid: isValid, currentFile });
  };

  const containerClassName = `${styles.formSpeakerCalculatorGroupsContainer} ${activForm ? styles.groupContainerActiv : ''}`;
  const buttonClassName = `${styles.buttonClossForm} ${activForm ? styles.buttonClossFormActiv : ''}`;

  return (
    <div className={styles.speakerCalculatorGroupContainer}>
      {onRemove && (
        <button className={buttonClassName} onClick={onRemove} type="button">
          <img
            className={styles.buttonClossFormIcon}
            src={clossButtom}
            alt="удалить форму"
          />
        </button>
      )}
      <div className={containerClassName}>
        <InputFullName
          initialName={formData.name}
          onValidityChange={handleNameChange}
        />
        <InputFile
          label="Предыдущий результат"
          onValidityChange={handlePreviousFileChange}
        />
        <InputFile
          label="Текущий результат"
          onValidityChange={handleCurrentFileChange}
        />
      </div>
    </div>
  );
};
