/* 

// как использовать компонент
const communicativeData = {
  gettingDesired: {
    "Выбирает": "уже не используется",
    "Просит ещё действие или предмет": "уже не используется",
    "Просит действие": "уже не используется",
    "Просит предмет (объект)": "уже не используется"
  },
  socialInteraction: {
    "Привлекает внимание": "превзошел",
    "Просит о помощи": "превзошел",
    "Здоровляется, прощается, использует вежливые формы обращения": "превзошел",
    "Выражает эмоции, чувства, состояние": "превзошел"
  },
  informationExchange: {
    "Задаёт вопросы": "недоступно",
    "Комментирует и выражает мнение": "недоступно",
    "Объясняет что-то или описывает": "недоступно",
    "Рассказывает (что было, что будет, что происходит сейчас)": "недоступно"
  }
};

// В JSX
<ThreeCommunicativeFunction 
  gettingDesired={communicativeData.gettingDesired}
  socialInteraction={communicativeData.socialInteraction}
  informationExchange={communicativeData.informationExchange}
/>
*/

import styles from './ThreeCommunicativeFunction.module.css';
import iconNoLongerUsed from './icons/mark_green_without.svg';
import iconExceeded from './icons/mark_green_with_check.svg';
import iconUnavailable from './icons/mark_red.svg';

type Status = 'уже не используется' | 'превзошел' | 'недоступно';

type Statuses = {
  [key: string]: Status;
};

interface ThreeCommunicativeFunctionProps {
  gettingDesired: Statuses;
  socialInteraction: Statuses;
  informationExchange: Statuses;
}

// Объект с импортированными иконками
const statusIcons: Record<Status, string> = {
  'уже не используется': iconNoLongerUsed,
  превзошел: iconExceeded,
  недоступно: iconUnavailable,
};

export const ThreeCommunicativeFunction: React.FC<
  ThreeCommunicativeFunctionProps
> = ({ gettingDesired, socialInteraction, informationExchange }) => {
  const renderStatusGroup = (title: string, statuses: Statuses) => (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        {Object.entries(statuses).map(([action, status]) => (
          <div key={action} className={styles.item}>
            <span className={styles.action}>{action}</span>
            <span
              className={`${styles.status} ${styles[status.replace(/\s+/g, '_')]}`}
            >
              <img
                src={statusIcons[status]}
                alt={status}
                className={styles.statusIcon}
              />
              {status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={styles.container}>
      {renderStatusGroup(
        'Коммуникативная функция «получение желаемого»',
        gettingDesired
      )}
      {renderStatusGroup(
        'Коммуникативная функция «социальное взаимодействие»',
        socialInteraction
      )}
      {renderStatusGroup(
        'Коммуникативная функция «обмен информацией»',
        informationExchange
      )}
    </section>
  );
};

export default ThreeCommunicativeFunction;
export type { ThreeCommunicativeFunctionProps, Status, Statuses };
