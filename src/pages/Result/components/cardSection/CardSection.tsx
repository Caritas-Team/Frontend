import React from 'react';
import styles from './CardSection.module.css';
import { formatDateShort, isValidDate } from '../../../../lib/utils';

/**
 * Тип пропсов для компонента CardSection
 * @typedef {Object} TCardSection
 * @property {string} [className] - Дополнительные CSS-классы для секции
 * @property {string} [personName] - ФИО обследуемого
 * @property {string} [personId] - Уникальный идентификатор обследуемого
 * @property {string} [dateOfBirth] - Дата рождения в формате YYYY-MM-DD
 * @property {string} [diagnosis] - Медицинский диагноз
 * @property {string} [whereLives] - Место проживания
 * @property {string} [socialFeatures] - Особенности социальной ситуации
 * @property {string} [photo] - URL или путь к фотографии обследуемого
 */

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

/**
 * Карточка обследуемого с персональной и медицинской информацией
 *
 * @component CardSection
 * @description
 * Компонент для отображения карточки обследуемого с ключевой персональной,
 * медицинской и социальной информацией. Используется на страницах результатов
 * диагностики для предоставления контекста о человеке, по которому проводился анализ.
 *
 * **Структура карточки:**
 * 1. Заголовок с ФИО и идентификатором (если есть)
 * 2. Список информационных полей:
 *    - Дата рождения (с валидацией и форматированием)
 *    - Диагноз
 *    - Место проживания
 *    - Особенности социальной ситуации
 * 3. Фотография обследуемого или заглушка
 *
 * **Особенности форматирования:**
 * - Дата рождения валидируется и форматируется в русский формат (DD.MM.YYYY)
 * - Все поля имеют значения по умолчанию при отсутствии данных
 * - Фотография использует заглушку при отсутствии URL
 * - Имя отображается как "Имя не указано" если не передано
 *
 * @param {TCardSection} props - Свойства компонента
 * @returns {JSX.Element} Карточка обследуемого с информацией и фотографией
 *
 * @example
 * // Базовая карточка с минимальными данными
 * <CardSection
 *   personName="Иванов Иван Иванович"
 *   dateOfBirth="1990-05-15"
 *   diagnosis="F84.0 Детский аутизм"
 * />
 *
 * @example
 * // Полная карточка со всеми данными
 * <CardSection
 *   personName="Петрова Анна Сергеевна"
 *   personId="ID-123456"
 *   dateOfBirth="2015-08-22"
 *   diagnosis="F80.1 Расстройство экспрессивной речи"
 *   whereLives="г. Москва, с родителями"
 *   socialFeatures="Посещает коррекционную школу, занятия с логопедом"
 *   photo="/images/patients/anna.jpg"
 * />
 *
 * @example
 * // Карточка с дополнительными стилями
 * <CardSection
 *   className="highlighted-card"
 *   personName="Сидоров Алексей"
 *   dateOfBirth="2012-03-10"
 *   diagnosis="F90.0 Нарушение активности и внимания"
 * />
 *
 * @example
 * // Несколько карточек в списке
 * const patients = [
 *   { name: 'Иванов Иван', diagnosis: 'Аутизм', birthDate: '2010-01-15' },
 *   { name: 'Петров Петр', diagnosis: 'ЗПР', birthDate: '2011-05-20' }
 * ];
 *
 * return (
 *   <div className="patients-list">
 *     {patients.map((patient, index) => (
 *       <CardSection
 *         key={index}
 *         personName={patient.name}
 *         dateOfBirth={patient.birthDate}
 *         diagnosis={patient.diagnosis}
 *       />
 *     ))}
 *   </div>
 * );
 *
 * @note
 * - Для валидации и форматирования даты рождения используются утилиты isValidDate и formatDateShort
 * - Формат даты на входе: YYYY-MM-DD, на выходе: DD.MM.YYYY
 * - Фотография по умолчанию использует путь 'src/assets/person-image.svg' (возможно, нужно исправить на абсолютный)
 * - Компонент использует семантические ARIA-роли для списка (role="list", role="listitem")
 * - Все текстовые поля имеют fallback значения при отсутствии данных
 *
 * @warning
 * 1. Путь к изображению по умолчанию 'src/assets/person-image.svg' может не работать в собранном приложении
 * 2. Компонент не адаптируется для мобильных устройств (отсутствуют медиа-запросы)
 * 3. Длинный текст в полях может нарушить верстку
 * 4. Фотография имеет фиксированный размер и может искажаться
 * 5. Отсутствует валидация URL фотографии
 * 6. Компонент не поддерживает редактирование данных (только отображение)
 *
 * @accessibility
 * - Секция имеет aria-label с именем обследуемого
 * - Информационные поля оформлены как список с ролями list и listitem
 * - Фотография имеет описательный alt-текст в зависимости от наличия фото
 * - Заголовок использует h2 для правильной иерархии заголовков
 * - Текстовые поля имеют четкое разделение на заголовки и значения через CSS-классы
 * - Для скринридеров можно добавить дополнительные aria-атрибуты для полей
 *
 * @layout
 * Структура компонента:
 * ```
 * <section class="card__section [additional-classes]" aria-label="...">
 *   <div class="card__content">
 *     <div class="card__person">
 *       <h2 class="card__name">{personName}</h2>
 *       {personId && <p class="card__id">{personId}</p>}
 *     </div>
 *
 *     <div class="card__info" role="list">
 *       <div class="card__item" role="listitem">
 *         <p class="text title">Дата рождения</p>
 *         <p class="text value">{formattedDate}</p>
 *       </div>
 *       <!-- остальные 3 поля аналогично -->
 *     </div>
 *
 *     <img class="card__image" src={photo} alt="..." />
 *   </div>
 * </section>
 * ```
 *
 * @dependencies
 * - formatDateShort: утилита для форматирования даты в русский формат
 * - isValidDate: утилита для валидации строки с датой
 *
 * @see formatDateShort - Утилита форматирования даты
 * @see isValidDate - Утилита валидации даты
 * @see CardSection.module.css - Стили компонента
 * @see person-image.svg - Заглушка для фотографии
 *
 * @todo
 * - Добавить адаптивный дизайн для мобильных устройств
 * - Реализовать компонент без фотографии (компактный вариант)
 * - Добавить валидацию и обработку ошибок для URL фотографии
 * - Реализовать ленивую загрузку изображений
 * - Добавить режим редактирования полей карточки
 * - Реализовать экспорт данных карточки (PDF, изображение)
 * - Добавить tooltip для обрезанного длинного текста
 * - Поддержка темной/светлой темы
 * - Добавить анимацию появления карточки
 * - Реализовать возможность скрытия/раскрытия дополнительных полей
 * - Добавить QR-код с идентификатором обследуемого
 * - Реализовать связь с другими разделами (история обследований и т.д.)
 * - Добавить индикатор обязательности полей (если используется в формах)
 * - Поддержка локализации текстовых заголовков полей
 * - Реализовать загрузку фотографии через drag-and-drop
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Консолидирует ключевую информацию об обследуемом в одном месте
 * 2. Предоставляет визуальный контекст через фотографию
 * 3. Упрощает сравнение нескольких обследуемых за счет единого формата
 * 4. Создает профессиональное впечатление от системы диагностики
 * 5. Обеспечивает быстрый доступ к основным данным без навигации
 * 6. Интегрируется с системой валидации и форматирования дат
 *
 * @data_privacy
 * Компонент отображает чувствительные персональные данные:
 * - ФИО
 * - Дата рождения
 * - Медицинский диагноз
 * - Фотография
 *
 * Рекомендуется:
 * 1. Использовать в защищенных разделах приложения
 * 2. Обеспечить авторизацию для доступа к карточкам
 * 3. Маскировать данные при демонстрациях/скриншотах
 * 4. Следовать политике конфиденциальности организации
 *
 * @medical_context
 * Компонент предназначен для использования в медицинских информационных системах:
 * - Диагнозы используют коды МКБ-10 (например, F84.0)
 * - Поля соответствуют стандартным медицинским картам
 * - Может интегрироваться с электронными историями болезни
 * - Поддерживает требования к документации в здравоохранении
 */

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
                ? `${formatDateShort(dateOfBirth)}`
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
