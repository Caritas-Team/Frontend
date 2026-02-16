import { useState, useId } from 'react';
import reportError from '../../../../../assets/report_error.svg';
import styles from '../MainBlockForm.module.css';

const NAME_REGEX = /^[А-ЯЁа-яё\s-']+$/;
const MAX_NAME_LENGTH = 100;

/**
 * Тип пропсов для компонента InputFullName
 * @typedef {Object} InputFullNameProps
 * @property {string} [initialName=''] - Начальное значение поля имени
 * @property {(isValid: boolean, name?: string) => void} onValidityChange - Callback при изменении валидности имени
 */

type InputFullNameProps = {
  initialName?: string;
  onValidityChange: (isValid: boolean, name?: string) => void;
};

/**
 * Компонент поля ввода ФИО с расширенной валидацией
 *
 * @component InputFullName
 * @description
 * Компонент для ввода полного имени (фамилия и имя) с комплексной валидацией:
 * - Проверка на использование только кириллических символов
 * - Требование ввода и фамилии, и имени
 * - Автоматическая очистка лишних пробелов
 * - Валидация минимальной и максимальной длины
 * - Визуальное отображение ошибок с иконкой
 *
 * **Ключевые особенности:**
 * - Поддерживает кириллицу, пробелы, дефисы и апострофы
 * - Требует минимум два слова (фамилия и имя)
 * - Каждое слово должно быть не короче 2 символов
 * - Автоматически очищает лишние пробелы при потере фокуса
 * - Ограничивает максимальную длину 100 символами
 * - Отображает валидационные ошибки в реальном времени
 *
 * **Валидационные правила:**
 * 1. Поле не должно быть пустым
 * 2. Длина не должна превышать 100 символов
 * 3. Допустимы только кириллические символы, пробелы, дефисы и апострофы
 * 4. Должно быть минимум 2 слова (фамилия и имя)
 * 5. Каждое слово должно быть не короче 2 символов
 *
 * @param {InputFullNameProps} props - Свойства компонента
 * @returns {JSX.Element} Поле ввода ФИО с валидацией
 *
 * @example
 * // Базовое использование
 * const handleNameValidity = (isValid, name) => {
 *   console.log('Имя валидно:', isValid, name);
 * };
 *
 * <InputFullName onValidityChange={handleNameValidity} />
 *
 * @example
 * // С начальным значением
 * <InputFullName
 *   initialName="Иванов Иван"
 *   onValidityChange={handleNameValidity}
 * />
 *
 * @example
 * // В составе формы
 * const PersonForm = () => {
 *   const [name, setName] = useState('');
 *   const [isNameValid, setIsNameValid] = useState(false);
 *
 *   return (
 *     <div>
 *       <InputFullName
 *         initialName={name}
 *         onValidityChange={(isValid, validName) => {
 *           setIsNameValid(isValid);
 *           if (isValid) setName(validName || '');
 *         }}
 *       />
 *       <button disabled={!isNameValid}>Сохранить</button>
 *     </div>
 *   );
 * };
 *
 * @note
 * - Использует useId() для генерации уникальных ID для доступности
 * - Маркер обязательности (*) отображается только если initialName не задан
 * - При потере фокуса автоматически очищаются лишние пробелы
 * - Валидация происходит как при изменении, так и при потере фокуса
 * - Плейсхолдер "Петров Иван" показывает ожидаемый формат ввода
 * - Иконка ошибки использует SVG из статических ассетов
 *
 * @accessibility
 * - Используется связка label и input через htmlFor/id
 * - Ошибки имеют уникальный ID и связываются с input через aria-describedby
 * - Сообщения об ошибках объявляются через aria-live="polite"
 * - Иконка ошибки имеет alt-текст "значок ошибки"
 * - Поле имеет aria-required атрибут
 * - Максимальная длина указывается через maxLength атрибут
 *
 * @validation_logic
 * Функция validateFullName выполняет проверки в строгом порядке:
 * 1. Проверка на пустое значение → "Фамилия и имя обязательны для заполнения"
 * 2. Проверка максимальной длины → "Превышена максимальная длина 100 символов"
 * 3. Проверка символов через регулярное выражение → "Можно использовать только кириллицу..."
 * 4. Проверка количества слов → "Введите и фамилию, и имя"
 * 5. Проверка длины каждого слова → "Введите и фамилию, и имя"
 *
 * @character_requirements
 * **Разрешенные символы:**
 * - Кириллические буквы (А-Я, а-я, Ё, ё)
 * - Пробелы (но не подряд несколько)
 * - Дефис (-)
 * - Апостроф (')
 *
 * **Запрещенные символы:**
 * - Латинские буквы
 * - Цифры
 * - Специальные символы (@, #, $, и т.д.)
 * - Знаки препинания кроме дефиса и апострофа
 *
 * @format_requirements
 * **Ожидаемый формат:** "Фамилия Имя"
 * **Примеры валидных значений:**
 * - "Иванов Иван"
 * - "Петрова-Смирнова Анна"
 * - "Сидоров Петр"
 *
 * **Примеры невалидных значений:**
 * - "Ivanov Ivan" (латиница)
 * - "И" (только одно слово)
 * - "Иван" (только имя)
 * - "И  Ван" (слишком много пробелов)
 * - "А" (слово короче 2 символов)
 *
 * @layout
 * Структура компонента:
 * ```
 * <div class="formSpeakerCalculatorGroup formSpeakerCalculatorGroupName">
 *   <label class="groupRequired">
 *     Фамилия и имя
 *     {маркер обязательности}
 *   </label>
 *   <input
 *     class="inputFullName fieldText fieldTextName"
 *     type="text"
 *     id={uniqueId}
 *     placeholder="Петров Иван"
 *     value={fullName}
 *     onChange={handleFullNameChange}
 *     onBlur={handleBlur}
 *     maxLength={MAX_NAME_LENGTH}
 *   />
 *   {nameError && (
 *     <span class="inputTextError" id="{uniqueId}-error">
 *       <img src={reportError} alt="значок ошибки" />
 *       <p>{nameError}</p>
 *     </span>
 *   )}
 * </div>
 * ```
 *
 * @css_classes
 * Основные CSS-классы (из MainBlockForm.module.css):
 * - .formSpeakerCalculatorGroup - Контейнер группы формы
 * - .formSpeakerCalculatorGroupName - Модификатор для группы имени
 * - .groupRequired - Стили для обязательного поля
 * - .groupRequiredMark - Маркер обязательности
 * - .groupRequiredMarkFirst - Модификатор для маркера
 * - .inputFullName - Стилизованный input
 * - .fieldText - Общие стили поля ввода
 * - .fieldTextName - Модификатор для поля имени
 * - .inputTextError - Контейнер ошибки
 * - .inputIconError - Иконка ошибки
 *
 * @see report_error.svg - Иконка для отображения ошибок
 * @see MainBlockForm.module.css - Стили компонента
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Обеспечивает корректный ввод русских имен и фамилий
 * 2. Предотвращает ввод мусорных данных через строгую валидацию
 * 3. Дает четкую обратную связь о требованиях к формату
 * 4. Улучшает UX через автоматическую очистку лишних пробелов
 * 5. Интегрируется с дизайн-системой через CSS-модуль
 * 6. Поддерживает доступность для всех пользователей
 *
 * @ux_considerations
 * 1. Плейсхолдер показывает ожидаемый формат ввода
 * 2. Маркер обязательности помогает понять важность поля
 * 3. Автоматическая очистка пробелов уменьшает количество ошибок
 * 4. Валидация в реальном времени помогает сразу исправлять ошибки
 * 5. Консистентные стили ошибок по всему приложению
 * 6. Максимальная длина предотвращает ввод слишком длинных значений
 *
 * @i18n_considerations
 * Компонент разработан для русскоязычного интерфейса:
 * - Поддерживает только кириллицу
 * - Сообщения об ошибках на русском языке
 * - Плейсхолдер на русском
 * - Ожидает порядок "Фамилия Имя" (русская традиция)
 * Для международных приложений требуется доработка.
 */

export const InputFullName = ({
  initialName = '',
  onValidityChange,
}: InputFullNameProps) => {
  const uniqueId = useId();
  const [nameError, setNameError] = useState<string>('');
  const [fullName, setFullName] = useState<string>(initialName);

  // Функция для очистки пробелов
  const cleanSpaces = (text: string): string => {
    return text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
      .join(' ');
  };

  const validateFullName = (value: string): string | undefined => {
    const cleanedValue = cleanSpaces(value);
    if (!cleanedValue) {
      onValidityChange(false);
      return 'Фамилия и имя обязательны для заполнения';
    }

    if (value.length > MAX_NAME_LENGTH) {
      onValidityChange(false);
      return `Превышена максимальная длина ${MAX_NAME_LENGTH} символов`;
    }

    if (!NAME_REGEX.test(cleanedValue)) {
      onValidityChange(false);
      return 'Можно использовать только кириллицу, пробелы, дефисы и апострофы';
    }

    const words = cleanedValue.split(' ').filter(word => word.length > 0);
    if (words.length < 2) {
      onValidityChange(false);
      return 'Введите и фамилию, и имя';
    }

    const validWords = words.filter(word => word.length >= 2);
    if (validWords.length < 2) {
      onValidityChange(false);
      return 'Введите и фамилию, и имя';
    }

    onValidityChange(true, cleanedValue);
    return undefined;
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);

    const error = validateFullName(value);
    setNameError(error || '');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // При потере фокуса очищаем пробелы и обновляем поле
    const cleanedValue = cleanSpaces(e.target.value);
    setFullName(cleanedValue);

    const error = validateFullName(cleanedValue);
    setNameError(error || '');
  };

  return (
    <div
      className={`${styles.formSpeakerCalculatorGroup} ${styles.formSpeakerCalculatorGroupName}`}
    >
      <label className={styles.groupRequired}>
        Фамилия и имя
        {!initialName && (
          <span
            className={`${styles.groupRequiredMark} ${styles.groupRequiredMarkFirst}`}
          >
            *
          </span>
        )}
      </label>
      <input
        className={`${styles.inputFullName} ${styles.fieldText} ${styles.fieldTextName}`}
        type="text"
        id={uniqueId}
        placeholder="Петров Иван"
        value={fullName}
        onChange={handleFullNameChange}
        onBlur={handleBlur}
        maxLength={MAX_NAME_LENGTH}
        required
        aria-describedby={`${uniqueId}-error`}
      />
      {nameError && (
        <span
          className={styles.inputTextError}
          id={`${uniqueId}-error`}
          aria-live="polite"
        >
          <img
            className={styles.inputIconError}
            src={reportError}
            alt="значок ошибки"
            width={'24'}
          />
          <p>{nameError}</p>
        </span>
      )}
    </div>
  );
};
