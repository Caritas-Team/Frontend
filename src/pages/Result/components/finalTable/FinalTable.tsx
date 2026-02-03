// src\pages\Result\components\finalTable\FinalTable.tsx
import { Delta } from '@ui/delta';
import styles from './FinalTable.module.css';

/**
 * Тип пропсов для компонента FinalTable
 * @typedef {Object} FinalTableProps
 * @property {string} [className] - Дополнительные CSS-классы для секции таблицы
 * @property {string} languageDevelopmentLevels - Уровни языкового развития (значение для Delta)
 * @property {string} communicationInitiative - Инициатива в коммуникации (значение для Delta)
 * @property {string} communicativeFunctionsProgress - Развитие коммуникативных функций (значение для Delta)
 * @property {string} vocabularyLevel - Словарный запас (значение для Delta)
 * @property {string} spokenWordsCount - Количество устных слов (значение для Delta)
 */

export type FinalTableProps = {
  className?: string;
  languageDevelopmentLevels: string;
  communicationInitiative: string;
  communicativeFunctionsProgress: string;
  vocabularyLevel: string;
  spokenWordsCount: string;
};

/**
 * Итоговая таблица ключевых показателей развития с индикаторами динамики
 *
 * @component FinalTable
 * @description
 * Компонент для отображения сводной таблицы ключевых параметров диагностики
 * языкового и коммуникативного развития. Каждый параметр сопровождается
 * индикатором изменения (Delta), показывающим динамику по сравнению с предыдущим
 * измерением. Таблица предоставляет структурированный обзор основных метрик
 * в рамках отчета по результатам диагностики.
 *
 * **Параметры таблицы:**
 * 1. Уровни языкового развития - оценка общего прогресса в освоении языка
 * 2. Инициатива - активность в инициировании коммуникативных актов
 * 3. Развитие коммуникативных функций - прогресс в использовании языка для различных целей
 * 4. Словарный запас - количественная оценка активного словаря
 * 5. Устные слова - количество произносимых слов/высказываний
 *
 * **Визуальные индикаторы:**
 * - Компонент Delta отображает значение с указанием направления изменения
 * - Стрелка вверх (↑): положительная динамика, рост показателя
 * - Стрелка вниз (↓): отрицательная динамика, снижение показателя
 * - Заглушка для предупреждений (wrapperWarning) - пока не реализована
 *
 * @param {FinalTableProps} props - Свойства компонента
 * @returns {JSX.Element} Итоговая таблица с ключевыми показателями
 *
 * @example
 * // Базовая таблица с положительными изменениями
 * <FinalTable
 *   languageDevelopmentLevels="+15%"
 *   communicationInitiative="+8%"
 *   communicativeFunctionsProgress="+12%"
 *   vocabularyLevel="+25%"
 *   spokenWordsCount="+18%"
 * />
 *
 * @example
 * // Таблица со смешанной динамикой
 * <FinalTable
 *   languageDevelopmentLevels="+10%"
 *   communicationInitiative="-5%"
 *   communicativeFunctionsProgress="+3%"
 *   vocabularyLevel="+20%"
 *   spokenWordsCount="-2%"
 * />
 *
 * @example
 * // Таблица с кастомными стилями
 * <FinalTable
 *   className="compact-table"
 *   languageDevelopmentLevels="45%"
 *   communicationInitiative="60%"
 *   communicativeFunctionsProgress="38%"
 *   vocabularyLevel="72%"
 *   spokenWordsCount="150 слов"
 * />
 *
 * @example
 * // Интеграция с данными диагностики
 * const ResultsPage = ({ diagnosticResults }) => {
 *   const calculateChange = (current, previous) => {
 *     const change = ((current - previous) / previous * 100).toFixed(1);
 *     return `${change > 0 ? '+' : ''}${change}%`;
 *   };
 *
 *   return (
 *     <FinalTable
 *       languageDevelopmentLevels={calculateChange(
 *         diagnosticResults.current.languageLevel,
 *         diagnosticResults.previous.languageLevel
 *       )}
 *       communicationInitiative={calculateChange(
 *         diagnosticResults.current.initiative,
 *         diagnosticResults.previous.initiative
 *       )}
 *       // ... остальные параметры
 *     />
 *   );
 * };
 *
 * @note
 * - Все значения передаются как строки для компонента Delta
 * - Направление изменения (up) жестко задано в разметке и не зависит от значений
 * - Только один параметр ("Развитие коммуникативных функций") имеет отображение предупреждения
 * - Заголовки столбцов "Параметры:" и "%/кол-во:" фиксированы
 * - Сетка реализована через CSS Grid с двумя колонками
 * - Предупреждения (wrapperWarning) закомментированы и пока не функциональны
 *
 * @warning
 * 1. Направление стрелок (up/down) жестко закодировано и не вычисляется из значений
 * 2. Компонент не поддерживает числовые значения напрямую (только строки)
 * 3. Отсутствует валидация формата входных данных
 * 4. Предупреждения (warning) не реализованы (TODO в коде)
 * 5. Таблица не адаптивна по умолчанию (фиксированный дизайн)
 * 6. Все параметры обязательны, отсутствует поддержка опциональных полей
 * 7. Не поддерживаются единицы измерения кроме процентов (заголовок "%/кол-во:")
 *
 * @accessibility
 * - Секция имеет семантический тег <section> с заголовком h3
 * - Таблица использует CSS Grid вместо HTML table, что может ухудшить доступность
 * - Рекомендуется добавить role="table", role="row", role="cell" для скринридеров
 * - Компонент Delta должен иметь собственную accessibility-реализацию
 * - Для предупреждений нужно добавить aria-label или role="alert"
 * - Заголовок "Итоговая таблица" предоставляет контекст для пользователей
 *
 * @layout
 * **Структура таблицы (CSS Grid):**
 * ```
 * 2 колонки: параметры | значения
 * 6 строк: заголовки + 5 параметров
 *
 * +---------------------+-----------+
 * | Параметры:         | %/кол-во: |
 * +---------------------+-----------+
 * | Уровни языкового   | [Delta]   |
 * | развития           |           |
 * +---------------------+-----------+
 * | Инициатива         | [Delta]   |
 * +---------------------+-----------+
 * | Развитие коммун.   | [Delta]   |
 * | функций            | [warning] |
 * +---------------------+-----------+
 * | Словарный запас    | [Delta]   |
 * +---------------------+-----------+
 * | Устные слова       | [Delta]   |
 * +---------------------+-----------+
 * ```
 *
 * **CSS-классы:**
 * - .finalTable - Основной контейнер секции
 * - .caption - Заголовок таблицы (h3)
 * - .gridContainer - Контейнер CSS Grid
 * - .gridHeader - Стили заголовков столбцов
 * - .gridHeaderParameters - Заголовок "Параметры:"
 * - .gridHeaderValue - Заголовок "%/кол-во:"
 * - .gridParameter - Ячейка с названием параметра
 * - .gridValue - Ячейка со значением (Delta)
 * - .boxDelta - Контейнер для компонента Delta
 * - .wrapperWarning - Индикатор предупреждения (пока не используется)
 *
 * @dependencies
 * - Delta: компонент индикатора изменения со стрелкой
 *
 * @see Delta - Компонент индикатора изменения
 * @see FinalTable.module.css - Стили компонента
 *
 * @todo
 * - Реализовать автоматическое определение направления изменения из значений
 * - Добавить валидацию и парсинг строковых значений
 * - Реализовать систему предупреждений (warning) для критических изменений
 * - Добавить поддержку числовых значений и разных единиц измерения
 * - Реализовать адаптивный дизайн для мобильных устройств
 * - Добавить tooltip с пояснениями по каждому параметру
 * - Реализовать цветовое кодирование значений (зеленый/желтый/красный)
 * - Добавить возможность скрытия/раскрытия детальной информации по параметрам
 * - Поддержка темной/светлой темы
 * - Добавить сравнение с возрастными нормативами
 * - Реализовать экспорт таблицы в CSV/Excel
 * - Добавить анимацию появления значений
 * - Поддержка локализации названий параметров
 * - Реализовать сортировку параметров по значению изменения
 * - Добавить фильтрацию параметров по категориям
 * - Реализовать интерактивность (клик по строке для деталей)
 * - Добавить прогресс-бары вместо/в дополнение к Delta
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Консолидирует ключевые показатели диагностики в одном месте
 * 2. Обеспечивает быстрый обзор динамики по основным параметрам
 * 3. Создает структурированный и профессиональный вид отчета
 * 4. Упрощает сравнение результатов разных обследований
 * 5. Предоставляет визуальные индикаторы для быстрой оценки изменений
 * 6. Интегрируется с системой компонентов через Delta
 *
 * @clinical_interpretation
 * **Значение параметров в диагностике:**
 * - Уровни языкового развития: соответствие возрастным нормативам
 * - Инициатива: социальная активность и мотивация к коммуникации
 * - Коммуникативные функции: разнообразие целей использования языка
 * - Словарный запас: объем активного лексикона
 * - Устные слова: беглость и продуктивность речи
 *
 * **Интерпретация изменений:**
 * - Положительная динамика (↑): прогресс в развитии
 * - Отрицательная динамика (↓): возможные проблемы или регресс
 * - Большие изменения: значительные сдвиги в развитии
 * - Малые изменения: стабильность или медленный прогресс
 *
 * @pedagogical_context
 * Таблица используется в образовательных и коррекционных целях:
 * - Отслеживание эффективности коррекционных программ
 * - Постановка целей для индивидуальных планов развития
 * - Коммуникация с родителями о прогрессе ребенка
 * - Документирование динамики для отчетов и консилиумов
 * - Сравнение эффективности разных методик работы
 */

export const FinalTable: React.FC<FinalTableProps> = ({
  className,
  languageDevelopmentLevels,
  communicationInitiative,
  communicativeFunctionsProgress,
  vocabularyLevel,
  spokenWordsCount,
}) => {
  //TODO: const showWarning = () => {} для отображения придупреждения когда нужно;
  return (
    <section
      className={
        className ? `${styles.finalTable} ${className}` : styles.finalTable
      }
    >
      <h3 className={styles.caption}>Итоговая таблица</h3>
      <div className={styles.gridContainer}>
        {/* Заголовок */}
        <div className={`${styles.gridHeader} ${styles.gridHeaderParameters}`}>
          Параметры:
        </div>
        <div className={`${styles.gridHeader} ${styles.gridHeaderValue}`}>
          %/кол-во:
        </div>

        {/* Строки данных */}
        <div className={styles.gridParameter}>Уровни языкового развития</div>
        <div className={styles.gridValue}>
          <div className={styles.boxDelta}>
            {/* <span className={styles.wrapperWarning}></span> */}
            <Delta text={languageDevelopmentLevels} up={true} />
          </div>
        </div>

        <div className={styles.gridParameter}>Инициатива</div>
        <div className={styles.gridValue}>
          <div className={styles.boxDelta}>
            {/* <span className={styles.wrapperWarning}></span> */}
            <Delta text={communicationInitiative} up={true} />
          </div>
        </div>

        <div className={styles.gridParameter}>
          Развитие коммуникативных функций
        </div>
        <div className={styles.gridValue}>
          <div className={styles.boxDelta}>
            <span className={styles.wrapperWarning}></span>
            <Delta text={communicativeFunctionsProgress} up={false} />
          </div>
        </div>

        <div className={styles.gridParameter}>Словарный запас</div>
        <div className={styles.gridValue}>
          <div className={styles.boxDelta}>
            {/* <span className={styles.wrapperWarning}></span> */}
            <Delta text={vocabularyLevel} up={true} />
          </div>
        </div>

        <div className={styles.gridParameter}>Устные слова</div>
        <div className={styles.gridValue}>
          <div className={styles.boxDelta}>
            {/* <span className={styles.wrapperWarning}></span> */}
            <Delta text={spokenWordsCount} up={false} />
          </div>
        </div>
      </div>
    </section>
  );
};
