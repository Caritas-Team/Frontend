/* 

// как использовать компонент
const communicativeData: ThreeCommunicativeFunctionProps = {
  control: [
    {
      name: { 'Отказывается, отклоняет': 'прогресс' },
      subCategory: [
        { name: 'Протоязык', icon: 'arrowDown', value: 18 },
        { name: 'Голофраза', icon: 'equal' },
        { name: 'Фраза', icon: 'manyArrowsUp'}
      ],
    }
  ],

  gettingDesired: [
    {
      name: { Выбирает: 'прогресс' },
      subCategory: [{ name: 'Голофраза', icon: 'complete' }],
    },
    {
      name: { 'Просит ещё действие или предмет': 'прогресс' },
      subCategory: [{ name: 'Фраза', icon: 'arrowDown', value: 15 }],
    },
    {
      name: { 'Просит действие': 'прогресс' },
      subCategory: [
        { name: 'Голофраза', icon: 'complete' },
        { name: 'Фраза', icon: 'arrowUp', value: 27 },
      ],
    },
    {
      name: { 'Просит предмет (объект)': 'уже не используется' },
    },
  ],

  socialInteraction: [
    { name: { 'Привлекает внимание': 'превзошел' } },
    { name: { 'Просит о помощи': 'превзошел' } },
    {
      name: {
        'Здоровается, прощается, использует вежливые формы обращения':
          'уже не используется',
      },
    },
    { name: { 'Выражает эмоции, чувства, состояние': 'уже не используется' } },
  ],

  informationExchange: [
    { name: { 'Задаёт вопросы': 'недоступно' } },
    { name: { 'Комментирует и выражает мнение': 'недоступно' } },
    { name: { 'Объясняет что-то или описывает': 'недоступно' } },
    {
      name: {
        'Рассказывает (что было, что будет, что происходит сейчас)':
          'недоступно',
      },
    },
  ],
};

// В JSX
<ThreeCommunicativeFunction 
control={communicativeData.control}
  gettingDesired={communicativeData.gettingDesired}
  socialInteraction={communicativeData.socialInteraction}
  informationExchange={communicativeData.informationExchange}
/>
*/

import styles from './ThreeCommunicativeFunction.module.css';
import iconEqual from '../../../../assets/icon_equal.svg';
import iconComplete from '../../../../assets/icon_complete.svg';
import iconArrowUp from '../../../../assets/keyboard_double_arrow_up.svg';
import iconArrowDown from '../../../../assets/keyboard_double_arrow_down.svg';
import iconManyArrowsUp from '../../../../assets/icon_manyArrowsUp.svg';

type Status = 'уже не используется' | 'превзошел' | 'недоступно' | 'прогресс';
type IconValue =
  | 'arrowUp'
  | 'arrowDown'
  | 'equal'
  | 'complete'
  | 'manyArrowsUp';
type Statuses = {
  [key: string]: Status;
};

interface IsubCategory {
  name: string;
  icon: IconValue;
  value?: number;
}
interface StatusInfo {
  name: Statuses;
  subCategory?: IsubCategory[];
}

interface ThreeCommunicativeFunctionProps {
  className?: string;
  control: StatusInfo[];
  gettingDesired: StatusInfo[];
  socialInteraction: StatusInfo[];
  informationExchange: StatusInfo[];
}

const validStatuses: Status[] = [
  'уже не используется',
  'превзошел',
  'недоступно',
  'прогресс',
];

const isValidStatus = (status: string): status is Status => {
  return validStatuses.includes(status as Status);
};

const statusClassMap: Record<Status, string> = {
  ['уже не используется']: styles.notUsed,
  ['превзошел']: styles.surpassed,
  ['недоступно']: styles.notAvailable,
  ['прогресс']: styles.progress,
};

const iconMap: Record<IconValue, string> = {
  arrowUp: iconArrowUp,
  arrowDown: iconArrowDown,
  equal: iconEqual,
  complete: iconComplete,
  manyArrowsUp: iconManyArrowsUp,
};

export const ThreeCommunicativeFunction: React.FC<
  ThreeCommunicativeFunctionProps
> = ({
  className,
  control,
  gettingDesired,
  socialInteraction,
  informationExchange,
}) => {
  const renderStatusGroup = (title: string, statuses: StatusInfo[]) => (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>
        {statuses.map((statusInfo, index) => {
          const statusEntries = Object.entries(statusInfo.name);

          return statusEntries.map(([actionName, statusValue]) => {
            if (!isValidStatus(statusValue)) {
              return null;
            }
            const hasSubCategory =
              statusInfo.subCategory && statusInfo.subCategory.length > 0;
            const shouldShowSubCategory =
              hasSubCategory && statusValue === 'прогресс';

            return (
              <div key={`${actionName}-${index}`} className={styles.item}>
                <span className={styles.action}>{actionName}</span>

                {statusValue !== 'прогресс' && (
                  <span
                    className={`${styles.status} ${statusClassMap[statusValue]}`}
                  >
                    {statusValue.toUpperCase()}
                  </span>
                )}
                {shouldShowSubCategory && (
                  <div className={styles.subCategoryContainer}>
                    <ul className={styles.statusList}>
                      {statusInfo.subCategory?.map((subItem, subIndex) => {
                        if (!subItem) return null;

                        return (
                          <li
                            key={`sub-${subIndex}`}
                            className={styles.statusItem}
                          >
                            <span className={styles.statusText}>
                              {subItem.name}
                            </span>
                            <div className={styles.statusIconValue}>
                              <img
                                src={iconMap[subItem.icon]}
                                className={styles.statusIcon}
                              />
                              {subItem.value !== undefined && (
                                <span className={styles.statusValue}>
                                  {subItem.value}%
                                </span>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          });
        })}
      </div>
    </div>
  );

  return (
    <section
      className={
        className ? `${styles.container} ${className}` : styles.container
      }
    >
      {renderStatusGroup('Коммуникативная функция «контроль»', control)}
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
