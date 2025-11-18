import React, { useEffect, useRef } from 'react';
import styles from './GroupDescription.module.css';
import photoImgSrc from './assets/photo.svg';

export type TGroupItem = {
  name: string;
  date: string;
  age: string;
};

export type TGroupDescription = {
  data: TGroupItem[];
  photoUrl: string;
  onChangePhotoUrl: (url: string) => void;
  groupName: string;
  onChangeGroupName: (groupName: string) => void;
};

export const GroupDescription: React.FC<TGroupDescription> = ({
  data,
  photoUrl,
  onChangePhotoUrl,
  groupName,
  onChangeGroupName,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUrlRef = useRef<string | null>(null);

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

    if (!file.type.startsWith('image/')) {
      alert('Только изображения!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой (макс. 5 МБ)');
      return;
    }

    if (currentUrlRef.current) {
      URL.revokeObjectURL(currentUrlRef.current);
      currentUrlRef.current = null;
    }

    const objectUrl = URL.createObjectURL(file);
    currentUrlRef.current = objectUrl;
    onChangePhotoUrl(objectUrl);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleChangeGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeGroupName(e.target.value);
  };

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.data}>
          <div className={styles.textInput}>
            <input
              type="text"
              value={groupName}
              placeholder="Введите название группы"
              onChange={handleChangeGroupName}
            />
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
            <img src={photoImgSrc} alt="Иконка фотоаппрата" />
          </button>
        </div>
      </div>
    </section>
  );
};
