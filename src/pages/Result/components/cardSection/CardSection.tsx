import React from 'react';
import styles from './CardSection.module.css';

export type TCardSection = {
  className?: string;
  personName: string;
  personId?: string;
  dateOfBirth: string;
  diagnosis: string;
  whereLives: string;
  socialFeatures?: string;
  photo?: string;
};

// /* моковые данные для случая, если особенностей социальной ситуации нет, но есть id обследуемого - как в макете */
// const mockPersonData: TCardSection = {
//   personName: 'Иванов Иван Иванович',
//   personId: 'ID II-1210C',
//   dateOfBirth: '2012-10-21',
//   diagnosis: 'Нарушение речи',
//   whereLives: 'В семье',
// };

// /*  моковые данные для случая с особенностями социальной ситуации, но без id */
// const mockPersonData1: TCardSection = {
//   personName: 'Иван Петров',
//   dateOfBirth: '2020-07-08',
//   diagnosis: 'РАС',
//   whereLives: 'В семье',
//   socialFeatures: 'полная семья, есть старшая сестра',
// };

const calculateAge = (dateString: string) => {
  const today = new Date();
  const date = new Date(dateString);
  const age = today.getFullYear() - date.getFullYear();
  let yearsText = 'лет';
  let count = age % 100;
  if (count >= 5 && count <= 20) {
    yearsText = 'лет';
  } else {
    count = count % 10;
    if (count === 1) {
      yearsText = 'год';
    } else if (count >= 2 && count <= 4) {
      yearsText = 'года';
    }
  }
  const personAge: string = String(age) + ' ' + yearsText;
  return personAge;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
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
          <h2 className={styles.card__name}>{personName}</h2>
          {personId && <p className={styles.card__id}>{personId}</p>}
        </div>
        <div className={styles.card__info} role="list">
          <div className={styles.card__item} role="listitem">
            <p className={`${styles.text} ${styles.title}`}>Дата рождения</p>
            <p
              className={`${styles.text} ${styles.value}`}
            >{`${formatDate(dateOfBirth)}, ${calculateAge(dateOfBirth)}`}</p>
          </div>
          <div className={styles.card__item} role="listitem">
            <p className={`${styles.text} ${styles.title}`}>Диагноз</p>
            <p className={`${styles.text} ${styles.value}`}>{diagnosis}</p>
          </div>
          <div className={styles.card__item} role="listitem">
            <p className={`${styles.text} ${styles.title}`}>Где проживает</p>
            <p className={`${styles.text} ${styles.value}`}>{whereLives}</p>
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
