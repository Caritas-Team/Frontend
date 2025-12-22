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
      setUploadError('Файл слишком большой (макс. 5 МБ)');
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
                <div
                  className={styles.cellAge}
                >{`${row.date}, ${row.age}`}</div>
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
