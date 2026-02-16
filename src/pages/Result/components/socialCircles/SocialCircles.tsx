import styles from '../socialCircles/SocialCircles.module.css';
import schoolSrc from './icons/school.svg';
import handshakeSrc from './icons/handshake.svg';
import familySrc from './icons/diversity_1.svg';
import familiarSrc from './icons/diversity_3.svg';

export type TSocialCircles = {
  className?: string;
  family?: string;
  friends?: string;
  specialists?: string;
  familiar?: string;
};

/**
 * Компонент "Круги общения" для визуализации социальных связей
 *
 * Отображает четыре категории социального окружения пользователя
 * с иконками и количественными показателями в круглых контейнерах.
 *
 * @component
 * @example
 * // Базовое использование
 * <SocialCircles
 *   family="12"
 *   friends="8"
 *   specialists="3"
 *   familiar="25"
 * />
 *
 * // С дополнительным классом
 * <SocialCircles
 *   className="my-custom-class"
 *   family="12"
 *   friends="5"
 * />
 *
 * @typedef {Object} TSocialCircles
 * @property {string} [className] - Дополнительные CSS-классы для контейнера
 * @property {string} [family] - Количество контактов в категории "Семья"
 * @property {string} [friends] - Количество контактов в категории "Друзья"
 * @property {string} [specialists] - Количество контактов в категории "Специалисты"
 * @property {string} [familiar] - Количество контактов в категории "Знакомые"
 *
 * @param {TSocialCircles} props - Пропсы компонента
 * @param {string} [props.className] - Дополнительный CSS-класс для кастомизации стилей
 * @param {string} [props.family] - Числовое значение для категории "Семья"
 * @param {string} [props.friends] - Числовое значение для категории "Друзья"
 * @param {string} [props.specialists] - Числовое значение для категории "Специалисты"
 * @param {string} [props.familiar] - Числовое значение для категории "Знакомые"
 *
 * @returns {JSX.Element} Возвращает разметку компонента с четырьмя социальными кругами
 *
 * @description
 * Компонент представляет социальные круги общения пользователя:
 * 1. Семья - семейные связи
 * 2. Друзья - дружеские контакты
 * 3. Специалисты - профессиональные контакты (врачи, педагоги и т.д.)
 * 4. Знакомые - знакомые и поверхностные контакты
 *
 * Каждая категория отображается в виде круглого контейнера с:
 * - Иконкой, визуально представляющей категорию
 * - Количественным показателем (если передан) или текстом "нет данных"
 * - Заголовком категории
 *
 * @structure
 * - Заголовок "Круги общения"
 * - Контейнер с четырьмя блоками в сетке
 * - Каждый блок содержит:
 *   - Заголовок категории
 *   - Круглый контейнер с иконкой и значением
 *
 * @visual
 * Компонент использует различные SVG-иконки для каждой категории:
 * - familySrc: семья (три фигуры в форме сердца)
 * - handshakeSrc: друзья (рукопожатие)
 * - schoolSrc: специалисты (академическая шапочка)
 * - familiarSrc: знакомые (три фигуры)
 *
 * @styles
 * Категории имеют уникальные CSS-классы для стилизации:
 * - `circle-family` - для контейнера семьи
 * - `circle-friends` - для контейнера друзей
 * - `circle-specialists` - для контейнера специалистов
 * - `circle-familiar` - для контейнера знакомых
 *
 * @note При отсутствии значения для категории отображается текст "нет данных"
 * @note Иконки включают alt-текст для доступности
 *
 * @see {@link TSocialCircles} Тип пропсов компонента
 */

export const SocialCircles: React.FC<TSocialCircles> = ({
  className,
  family,
  friends,
  specialists,
  familiar,
}) => {
  const data = [
    {
      title: 'Семья',
      value: family,
      icon: familySrc,
      alt: 'Стилизованное изображение трёх человеческих фигур, объединённых в форме сердца',
      variant: 'family',
    },
    {
      title: 'Друзья',
      value: friends,
      icon: handshakeSrc,
      alt: 'Стилизованное изображение рукопожатия',
      variant: 'friends',
    },
    {
      title: 'Специалисты',
      value: specialists,
      icon: schoolSrc,
      alt: 'Стилизованное изображение академической шапочки',
      variant: 'specialists',
    },
    {
      title: 'Знакомые',
      value: familiar,
      icon: familiarSrc,
      alt: 'Стилизованное изображение трёх человеческих фигур',
      variant: 'familiar',
    },
  ];

  return (
    <section
      className={
        className
          ? `${styles.card__section} ${className}`
          : styles.card__section
      }
    >
      <h2 className={styles.title}>Круги общения</h2>
      <div className={styles.card__content}>
        {data.map((block, index) => (
          <div className={styles.card__block} key={index}>
            <div className={styles.card__header}>{block.title}</div>
            <div
              className={`${styles.card__circle} ${styles[`circle-${block.variant}`]}`}
            >
              <div className={styles.card__image}>
                <img
                  className={styles[`image-${block.variant}`]}
                  src={block.icon}
                  alt={block.alt}
                />
              </div>
              {block.value ? block.value : 'нет данных'}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
