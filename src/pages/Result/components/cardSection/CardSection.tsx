import React from 'react';
import styles from './CardSection.module.css';
import {
  calculateAge,
  formatDateShort,
  isValidDate,
} from '../../../../lib/utils';

export type TCardSection = {
  className?: string;
  personName?: string;
  personId?: string;
  dateOfBirth?: string;
  diagnosis?: string;
  whereLives?: string;
  socialFeatures?: string;
  photo?: string;
};

export const CardSection: React.FC<TCardSection> = ({
  className,
  personName,
  personId,
  dateOfBirth,
  diagnosis,
  whereLives,
  socialFeatures,
  photo,
}) => {
  return (
    <section
      className={
        className
          ? `${styles.card__section} ${className}`
          : styles.card__section
      }
      aria-label={`Карточка обследуемого ${personName}`}
    >
      <div className={styles.card__content}>
        <div className={styles.card__person}>
          <h2 className={styles.card__name}>
            {personName ? personName : 'Имя не указано'}
          </h2>
          {personId && <p className={styles.card__id}>{personId}</p>}
        </div>
        <div className={styles.card__info} role="list">
          <div className={styles.card__item} role="listitem">
            <p className={`${styles.text} ${styles.title}`}>Дата рождения</p>
            <p className={`${styles.text} ${styles.value}`}>
              {dateOfBirth && isValidDate(dateOfBirth)
                ? `${formatDateShort(dateOfBirth)}, ${calculateAge(dateOfBirth)}`
                : 'Не указана'}
            </p>
          </div>
          <div className={styles.card__item} role="listitem">
            <p className={`${styles.text} ${styles.title}`}>Диагноз</p>
            <p className={`${styles.text} ${styles.value}`}>
              {diagnosis || 'Не указан'}
            </p>
          </div>
          <div className={styles.card__item} role="listitem">
            <p className={`${styles.text} ${styles.title}`}>Где проживает</p>
            <p className={`${styles.text} ${styles.value}`}>
              {whereLives || 'Не указано'}
            </p>
          </div>
          <div className={styles.card__item} role="listitem">
            <p className={`${styles.text} ${styles.title}`}>
              Особенности социальной ситуации
            </p>
            <p className={`${styles.text} ${styles.value}`}>
              {socialFeatures || '-'}
            </p>
          </div>
        </div>
        <img
          className={styles.card__image}
          src={photo ? photo : 'src/assets/person-image.svg'}
          alt={
            photo
              ? `фотография обследуемого ${personName}`
              : 'изображение человека (шаблон)'
          }
        />
      </div>
    </section>
  );
};
