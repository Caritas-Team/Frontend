import React, { useEffect, useRef, useState } from 'react';
import styles from './GroupDescription.module.css';
import photoImgSrc from './assets/photo.svg';
import editImgSrc from './assets/edit.svg';
import clearImgSrc from './assets/clear.svg';
import reportImgSrc from '../../../../assets/report.svg';
import { MAX_FILE_SIZE } from './constants';

export type TGroupItem = {
  name: string;
  date: string;
  age: string;
};

export type TGroupDescription = {
  className?: string;
  data: TGroupItem[];
  photoUrl: string;
  onChangePhotoUrl: (url: string) => void;
  groupName: string;
  onChangeGroupName: (groupName: string) => void;
};

/**
 * Компонент "Описание группы" для управления информацией о группе пользователей
 *
 * Предоставляет интерфейс для редактирования названия группы, загрузки фотографии
 * и отображения табличных данных о участниках группы.
 *
 * @component
 * @example
 * // Пример использования
 * const [photoUrl, setPhotoUrl] = useState('');
 * const [groupName, setGroupName] = useState('Моя группа');
 *
 * const data = [
 *   { name: 'Иван Иванов', date: '01.01.2020', age: '25 лет' },
 *   { name: 'Мария Петрова', date: '15.03.2019', age: '30 лет' }
 * ];
 *
 * <GroupDescription
 *   data={data}
 *   photoUrl={photoUrl}
 *   onChangePhotoUrl={setPhotoUrl}
 *   groupName={groupName}
 *   onChangeGroupName={setGroupName}
 * />
 *
 * @typedef {Object} TGroupItem
 * @property {string} name - Имя участника группы
 * @property {string} date - Дата в формате строки (например, "01.01.2020")
 * @property {string} age - Возраст или другой дополнительный параметр
 *
 * @typedef {Object} TGroupDescription
 * @property {string} [className] - Дополнительные CSS-классы для контейнера
 * @property {TGroupItem[]} data - Массив данных об участниках группы
 * @property {string} photoUrl - URL текущей фотографии группы
 * @property {(url: string) => void} onChangePhotoUrl - Callback при изменении фотографии
 * @property {string} groupName - Название группы
 * @property {(groupName: string) => void} onChangeGroupName - Callback при изменении названия группы
 *
 * @param {TGroupDescription} props - Пропсы компонента
 * @param {string} [props.className] - Дополнительный CSS-класс для стилизации
 * @param {TGroupItem[]} props.data - Данные участников группы для отображения в таблице
 * @param {string} props.photoUrl - URL текущего изображения группы
 * @param {(url: string) => void} props.onChangePhotoUrl - Функция обновления URL фотографии
 * @param {string} props.groupName - Текущее название группы
 * @param {(groupName: string) => void} props.onChangeGroupName - Функция обновления названия группы
 *
 * @returns {JSX.Element} Возвращает секцию с формой управления данными группы
 *
 * @description
 * Компонент состоит из двух основных секций:
 * 1. Левая часть: Название группы и таблица данных участников
 * 2. Правая часть: Загрузка и отображение фотографии группы
 *
 * @features
 * #### Управление названием группы:
 * - Текстовое поле ввода с максимальной длиной 150 символов
 * - Кнопка очистки поля (крестик) при заполненном названии
 * - Кнопка редактирования (карандаш) при пустом названии
 * - Автоматический фокус на поле при клике на кнопку редактирования
 *
 * #### Таблица участников:
 * - Отображает данные в виде двухколоночной сетки
 * - Левая колонка: имена участников
 * - Правая колонка: даты и возраст
 *
 * #### Управление фотографией:
 * - Предпросмотр текущей фотографии
 * - Кнопка для выбора файла с компьютера
 * - Валидация загружаемых файлов
 * - Отображение ошибок загрузки
 *
 * @validation
 * При загрузке фотографии выполняется проверка:
 * 1. Только файлы изображений (MIME type начинается с 'image/')
 * 2. Максимальный размер файла: {@link MAX_FILE_SIZE} (5 МБ)
 * 3. Корректность создания Object URL
 *
 * @constants
 * - `MAX_FILE_SIZE`: Максимальный размер загружаемого файла (5 МБ)
 *
 * @hooks
 * - `useRef`: Для ссылок на DOM-элементы и хранения текущего Object URL
 * - `useState`: Для состояния ошибки загрузки и статуса заполнения названия
 * - `useEffect`: Для очистки Object URL при размонтировании и синхронизации состояния
 *
 * @cleanup
 * При размонтировании компонента автоматически освобождает Object URL
 * для предотвращения утечек памяти
 *
 * @error-handling
 * Отображает ошибки загрузки с иконкой предупреждения:
 * - "Только изображения!" - при попытке загрузить не-изображение
 * - "Файл слишком большой (макс. 5 МБ)" - при превышении размера
 * - "Не удалось обработать изображение..." - при ошибке создания URL
 *
 * @accessibility
 * - Кнопки имеют aria-label для скринридеров
 * - Поле ввода имеет placeholder для подсказки
 *
 * @assets
 * Используемые иконки:
 * - photoImgSrc: фотоаппарат (загрузка фото)
 * - editImgSrc: карандаш (редактирование)
 * - clearImgSrc: крестик (очистка)
 * - reportImgSrc: восклицательный знак (ошибка)
 *
 * @note Формат даты отображается как есть, без дополнительной обработки
 * @note Возраст участников отображается во второй колонке таблицы
 */

export const GroupDescription: React.FC<TGroupDescription> = ({
  className,
  data,
  photoUrl,
  onChangePhotoUrl,
  groupName,
  onChangeGroupName,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const groupInputRef = useRef<HTMLInputElement>(null);
  const currentUrlRef = useRef<string | null>(null);

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isGroupNameFilled, setIsGroupNameFilled] = useState(!!groupName);

  useEffect(() => {
    setIsGroupNameFilled(!!groupName);
  }, [groupName]);

  useEffect(() => {
    return () => {
      if (currentUrlRef.current) {
        URL.revokeObjectURL(currentUrlRef.current);
        currentUrlRef.current = null;
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    if (!file.type.startsWith('image/')) {
      setUploadError('Только изображения!');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadError('Файл слишком большой (макс. 5 МБ)');
      return;
    }

    if (currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current);
      currentUrlRef.current = null;
    }

    try {
      const objectUrl = URL.createObjectURL(file);
      currentUrlRef.current = objectUrl;
      onChangePhotoUrl(objectUrl);
    } catch (error) {
      void error;
      setUploadError(
        'Не удалось обработать изображение. Попробуйте другой файл'
      );
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleChangeGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeGroupName(e.target.value);
  };

  const handleClearGroupName = () => {
    onChangeGroupName('');
    setIsGroupNameFilled(false);
    groupInputRef.current?.focus();
  };

  const handleFocusInput = () => {
    groupInputRef.current?.focus();
  };

  return (
    <section className={`${styles.section} ${className ?? ''}`}>
      <div className={styles.content}>
        <div className={styles.data}>
          <div className={styles.textInput}>
            <input
              ref={groupInputRef}
              type="text"
              maxLength={150}
              value={groupName}
              placeholder="Введите название группы"
              onChange={handleChangeGroupName}
            />
            {isGroupNameFilled ? (
              <button
                type="button"
                className={styles.inputButton}
                onClick={handleClearGroupName}
                aria-label="Очистить название группы"
              >
                <img src={clearImgSrc} alt="Значок крестик" />
              </button>
            ) : (
              <button
                type="button"
                className={styles.inputButton}
                aria-label="Ввести название группы"
                onClick={handleFocusInput}
              >
                <img src={editImgSrc} alt="Значок ручки" />
              </button>
            )}
          </div>

          <div className={styles.table}>
            {data.map((row, index) => (
              <React.Fragment key={index}>
                <div className={styles.cellName}>{row.name}</div>
                <div className={styles.cellAge}>{`${row.date}`}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className={styles.photo}>
          <div className={styles.photoContainer}>
            <img
              className={styles.photoPreview}
              src={photoUrl}
              alt="Фото группы"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
              id="fileInput"
            />
            <button
              className={styles.imageButton}
              onClick={triggerFileInput}
              aria-label="Загрузить фото группы"
            >
              <img src={photoImgSrc} alt="Иконка фотоаппарата" />
            </button>
          </div>
          {uploadError && (
            <div className={styles.errorMessage}>
              <img src={reportImgSrc} alt="Лого ошибки" />
              {uploadError}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
