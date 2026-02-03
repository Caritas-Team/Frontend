import styles from './CommunicativesFunctionChart.module.css';
import React from 'react';
import type { JSX } from 'react';
import arrowUp from '../../../../assets/keyboard_double_arrow_up.svg';
import arrowDown from '../../../../assets/keyboard_double_arrow_down.svg';
import { Charts } from './Charts';
import type { ChartDataItem } from './Charts';
import { formatDateShort } from '../../../../lib/utils';

/**
 * Тип данных для отдельного показателя коммуникативной функции
 * @typedef {Object} BarData
 * @property {string} name - Название показателя
 * @property {number} value - Значение показателя в процентах
 */

type BarData = {
  name: string;
  value: number;
};

/**
 * Тип данных для всех коммуникативных функций
 * @typedef {Object} CommunicationType
 * @property {BarData} GetWhatYouWant - Функция "Получение желаемого результата"
 * @property {BarData} SocialInteraction - Функция "Социальное взаимодействие"
 * @property {BarData} ExchangeOfInformation - Функция "Обмен информацией"
 * @property {BarData} Control - Функция "Контроль"
 */

type CommunicationType = {
  GetWhatYouWant: BarData;
  SocialInteraction: BarData;
  ExchangeOfInformation: BarData;
  Control: BarData;
};

/**
 * Тип пропсов для компонента CommunicativesFunctionChart
 * @typedef {Object} CommunicatiovesFunctionProps
 * @property {string} [className] - Дополнительные CSS-классы
 * @property {string} prevDate - Дата предыдущего измерения (формат YYYY-MM-DD)
 * @property {string} currentDate - Дата текущего измерения (формат YYYY-MM-DD)
 * @property {CommunicationType} dataPrevData - Данные предыдущего измерения
 * @property {CommunicationType} dataCurrentData - Данные текущего измерения
 */

interface CommunicatiovesFunctionProps {
  className?: string;
  prevDate: string;
  currentDate: string;
  dataPrevData: CommunicationType;
  dataCurrentData: CommunicationType;
}

/**
 * Компонент визуализации динамики коммуникативных функций
 *
 * @component CommunicativesFunctionChart
 * @description
 * Компонент для отображения сравнительного анализа четырех коммуникативных функций
 * между двумя временными точками. Включает в себя график сравнения и детализированный
 * список показателей с визуализацией изменений через стрелки и процентные значения.
 *
 * **Коммуникативные функции (по Б.Ф. Скиннеру):**
 * 1. Обмен информацией (Exchange of Information)
 * 2. Социальное взаимодействие (Social Interaction)
 * 3. Получение желаемого результата (Get What You Want)
 * 4. Контроль (Control)
 *
 * **Структура компонента:**
 * 1. Заголовок "Коммуникативные функции"
 * 2. Список показателей с детализацией изменений
 * 3. Сравнительный график (компонент Charts)
 * 4. Визуальные индикаторы роста/падения (стрелки вверх/вниз)
 *
 * **Визуальная обратная связь:**
 * - Стрелка вверх (↑): рост показателя
 * - Стрелка вниз (↓): снижение показателя
 * - Отсутствие стрелки: показатель не изменился
 * - Процентное значение: абсолютное изменение
 * - График: наглядное сравнение двух периодов
 *
 * @param {CommunicatiovesFunctionProps} props - Свойства компонента
 * @returns {JSX.Element | null} Компонент визуализации коммуникативных функций или null при некорректных данных
 *
 * @example
 * // Базовое использование с валидными данными
 * const prevData = {
 *   GetWhatYouWant: { name: 'Получение желаемого', value: 30 },
 *   SocialInteraction: { name: 'Социальное взаимодействие', value: 40 },
 *   ExchangeOfInformation: { name: 'Обмен информацией', value: 50 },
 *   Control: { name: 'Контроль', value: 60 }
 * };
 *
 * const currentData = {
 *   GetWhatYouWant: { name: 'Получение желаемого', value: 45 },
 *   SocialInteraction: { name: 'Социальное взаимодействие', value: 55 },
 *   ExchangeOfInformation: { name: 'Обмен информацией', value: 65 },
 *   Control: { name: 'Контроль', value: 70 }
 * };
 *
 * <CommunicativesFunctionChart
 *   prevDate="2023-01-15"
 *   currentDate="2023-02-15"
 *   dataPrevData={prevData}
 *   dataCurrentData={currentData}
 * />
 *
 * @example
 * // Интеграция с API данных диагностики
 * const DiagnosticResultsChart = ({ diagnosticResults }) => {
 *   const formatData = (results) => ({
 *     GetWhatYouWant: { name: 'Получение желаемого', value: results.getWhatYouWant },
 *     SocialInteraction: { name: 'Социальное взаимодействие', value: results.socialInteraction },
 *     ExchangeOfInformation: { name: 'Обмен информацией', value: results.exchangeOfInformation },
 *     Control: { name: 'Контроль', value: results.control }
 *   });
 *
 *   return (
 *     <CommunicativesFunctionChart
 *       prevDate={diagnosticResults.previous.date}
 *       currentDate={diagnosticResults.current.date}
 *       dataPrevData={formatData(diagnosticResults.previous)}
 *       dataCurrentData={formatData(diagnosticResults.current)}
 *     />
 *   );
 * };
 *
 * @example
 * // Использование с кастомными стилями
 * <CommunicativesFunctionChart
 *   className="custom-styles"
 *   prevDate="2023-03-01"
 *   currentDate="2023-04-01"
 *   dataPrevData={prevData}
 *   dataCurrentData={currentData}
 * />
 *
 * @note
 * - Даты форматируются через утилиту formatDateShort (YYYY-MM-DD → DD.MM.YYYY)
 * - Компонент возвращает null при отсутствии или некорректности входных данных
 * - Все значения должны быть в диапазоне 0-100 (проценты)
 * - Изменение рассчитывается как абсолютная разница между текущим и предыдущим значениями
 * - Стрелки отображаются только при наличии изменения (value ≠ 0)
 * - Процентные значения показываются только если хотя бы одно значение не равно 0
 *
 * @warning
 * 1. Компонент зависит от корректной работы дочернего компонента Charts
 * 2. Отсутствует валидация диапазона значений (0-100%)
 * 3. Нет обработки случаев, когда name различается между периодами
 * 4. Абсолютное изменение может вводить в заблуждение (не показывает направление)
 * 5. Отсутствуют единицы измерения в процентных значениях
 * 6. Компонент не адаптивен по умолчанию (зависит от адаптивности Charts)
 * 7. При нулевых значениях в обоих периодах стрелки и проценты не отображаются
 *
 * @validation
 * Компонент выполняет строгую проверку входных данных:
 * 1. Наличие всех обязательных дат
 * 2. Наличие всех объектов данных
 * 3. Наличие всех свойств внутри объектов данных
 * При несоответствии любого условия компонент возвращает null
 *
 * @accessibility
 * - Заголовок использует h2 для правильной иерархии
 * - Список показателей использует семантические ul/li
 * - Стрелки имеют alt-текст "arrow" (можно улучшить для описания направления)
 * - График наследует accessibility-функции от компонента Charts
 * - Процентные значения не имеют описательного контекста для скринридеров
 * - Рекомендуется добавить aria-label для каждого элемента списка
 *
 * @data_processing
 * **Преобразование данных для графика:**
 * ```
 * chartData = [
 *   { name: dataCurrentData.ExchangeOfInformation.name, previous: prevValue, current: currValue },
 *   // ... остальные 3 функции
 * ]
 * ```
 *
 * **Расчет изменений:**
 * ```
 * calculateChange(current, previous) = Math.abs(current - previous)
 * ```
 *
 * **Определение направления изменения:**
 * - current > previous → стрелка вверх
 * - current < previous → стрелка вниз
 * - current == previous → без стрелки
 *
 * @layout
 * Структура компонента:
 * ```
 * <div class="container [additional-classes]">
 *   <h2 class="title">Коммуникативные функции</h2>
 *   <div class="chartWrapper">
 *     <div class="titleConteiner">
 *       <div class="chartTitle">
 *         <ul class="title_chart__list">
 *           <li class="chart__item">
 *             <span class="chart__itemTitle">Обмен информацией</span>
 *             <div class="procentInfo">
 *               <div class="imgConteiner">
 *                 <img class="chart__itemArrow" src={arrowUp/Down} alt="arrow" />
 *               </div>
 *               <span>{change}%</span>
 *             </div>
 *           </li>
 *           <!-- остальные 3 функции аналогично -->
 *         </ul>
 *       </div>
 *     </div>
 *     <div class="chartLine">
 *       <Charts data={chartData} ... />
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * @css_classes
 * Основные CSS-классы (из CommunicativesFunctionChart.module.css):
 * - .container - Основной контейнер компонента
 * - .title - Заголовок компонента
 * - .chartWrapper - Обертка для всего контента графика
 * - .titleConteiner - Контейнер заголовка и списка
 * - .chartTitle - Контейнер заголовка графика
 * - .title_chart__list - Список показателей
 * - .chart__item - Элемент списка показателя
 * - .chart__itemTitle - Название показателя
 * - .procentInfo - Контейнер процентной информации
 * - .imgConteiner - Контейнер для иконки стрелки
 * - .chart__itemArrow - Иконка стрелки изменения
 * - .chartLine - Контейнер для графика
 *
 * @dependencies
 * - Charts: компонент сравнительного графика
 * - formatDateShort: утилита форматирования дат
 * - arrowUp/arrowDown: SVG иконки стрелок
 *
 * @see Charts - Компонент сравнительного графика
 * @see formatDateShort - Утилита форматирования даты
 * @see arrowUp.svg - Иконка стрелки вверх
 * @see arrowDown.svg - Иконка стрелки вниз
 * @see CommunicativesFunctionChart.module.css - Стили компонента
 *
 * @todo
 * - Добавить валидацию диапазона значений (0-100%)
 * - Реализовать относительное изменение (с указанием направления в процентах)
 * - Добавить цветовое кодирование изменений (зеленый/красный)
 * - Реализовать адаптивный дизайн для мобильных устройств
 * - Добавить tooltip с подробной информацией по каждому показателю
 * - Реализовать режим компактного отображения (без графика)
 * - Добавить возможность скрытия/раскрытия детальной информации
 * - Поддержка локализации названий функций
 * - Реализовать анимацию появления изменений
 * - Добавить сравнение с нормативными значениями (если доступны)
 * - Реализовать экспорт данных в табличном формате
 * - Добавить настройку единиц измерения (проценты, баллы, сырые значения)
 * - Поддержка темной/светлой темы
 * - Реализовать кастомные иконки для разных типов изменений
 * - Добавить фильтрацию/сортировку показателей
 * - Реализовать накопление истории изменений за несколько периодов
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Визуализация динамики развития коммуникативных навыков
 * 2. Наглядное сравнение результатов двух диагностических срезов
 * 3. Предоставление количественной оценки изменений
 * 4. Создание профессионального отчета для специалистов
 * 5. Упрощение анализа многомерных данных через графическое представление
 * 6. Интеграция с системой диагностики в области коммуникации
 *
 * @clinical_significance
 * Компонент используется в контексте диагностики коммуникативных нарушений:
 * - Оценка эффективности коррекционных программ
 * - Мониторинг прогресса в развитии коммуникативных навыков
 * - Сравнение результатов разных методик диагностики
 * - Визуализация данных для мультидисциплинарных консилиумов
 * - Создание наглядных материалов для родителей/опекунов
 *
 * @data_interpretation
 * **Интерпретация изменений:**
 * - Рост показателей: положительная динамика развития
 * - Снижение показателей: возможный регресс или проблемы
 * - Отсутствие изменений: стагнация в развитии
 * - Высокие абсолютные изменения: значительные сдвиги в навыках
 *
 * **Рекомендации по использованию:**
 * 1. Рассматривать изменения в контексте общего развития
 * 2. Учитывать погрешность измерения
 * 3. Сопоставлять с качественными наблюдениями
 * 4. Интерпретировать в рамках индивидуальной траектории развития
 */

const CommunicativesFunctionChart: React.FC<CommunicatiovesFunctionProps> = (
  props: CommunicatiovesFunctionProps
): JSX.Element | null => {
  const { className, prevDate, currentDate, dataCurrentData, dataPrevData } =
    props;

  if (!prevDate || !currentDate || !dataCurrentData || !dataPrevData) {
    return null;
  }

  if (
    !dataCurrentData.ExchangeOfInformation ||
    !dataCurrentData.SocialInteraction ||
    !dataCurrentData.GetWhatYouWant ||
    !dataCurrentData.Control
  ) {
    return null;
  }

  if (
    !dataPrevData.ExchangeOfInformation ||
    !dataPrevData.SocialInteraction ||
    !dataPrevData.GetWhatYouWant ||
    !dataPrevData.Control
  ) {
    return null;
  }

  const chartData: ChartDataItem[] = [
    {
      name: dataCurrentData.ExchangeOfInformation.name,
      previous: dataPrevData.ExchangeOfInformation.value,
      current: dataCurrentData.ExchangeOfInformation.value,
    },
    {
      name: dataCurrentData.SocialInteraction.name,
      previous: dataPrevData.SocialInteraction.value,
      current: dataCurrentData.SocialInteraction.value,
    },
    {
      name: dataCurrentData.GetWhatYouWant.name,
      previous: dataPrevData.GetWhatYouWant.value,
      current: dataCurrentData.GetWhatYouWant.value,
    },
    {
      name: dataCurrentData.Control.name,
      previous: dataPrevData.Control.value,
      current: dataCurrentData.Control.value,
    },
  ];

  const calculateChange = (current: number, previous: number): number => {
    const change = current - previous;
    return Math.abs(change);
  };

  return (
    <div
      className={
        className ? `${styles.container} ${className}` : styles.container
      }
    >
      <h2 className={styles.title}>Коммуникативные функции</h2>
      <div className={styles.chartWrapper}>
        <div className={styles.titleConteiner}>
          <div className={styles.chartTitle}>
            <ul className={styles.title_chart__list}>
              <li className={styles.chart__item}>
                <span className={styles.chart__itemTitle}>
                  Обмен информацией
                </span>
                {(dataCurrentData.ExchangeOfInformation.value !== 0 ||
                  dataPrevData.ExchangeOfInformation.value !== 0) && (
                  <div className={styles.procentInfo}>
                    <div className={styles.imgConteiner}>
                      {dataCurrentData.ExchangeOfInformation.value !==
                        dataPrevData.ExchangeOfInformation.value && (
                        <img
                          className={styles.chart__itemArrow}
                          src={
                            dataCurrentData.ExchangeOfInformation.value >
                            dataPrevData.ExchangeOfInformation.value
                              ? arrowUp
                              : arrowDown
                          }
                          alt="arrow"
                        />
                      )}
                    </div>
                    <span>
                      {calculateChange(
                        dataCurrentData.ExchangeOfInformation.value,
                        dataPrevData.ExchangeOfInformation.value
                      )}
                      %
                    </span>
                  </div>
                )}
              </li>
              <li className={styles.chart__item}>
                <span className={styles.chart__itemTitle}>
                  Социальное взаимодействие
                </span>
                {(dataCurrentData.SocialInteraction.value !== 0 ||
                  dataPrevData.SocialInteraction.value !== 0) && (
                  <div className={styles.procentInfo}>
                    <div className={styles.imgConteiner}>
                      {dataCurrentData.SocialInteraction.value !==
                        dataPrevData.SocialInteraction.value && (
                        <img
                          className={styles.chart__itemArrow}
                          src={
                            dataCurrentData.SocialInteraction.value >
                            dataPrevData.SocialInteraction.value
                              ? arrowUp
                              : arrowDown
                          }
                          alt="arrow"
                        />
                      )}
                    </div>
                    <span>
                      {calculateChange(
                        dataCurrentData.SocialInteraction.value,
                        dataPrevData.SocialInteraction.value
                      )}
                      %
                    </span>
                  </div>
                )}
              </li>
              <li className={styles.chart__item}>
                <span className={styles.chart__itemTitle}>
                  Получение желаемого результата
                </span>
                {(dataCurrentData.GetWhatYouWant.value !== 0 ||
                  dataPrevData.GetWhatYouWant.value !== 0) && (
                  <div className={styles.procentInfo}>
                    <div className={styles.imgConteiner}>
                      {dataCurrentData.GetWhatYouWant.value !==
                        dataPrevData.GetWhatYouWant.value && (
                        <img
                          className={styles.chart__itemArrow}
                          src={
                            dataCurrentData.GetWhatYouWant.value >
                            dataPrevData.GetWhatYouWant.value
                              ? arrowUp
                              : arrowDown
                          }
                          alt="arrow"
                        />
                      )}
                    </div>
                    <span>
                      {calculateChange(
                        dataCurrentData.GetWhatYouWant.value,
                        dataPrevData.GetWhatYouWant.value
                      )}
                      %
                    </span>
                  </div>
                )}
              </li>
              <li className={styles.chart__item}>
                <span className={styles.chart__itemTitle}>Контроль</span>
                {(dataCurrentData.Control.value !== 0 ||
                  dataPrevData.Control.value !== 0) && (
                  <div className={styles.procentInfo}>
                    <div className={styles.imgConteiner}>
                      {dataCurrentData.Control.value !==
                        dataPrevData.Control.value && (
                        <img
                          className={styles.chart__itemArrow}
                          src={
                            dataCurrentData.Control.value >
                            dataPrevData.Control.value
                              ? arrowUp
                              : arrowDown
                          }
                          alt="arrow"
                        />
                      )}
                    </div>
                    <span>
                      {calculateChange(
                        dataCurrentData.Control.value,
                        dataPrevData.Control.value
                      )}
                      %
                    </span>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.chartLine}>
          <Charts
            data={chartData}
            prevDate={formatDateShort(prevDate)}
            currentDate={formatDateShort(currentDate)}
          />
        </div>
      </div>
    </div>
  );
};

export { CommunicativesFunctionChart };
export type { CommunicatiovesFunctionProps, CommunicationType };
