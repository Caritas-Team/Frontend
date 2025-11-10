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

type Status = 'уже не используется' | 'превзошел' | 'недоступно';
type Statuses = {
  [key: string]: Status;
};
interface ThreeCommunicativeFunctionProps {
  gettingDesired: Statuses;
  socialInteraction: Statuses;
  informationExchange: Statuses;
}

const validStatuses: Status[] = [
  'уже не используется',
  'превзошел',
  'недоступно',
];

const isValidStatus = (status: string): status is Status => {
  return validStatuses.includes(status as Status);
};

const statusClassMap: Record<Status, string> = {
  'уже не используется': styles.notUsed,
  превзошел: styles.surpassed,
  недоступно: styles.notAvailable,
};

export const ThreeCommunicativeFunction: React.FC<
  ThreeCommunicativeFunctionProps
> = ({ gettingDesired, socialInteraction, informationExchange }) => {
  const renderStatusGroup = (title: string, statuses: Statuses) => (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        {Object.entries(statuses).map(([action, status]) => {
          if (!isValidStatus(status)) {
            return null;
          }
          return (
            <div key={action} className={styles.item}>
              <span className={styles.action}>{action}</span>
              <span className={`${styles.status} ${statusClassMap[status]}`}>
                {status.toUpperCase()}
              </span>
            </div>
          );
        })}
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
