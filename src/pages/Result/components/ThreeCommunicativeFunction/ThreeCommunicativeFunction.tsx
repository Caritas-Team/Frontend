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

/**
 * Компонент "Три коммуникативные функции" для визуализации статусов коммуникативных навыков
 *
 * Отображает четыре группы коммуникативных функций с их статусами и подкатегориями.
 * Используется для оценки прогресса в различных аспектах коммуникации.
 *
 * @component
 * @example
 * // Пример использования
 * <ThreeCommunicativeFunction
 *   control={[
 *     { name: { "Управление средой": "прогресс" },
 *       subCategory: [{ name: "Включение света", icon: "arrowUp", value: 25 }] }
 *   ]}
 *   gettingDesired={[
 *     { name: { "Просьба о помощи": "превзошел" } }
 *   ]}
 *   socialInteraction={[
 *     { name: { "Приветствие": "уже не используется" } }
 *   ]}
 *   informationExchange={[
 *     { name: { "Обмен новостями": "недоступно" } }
 *   ]}
 * />
 *
 * @typedef {'уже не используется' | 'превзошел' | 'недоступно' | 'прогресс'} Status
 * @typedef {'arrowUp' | 'arrowDown' | 'equal' | 'complete' | 'manyArrowsUp'} IconValue
 * @typedef {Object.<string, Status>} Statuses - Объект с ключом-действием и значением-статусом
 *
 * @typedef {Object} IsubCategory
 * @property {string} name - Название подкатегории
 * @property {IconValue} icon - Тип иконки для отображения
 * @property {number} [value] - Числовое значение в процентах (опционально)
 *
 * @typedef {Object} StatusInfo
 * @property {Statuses} name - Объект с действием и его статусом
 * @property {IsubCategory[]} [subCategory] - Массив подкатегорий (только для статуса 'прогресс')
 *
 * @typedef {Object} ThreeCommunicativeFunctionProps
 * @property {string} [className] - Дополнительные CSS-классы для контейнера
 * @property {StatusInfo[]} control - Данные для функции "контроль"
 * @property {StatusInfo[]} gettingDesired - Данные для функции "получение желаемого"
 * @property {StatusInfo[]} socialInteraction - Данные для функции "социальное взаимодействие"
 * @property {StatusInfo[]} informationExchange - Данные для функции "обмен информацией"
 *
 * @param {ThreeCommunicativeFunctionProps} props - Пропсы компонента
 * @param {string} [props.className] - Дополнительный CSS-класс для стилизации
 * @param {StatusInfo[]} props.control - Массив статусов для коммуникативной функции контроля
 * @param {StatusInfo[]} props.gettingDesired - Массив статусов для функции получения желаемого
 * @param {StatusInfo[]} props.socialInteraction - Массив статусов для социального взаимодействия
 * @param {StatusInfo[]} props.informationExchange - Массив статусов для обмена информацией
 *
 * @returns {JSX.Element} Возвращает секцию с четырьмя группами коммуникативных функций
 *
 * @description
 * Компонент отображает четыре ключевые коммуникативные функции:
 * 1. Контроль - управление окружающей средой и ресурсами
 * 2. Получение желаемого - выражение потребностей и просьб
 * 3. Социальное взаимодействие - установление и поддержание социальных связей
 * 4. Обмен информацией - передача и получение информации
 *
 * @structure
 * Для каждой функции отображается:
 * - Заголовок группы
 * - Список действий с их статусами
 * - Подкатегории с иконками и значениями (только для статуса 'прогресс')
 *
 * @statuses
 * Поддерживаются четыре типа статусов:
 * - 'уже не используется' (серый цвет)
 * - 'превзошел' (зеленый цвет)
 * - 'недоступно' (красный цвет)
 * - 'прогресс' (синий цвет) - единственный статус, показывающий подкатегории
 *
 * @icons
 * Используются пять типов иконок для подкатегорий:
 * - arrowUp: стрелка вверх (рост)
 * - arrowDown: стрелка вниз (снижение)
 * - equal: знак равенства (стабильность)
 * - complete: галочка (завершено)
 * - manyArrowsUp: несколько стрелок вверх (быстрый рост)
 *
 * @validation
 * Компонент включает валидацию статусов через функцию `isValidStatus`
 * Только валидные статусы отображаются, некорректные - игнорируются
 *
 * @mapping
 * - `statusClassMap`: сопоставляет статусы с CSS-классами для стилизации
 * - `iconMap`: сопоставляет типы иконок с путями к SVG-файлам
 *
 * @note Подкатегории отображаются только для статуса 'прогресс'
 * @note Названия статусов отображаются в верхнем регистре
 * @note Значения подкатегорий показываются с символом процента (если есть)
 *
 * @exports
 * - ThreeCommunicativeFunction: основной компонент
 * - ThreeCommunicativeFunctionProps: тип пропсов
 * - Status: тип статусов
 * - Statuses: тип объекта статусов
 */

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
