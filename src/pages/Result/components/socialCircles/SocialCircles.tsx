import styles from '../socialCircles/SocialCircles.module.css';
import schoolSrc from './icons/school.svg';
import handshakeSrc from './icons/handshake.svg';
import familySrc from './icons/diversity_1.svg';
import familiarSrc from './icons/diversity_3.svg';

export type TSocialCircles = {
  family?: string;
  friends?: string;
  specialists?: string;
  familiar?: string;
};

export const SocialCircles: React.FC<TSocialCircles> = ({
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
    <section className={styles.card__section}>
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
