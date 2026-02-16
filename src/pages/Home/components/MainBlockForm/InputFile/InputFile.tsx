import reportError from '../../../../../assets/report_error.svg';
import { useState, useId } from 'react';
import styles from '../MainBlockForm.module.css';

/**
 * Тип пропсов для компонента InputFile
 * @typedef {Object} InputFileProps
 * @property {string} label - Текстовая метка для поля ввода файла
 * @property {(isValid: boolean, file?: File | null) => void} onValidityChange - Callback при изменении валидности файла
 */

type InputFileProps = {
  label: string;
  onValidityChange: (isValid: boolean, file?: File | null) => void;
};

const MAX_SIZE_FILE = 9 * 1024 * 1024;

/**
 * Компонент поля загрузки файла с валидацией формата и размера
 *
 * @component InputFile
 * @description
 * Кастомный компонент для загрузки файлов с расширенной валидацией.
 * Поддерживает загрузку только JSON файлов с ограничением по размеру (9 MB).
 * Предоставляет визуальную обратную связь о состоянии загрузки и ошибках валидации.
 *
 * **Ключевые особенности:**
 * - Валидация типа файла (только application/json)
 * - Валидация размера файла (максимум 9 MB)
 * - Кастомный стилизованный интерфейс вместо нативного input[type="file"]
 * - Отображение имени выбранного файла
 * - Визуальное отображение ошибок с иконкой
 * - Доступность через ARIA-атрибуты
 *
 * **Валидация:**
 * 1. Проверка наличия файла
 * 2. Проверка MIME-типа (application/json)
 * 3. Проверка размера файла (≤ 9 MB)
 *
 * @param {InputFileProps} props - Свойства компонента
 * @returns {JSX.Element} Стилизованное поле загрузки файла с валидацией
 *
 * @example
 * // Базовое использование
 * const handleFileValidity = (isValid, file) => {
 *   if (isValid) {
 *     console.log('Файл валиден:', file.name);
 *   }
 * };
 *
 * <InputFile
 *   label="Файл диагностики"
 *   onValidityChange={handleFileValidity}
 * />
 *
 * @example
 * // Использование в форме
 * const DiagnosticForm = () => {
 *   const [previousFile, setPreviousFile] = useState<File | null>(null);
 *   const [currentFile, setCurrentFile] = useState<File | null>(null);
 *
 *   return (
 *     <form>
 *       <InputFile
 *         label="Предыдущая диагностика"
 *         onValidityChange={(isValid, file) => {
 *           if (isValid) setPreviousFile(file);
 *         }}
 *       />
 *
 *       <InputFile
 *         label="Текущая диагностика"
 *         onValidityChange={(isValid, file) => {
 *           if (isValid) setCurrentFile(file);
 *         }}
 *       />
 *     </form>
 *   );
 * };
 *
 * @example
 * // С интеграцией в родительский компонент
 * const FileUploadSection = () => {
 *   const [files, setFiles] = useState<File[]>([]);
 *
 *   const handleFileChange = (isValid, file) => {
 *     if (isValid && file) {
 *       setFiles(prev => [...prev, file]);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <InputFile
 *         label="Загрузите JSON файл"
 *         onValidityChange={handleFileChange}
 *       />
 *       <div>Загружено файлов: {files.length}</div>
 *     </div>
 *   );
 * };
 *
 * @note
 * - Использует useId() для генерации уникальных ID для связки label и input
 * - Скрывает нативный input и использует кастомную стилизацию через label
 * - Принимает только файлы с расширением .json (accept=".json")
 * - Максимальный размер файла жестко задан константой MAX_SIZE_FILE
 * - Использует SVG иконку для отображения ошибок
 * - Callback onValidityChange вызывается при каждом изменении файла
 *
 * @accessibility
 * - Используется связка label и input через htmlFor/id
 * - Ошибки имеют уникальный ID и связываются с input через aria-describedby
 * - Сообщения об ошибках объявляются через aria-live="polite"
 * - Иконка ошибки имеет alt-текст "значек ошибки"
 * - Нативный input скрыт (hidden), но остается доступным для скринридеров
 * - Кастомный label остается доступным для клика и клавиатурной навигации
 *
 * @validation_logic
 * Функция validateInput выполняет проверки в следующем порядке:
 * 1. Наличие файла: если null → ошибка "Загрузите файл"
 * 2. MIME-тип: если не application/json → ошибка "Можно загружать только json файлы!"
 * 3. Размер файла: если > 9 MB → ошибка "Файл слишком большой. Максимальный размер: 9MB"
 *
 * @layout
 * Структура компонента:
 * ```
 * <div class="formSpeakerCalculatorGroup formSpeakerCalculatorGroupFile">
 *   <label class="groupRequired groupFile">
 *     {label и маркер обязательности}
 *   </label>
 *
 *   <div class="fieldFile [fieldFileError]">
 *     <input type="file" id={uniqueId} hidden />
 *     <label htmlFor={uniqueId} class="fieldText fieldTextFile [fieldTextError]">
 *       {Имя файла или "Выберите файл"}
 *     </label>
 *   </div>
 *
 *   {fileError && (
 *     <span class="inputTextError" id="{uniqueId}-error">
 *       <img src={reportError} alt="значек ошибки" />
 *       <p class="spanTextError">{fileError}</p>
 *     </span>
 *   )}
 * </div>
 * ```
 *
 * @css_classes
 * Основные CSS-классы (из MainBlockForm.module.css):
 * - .formSpeakerCalculatorGroup - Контейнер группы формы
 * - .formSpeakerCalculatorGroupFile - Модификатор для файловой группы
 * - .groupRequired - Стили для обязательного поля
 * - .groupFile - Стили для файловой метки
 * - .fieldFile - Контейнер поля файла
 * - .fieldFileError - Модификатор при ошибке
 * - .inputFile - Скрытый нативный input
 * - .fieldText - Стилизованная метка
 * - .fieldTextFile - Модификатор для файловой метки
 * - .fieldTextError - Модификатор при ошибке
 * - .inputTextError - Контейнер ошибки
 * - .inputIconError - Иконка ошибки
 * - .spanTextError - Текст ошибки
 *
 * @see report_error.svg - Иконка для отображения ошибок
 * @see MainBlockForm.module.css - Стили компонента
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Предоставляет удобный интерфейс загрузки файлов вместо нативного input
 * 2. Обеспечивает защиту от загрузки неверных форматов файлов
 * 3. Предотвращает загрузку слишком больших файлов
 * 4. Дает четкую визуальную обратную связь о состоянии загрузки
 * 5. Интегрируется с дизайн-системой через CSS-модуль
 * 6. Улучшает UX через кастомную стилизацию
 *
 * @ux_considerations
 * 1. Кастомная стилизация создает единообразный вид во всех браузерах
 * 2. Отображение имени файла помогает пользователю убедиться в правильности выбора
 * 3. Ясные сообщения об ошибках помогают быстро исправить проблемы
 * 4. Маркер обязательности (*) указывает на важность поля
 * 5. Консистентные стили ошибок по всему приложению
 *
 * @security
 * Валидация на стороне клиента не заменяет серверную валидацию:
 * - MIME-тип можно подделать
 * - Размер файла нужно проверять на сервере
 * - Содержимое JSON должно валидироваться на сервере
 * - Клиентская валидация нужна для улучшения UX, а не безопасности
 */

export const InputFile = ({ label, onValidityChange }: InputFileProps) => {
  const uniqueId = useId();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');

  const validateInput = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFileError('Загрузите файл');
      onValidityChange(false);
      return;
    }

    if (selectedFile.type !== 'application/json') {
      setFileError('Можно загружать только json файлы!');
      onValidityChange(false);
      return;
    }

    if (selectedFile.size > MAX_SIZE_FILE) {
      setFileError('Файл слишком большой. Максимальный размер: 9MB');
      onValidityChange(false);
      return;
    }

    setFileError('');
    onValidityChange(true, selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      validateInput(selectedFile);
    } else {
      setFile(null);
      setFileError('Загрузите файл');
    }
  };

  return (
    <div
      className={`${styles.formSpeakerCalculatorGroup} ${styles.formSpeakerCalculatorGroupFile}`}
    >
      <label className={`${styles.groupRequired} ${styles.groupFile}`}>
        {!file || fileError !== '' ? (
          <div className={styles.inputTextWithMark}>
            <p className={styles.groupFileLabelText}>{label}</p>
            <span
              className={`${styles.groupRequiredMark} ${styles.groupRequiredMarkFle}`}
            >
              *
            </span>
          </div>
        ) : (
          <p>{label}</p>
        )}
      </label>

      <div
        className={`${styles.fieldFile} ${fileError ? styles.fieldFileError : ''}`}
      >
        <input
          className={styles.inputFile}
          id={uniqueId}
          type="file"
          hidden
          accept=".json"
          required
          onChange={handleFileChange}
          aria-describedby={`${uniqueId}-error`}
        />
        <label
          htmlFor={uniqueId}
          className={`${styles.fieldText} ${styles.fieldTextFile} ${fileError ? styles.fieldTextError : ''}`}
        >
          {file !== null ? (
            <p className={`${styles.inputFileInfo} ${styles.inputFileName}`}>
              {file.name}
            </p>
          ) : (
            <p className={styles.inputFileInfo}>Выберите файл</p>
          )}
        </label>
      </div>
      {fileError && (
        <span
          className={styles.inputTextError}
          id={`${uniqueId}-error`}
          aria-live="polite"
        >
          <img
            className={styles.inputIconError}
            src={reportError}
            alt="значек ошибки"
            width={'24'}
          />
          <p className={styles.spanTextError}>{fileError}</p>
        </span>
      )}
    </div>
  );
};
