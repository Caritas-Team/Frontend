import React, { useState, useEffect } from 'react';
import styles from './Charts.module.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import type { TChartDataItem, TBarChartData } from '../types';
import { isValidDate } from '../../../../../lib/utils';
import iconArrowUp from '../../../../../assets/double-arrow-up.svg';
import iconArrowDown from '../../../../../assets/double-arrow-down.svg';

/**
 * Расширенный тип данных графика с динамикой изменений
 * @typedef {Object} TChartDataCalculated
 * @extends TChartDataItem
 * @property {number} dynamics - Разница между текущим и предыдущим значениями
 */

type TChartDataCalculated = TChartDataItem & { dynamics: number };

/**
 * Адаптивный сравнительный график с динамикой изменений и валидацией данных
 *
 * @component Chart
 * @description
 * Горизонтальный столбчатый график для сравнения показателей между двумя периодами
 * с дополнительной визуализацией динамики изменений. Компонент включает адаптивную
 * верстку, валидацию входных данных и кастомную отрисовку элементов графика.
 *
 * **Ключевые особенности:**
 * - Адаптивный дизайн с изменением параметров в зависимости от ширины экрана
 * - Строгая валидация входных данных (диапазон 0-100%, корректность дат)
 * - Визуализация динамики изменений через стрелки на оси X
 * - Фильтрация некорректных данных (пара скрывается при невалидных значениях)
 * - Кастомные стили для всех элементов графика через CSS-модули
 * - Поддержка горизонтальной ориентации (layout="horizontal")
 *
 * **Адаптивное поведение:**
 * - Десктоп (≥1200px): стандартные отступы, barGap=20px
 * - Планшет (834px-1199px): скорректированные отступы
 * - Мобильный (<834px): уменьшенные отступы, barGap=4px
 *
 * **Валидация данных:**
 * 1. Проверка наличия всех обязательных параметров
 * 2. Валидация формата дат через isValidDate
 * 3. Проверка числовых значений на диапазон 0-100%
 * 4. При невалидных значениях пара столбцов скрывается
 *
 * @param {TBarChartData} props - Свойства компонента
 * @returns {JSX.Element | null} Адаптивный сравнительный график или null при некорректных данных
 *
 * @example
 * // Базовое использование с валидными данными
 * const chartData = [
 *   { prevValue: 30, currentValue: 45, dynamics: 15 },
 *   { prevValue: 50, currentValue: 65, dynamics: 15 }
 * ];
 *
 * <Chart
 *   data={chartData}
 *   prevDate="2023-01-15"
 *   currentDate="2023-02-15"
 * />
 *
 * @example
 * // График с автоматической фильтрацией некорректных данных
 * const mixedData = [
 *   { prevValue: 30, currentValue: 45, dynamics: 15 }, // валидно
 *   { prevValue: -10, currentValue: 150, dynamics: 160 }, // скроется (вне диапазона)
 *   { prevValue: 60, currentValue: 75, dynamics: 15 } // валидно
 * ];
 *
 * <Chart data={mixedData} prevDate="2023-01" currentDate="2023-02" />
 *
 * @example
 * // Интеграция с системой мониторинга
 * const ProgressChart = ({ metrics, startDate, endDate }) => {
 *   const processedData = metrics.map(metric => ({
 *     prevValue: metric.initialScore,
 *     currentValue: metric.finalScore,
 *     dynamics: metric.finalScore - metric.initialScore
 *   }));
 *
 *   return (
 *     <div className="progress-report">
 *       <h3>Динамика показателей</h3>
 *       <Chart
 *         data={processedData}
 *         prevDate={startDate}
 *         currentDate={endDate}
 *       />
 *     </div>
 *   );
 * };
 *
 * @note
 * - Компонент использует хуки useState и useEffect для отслеживания ширины окна
 * - Все значения отображаются в процентах (шкала 0-100%)
 * - Динамика вычисляется как разность: currentValue - prevValue
 * - При невалидных значениях (вне диапазона 0-100) столбцы скрываются (пустые значения)
 * - Стрелки на оси X показывают направление изменения (вверх/вниз)
 * - График использует кастомные компоненты для отрисовки столбцов и меток
 * - Анимация отключена (isAnimationActive={false}) для стабильности отображения
 *
 * @warning
 * 1. Зависит от глобального объекта window, что может вызвать проблемы при SSR
 * 2. Валидация дат использует функцию isValidDate, которая должна быть корректно реализована
 * 3. Компонент не поддерживает вертикальную ориентацию (только горизонтальную)
 * 4. Динамика отображается только на оси X, что может быть неочевидно для пользователей
 * 5. При скрытии пар данных из-за невалидных значений график может стать пустым
 * 6. Кастомные типы TChartDataItem и TBarChartData должны быть корректно определены
 * 7. CSS-переменные (--text-supplementary-color) должны быть определены в глобальных стилях
 *
 * @accessibility
 * - График использует семантическую структуру с кастомными элементами
 * - Числовые метки отображаются над столбцами для лучшей читаемости
 * - Стрелки динамики имеют визуальное представление, но могут быть недостаточно доступными
 * - Отсутствуют ARIA-атрибуты для описания данных графика
 * - Рекомендуется добавить role="img" и aria-label для всего графика
 * - Для скринридеров нужно добавить текстовую альтернативу данных
 *
 * @responsive_behavior
 * **Логика адаптации:**
 * ```javascript
 * // Десктоп (≥1200px):
 * barGap = 20, xAxisPadding = { left: -43, right: -7 }
 *
 * // Планшет (834px-1199px):
 * barGap = 20, xAxisPadding = { left: 22, right: -10 }
 *
 * // Мобильный (<834px):
 * barGap = 4, xAxisPadding = { left: 13, right: 1 }
 * ```
 *
 * **Используемые брейкпоинты:**
 * - 1200px: граница между десктопом и планшетом
 * - 834px: граница между планшетом и мобильным
 *
 * @data_processing
 * **Обработка входных данных:**
 * 1. Валидация обязательных параметров и дат
 * 2. Фильтрация пар значений по диапазону 0-100%
 * 3. Расчет динамики: difference = currentValue - prevValue
 * 4. Формирование массива chartData с динамикой
 *
 * **Формат данных для отображения:**
 * - prevValue: значение предыдущего периода (если валидно)
 * - currentValue: значение текущего периода (если валидно)
 * - dynamics: разница значений (отображается на оси X со стрелкой)
 *
 * @custom_components
 * **CustomBar:** Кастомная отрисовка столбцов со скругленными углами (border-radius: 5px)
 * **CustomTick:** Кастомные метки на оси X со стрелками динамики
 * **formatLabel:** Функция форматирования числовых меток (скрывает невалидные значения)
 *
 * @dependencies
 * - Recharts: библиотека для построения графиков
 * - isValidDate: утилита валидации строк с датами
 * - iconArrowUp/Down: SVG иконки стрелок для динамики
 * - TChartDataItem, TBarChartData: типы данных из внешнего модуля
 *
 * @see Recharts - Библиотека для построения графиков
 * @see isValidDate - Утилита валидации дат
 * @see iconArrowUp.svg - Иконка стрелки вверх
 * @see iconArrowDown.svg - Иконка стрелки вниз
 * @see Charts.module.css - Стили компонента
 *
 * @todo
 * - Добавить поддержку Server-Side Rendering (SSR)
 * - Реализовать fallback для window.innerWidth на сервере
 * - Добавить пропсы для настройки цветовой схемы столбцов
 * - Реализовать анимацию появления столбцов с задержкой
 * - Добавить tooltip с детальной информацией по каждому показателю
 * - Реализовать режим вертикальной ориентации (layout="vertical")
 * - Добавить валидацию и обработку ошибок с уведомлениями пользователя
 * - Реализовать кастомную легенду с датами периодов
 * - Поддержка темной/светлой темы через CSS-переменные
 * - Добавить возможность экспорта графика как изображения
 * - Реализовать масштабирование графика при большом количестве данных
 * - Добавить интерактивность (клик по столбцу для деталей)
 * - Поддержка локализации формата чисел и меток
 * - Реализовать сравнение с нормативными значениями или средними
 * - Добавить линии тренда или прогнозные значения
 * - Реализовать переключение между абсолютными и относительными значениями
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Визуальное сравнение парных данных с указанием динамики изменений
 * 2. Автоматическая адаптация к различным размерам экранов
 * 3. Обеспечение качества данных через строгую валидацию
 * 4. Создание профессиональных отчетов для специалистов
 * 5. Интеграция с системами мониторинга и оценки прогресса
 * 6. Предоставление интуитивно понятного интерфейса для анализа данных
 *
 * @ux_considerations
 * **Преимущества текущей реализации:**
 * - Адаптивность обеспечивает хорошее отображение на всех устройствах
 * - Валидация данных предотвращает отображение некорректной информации
 * - Стрелки динамики дают мгновенное понимание направления изменений
 * - Скрытие невалидных пар сохраняет общую читаемость графика
 *
 * **Области для улучшения:**
 * - Динамика на оси X может быть неочевидной для новых пользователей
 * - Отсутствие легенды может затруднить понимание что означают цвета столбцов
 * - Кастомные метки на оси Y могут быть слишком мелкими на мобильных
 * - Отсутствие подписей к осям может требовать дополнительных пояснений
 *
 * @performance
 * **Оптимизации:**
 * - Использование useResizeObserver (через window.addEventListener)
 * - Отключение анимации Recharts для лучшей производительности
 * - Мемоизация вычисляемых значений через useMemo (рекомендуется добавить)
 *
 * **Потенциальные проблемы:**
 * - Частые ресайзы могут вызвать перерасчет layout
 * - Большое количество данных может замедлить отрисовку
 * - Кастомные компоненты отрисовки могут быть менее оптимизированы чем нативные
 */

export const Chart: React.FC<TBarChartData> = ({
  data,
  prevDate,
  currentDate,
}) => {
  //изменение расстояния между столбиками в зависимости от ширины экрана
  //(вынесла в начало компонента до всех условных вызовов)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let barGap = 20;
  let xAxisPadding = { left: -43, right: -7 };
  if (screenWidth >= 834 && screenWidth < 1200) {
    xAxisPadding = { left: 22, right: -10 };
  } else if (screenWidth < 834) {
    xAxisPadding = { left: 13, right: 1 };
    barGap = 4;
  }

  if (
    !data ||
    !prevDate ||
    !currentDate ||
    !isValidDate(prevDate) ||
    !isValidDate(currentDate)
  )
    return null;

  // проверка входящих данных: если хотя бы одно из значений не является числом в диапазоне от 0 до 100 включительно,
  // то вся пара (и предыдущее значени, и текущее) не отображаются на графике;
  const chartData: TChartDataCalculated[] = data.map(item => {
    const difference = Number(item.currentValue) - Number(item.prevValue);
    if (
      Number(item.currentValue) >= 0 &&
      Number(item.currentValue) <= 100 &&
      Number(item.prevValue) >= 0 &&
      Number(item.prevValue) <= 100
    ) {
      return { ...item, dynamics: difference };
    } else {
      return { ...item, prevValue: '', currentValue: '', dynamics: 0 };
    }
  });

  // так как данные измеряются в процентах
  const maxValue: number = 100;

  const generateTicks = (
    min: number = 0,
    max: number = maxValue,
    count: number
  ): number[] => {
    const ticks = [];
    for (let i = 0; i < count; i++) {
      ticks.push(min + ((max - min) * i) / (count - 1));
    }
    return ticks;
  };

  const ticks = generateTicks(0, 100, 11);

  type TCustomBar = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    fill?: string;
  };

  const CustomBar: React.FC<TCustomBar> = ({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    fill,
  }) => {
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={fill} rx={5} />
      </g>
    );
  };

  const formatLabel = (value: unknown): string => {
    if (Number(value) >= 0 && Number(value) <= 100) {
      return `${value}`;
    } else {
      return '';
    }
  };

  type TCustomTick = {
    x?: number;
    y?: number;
    payload?: {
      value: unknown;
    };
  };

  const CustomTick: React.FC<TCustomTick> = ({
    x = 0,
    y = 0,
    payload = { value: 0 },
  }) => {
    const tickValue = payload.value as number;
    if (!tickValue) return null;

    return (
      <g transform={`translate(${x}, ${y})`}>
        <text
          x={0}
          y={27}
          dy={-10}
          textAnchor="middle"
          fontWeight={400}
          fontSize={15}
          fill="var(--text-supplementary-color, #37474f)"
        >
          {String(Math.abs(tickValue)) + '%'}
        </text>
        <image
          href={tickValue > 0 ? iconArrowUp : iconArrowDown}
          x={-34}
          y={5}
          width={12}
          height={13.4}
        />
      </g>
    );
  };

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          className={styles.bars}
          layout="horizontal"
          margin={{ right: 5, left: -2, top: 8, bottom: 3 }}
          barSize={16}
          barGap={barGap}
        >
          <XAxis
            type="category"
            dataKey="dynamics"
            tick={<CustomTick />}
            axisLine={true}
            tickLine={true}
            padding={xAxisPadding}
          />
          <YAxis
            orientation="left"
            interval={0}
            type="number"
            className={styles.y_axis}
            domain={[0, maxValue]}
            ticks={ticks}
            width="auto"
            axisLine={true}
            tickLine={false}
            tick={{
              textAnchor: 'end',
              fontFamily: 'Nunito Sans',
              fontSize: '12px',
              fontWeight: 500,
              fill: 'var(--text-supplementary-color, #37474f',
            }}
          />
          <CartesianGrid
            horizontal={true}
            vertical={false}
            className={styles.cartesian_grid}
          />
          <Bar
            dataKey="prevValue"
            name={`${prevDate}`}
            className={styles.barPrevious}
            shape={<CustomBar />}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="prevValue"
              position="top"
              className={styles.labelText}
              formatter={formatLabel}
              offset={6}
            />
          </Bar>
          <Bar
            dataKey="currentValue"
            name={`${currentDate}`}
            className={styles.barCurrent}
            shape={<CustomBar />}
            isAnimationActive={false}
          >
            <LabelList
              dataKey="currentValue"
              position="top"
              className={styles.labelText}
              formatter={formatLabel}
              offset={6}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
