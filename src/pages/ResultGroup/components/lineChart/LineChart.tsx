import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Line,
} from 'recharts';
import styles from './LineChart.module.css';
import iconArrowUp from '../../../../assets/keyboard_double_arrow_up.svg';
import iconArrowDown from '../../../../assets/keyboard_double_arrow_down.svg';
import { formatDateShort, makeShortName, isValidDate } from '@/lib/utils';

type TChartDataItem = {
  name: string;
  prevValue: string;
  currentValue: string;
};

type TChartData = {
  data: TChartDataItem[];
  prevDate: string; // ожидается строка в формате "гггг-мм-дд"
  currentDate: string; // ожидается строка в формате "гггг-мм-дд"
};

type TLineChartDataItem = {
  name: string;
  prevValue: number;
  currentValue: number;
  dynamics: number;
};

export type TLineChartData = {
  data: TLineChartDataItem[];
  prevDate: string;
  currentDate: string;
};

export type TLineChartProps = TChartData & {
  className?: string;
  title?: string;
  subtitle?: string;
};

/**
 * Компонент линейной диаграммы для визуализации динамики показателей по времени
 *
 * Отображает сравнительный линейный график с двумя линиями (предыдущий и текущий периоды),
 * подписями данных и индикаторами динамики изменений. Поддерживает адаптивный дизайн
 * и валидацию входных данных.
 *
 * @component
 * @example
 * // Пример использования
 * const data = [
 *   { name: 'Грамматика', prevValue: '65', currentValue: '75' },
 *   { name: 'Лексика', prevValue: '70', currentValue: '80' }
 * ];
 *
 * <LineChartGroup
 *   title="Языковые навыки"
 *   subtitle="Динамика изменений"
 *   data={data}
 *   prevDate="2024-01-15"
 *   currentDate="2024-03-20"
 * />
 *
 * @typedef {Object} TChartDataItem
 * @property {string} name - Название показателя
 * @property {string} prevValue - Значение в предыдущем периоде (строка 0-100)
 * @property {string} currentValue - Значение в текущем периоде (строка 0-100)
 *
 * @typedef {Object} TChartData
 * @property {TChartDataItem[]} data - Массив данных для отображения
 * @property {string} prevDate - Дата предыдущего периода в формате "гггг-мм-дд"
 * @property {string} currentDate - Дата текущего периода в формате "гггг-мм-дд"
 *
 * @typedef {Object} TLineChartDataItem
 * @property {string} name - Название показателя
 * @property {number} prevValue - Числовое значение предыдущего периода
 * @property {number} currentValue - Числовое значение текущего периода
 * @property {number} dynamics - Разница между текущим и предыдущим значением
 *
 * @typedef {Object} TLineChartData
 * @property {TLineChartDataItem[]} data - Преобразованные данные для графика
 * @property {string} prevDate - Дата предыдущего периода
 * @property {string} currentDate - Дата текущего периода
 *
 * @typedef {Object} TLineChartProps
 * @property {string} [className] - Дополнительные CSS-классы для контейнера
 * @property {string} [title] - Заголовок секции
 * @property {string} [subtitle] - Подзаголовок секции
 * @property {TChartDataItem[]} data - Входные данные для отображения
 * @property {string} prevDate - Дата предыдущего периода
 * @property {string} currentDate - Дата текущего периода
 *
 * @param {TLineChartProps} props - Пропсы компонента
 * @param {string} [props.className] - Дополнительный CSS-класс для стилизации
 * @param {string} [props.title] - Основной заголовок компонента
 * @param {string} [props.subtitle] - Подзаголовок компонента
 * @param {TChartDataItem[]} props.data - Массив данных для построения графика
 * @param {string} props.prevDate - Дата предыдущей оценки (валидная дата)
 * @param {string} props.currentDate - Дата текущей оценки (валидная дата)
 *
 * @returns {JSX.Element|null} Возвращает секцию с линейной диаграммой или null при некорректных данных
 *
 * @description
 * Компонент состоит из трех частей:
 * 1. Основной линейный график с двумя линиями (предыдущий и текущий периоды)
 * 2. Кастомная легенда с цветовыми метками и датами
 * 3. Подписи (ticks) с названиями показателей и индикаторами динамики
 *
 * @architecture
 * Компонент организован как три вложенных компонента:
 * - `LineChartGroup`: основной компонент-обертка
 * - `LineChartLang`: компонент графика с использованием Recharts
 * - `Tick`: компонент подписи с динамикой
 *
 * @features
 * #### Адаптивность:
 * - Автоматическое изменение отступов осей X в зависимости от ширины экрана
 * - Три брейкпоинта: 1200px, 834px и мобильная версия
 * - Дебаунс ресайза окна (250ms) для оптимизации производительности
 *
 * #### Валидация данных:
 * - Проверка корректности дат с помощью `isValidDate`
 * - Валидация числовых значений (должны быть 0-100)
 * - Если значения некорректны, пара данных не отображается на графике
 *
 * #### Графические элементы:
 * - Две линии: фиолетовая (предыдущий период) и зеленая (текущий период)
 * - Точки данных соответствуют цветам линий
 * - Сетка только с горизонтальными линиями
 * - Левая ось Y с тиками от 0 до 100 с шагом 10%
 *
 * #### Динамика изменений:
 * - Отображается стрелкой вверх/вниз рядом с каждым показателем
 * - Показывает абсолютное значение изменения в процентах
 * - Если изменение вне диапазона [-100, 100], отображается "-"
 *
 * @styles
 * Цвета определяются через CSS-переменные:
 * - --chart-previous-period-data-color: фиолетовый (#8550f6)
 * - --chart-current-data-color: зеленый (#67f4b1)
 * - --text-supplementary-color: цвет текста (#37474f)
 *
 * @dependencies
 * - `recharts`: для построения графиков
 * - `lodash.debounce`: для оптимизации обработки ресайза
 * - `@/lib/utils`: утилиты форматирования дат и сокращения строк
 *
 * @hooks
 * - `useState`: для отслеживания ширины экрана
 * - `useEffect`: для подписки на события resize и очистки
 * - `useMemo`: для вычисления адаптивных отступов осей
 *
 * @validation-rules
 * 1. Даты должны быть валидными
 * 2. Значения должны быть строками, конвертируемыми в числа 0-100
 * 3. Если prevValue или currentValue вне диапазона 0-100, пара игнорируется
 *
 * @formatting
 * - Даты форматируются через `formatDateShort`
 * - Длинные названия сокращаются через `makeShortName`
 * - Динамика отображается с символом процента
 *
 * @accessibility
 * - Иконки динамики имеют alt-тексты
 * - Для длинных названий есть сокращенная версия
 *
 * @note Для значений динамики от -100% до 100% отображаются стрелки и значения
 * @note При нулевой динамике стрелка не отображается, но значение показывается
 * @note Компонент возвращает null при отсутствии обязательных данных
 */

// компонент диаграммы (области построения, осей и легенды)
const LineChartLang: React.FC<TLineChartData> = ({
  data,
  prevDate,
  currentDate,
}) => {
  // состояние ширины экрана - для изменения параметров svg-компонентов диаграммы,
  // на которые нельзя повлиять через css-стили и медиазапросы
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = debounce(() => {
      setScreenWidth(window.innerWidth);
    }, 250);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, []);

  const xAxisPadding = useMemo(() => {
    if (screenWidth >= 1200) {
      return { left: 177, right: 183 };
    } else {
      if (screenWidth >= 834) {
        return { left: 98, right: 115 };
      } else {
        return { left: 25, right: 20 };
      }
    }
  }, [screenWidth]);

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

  type TCustomLegendItem = {
    value: string;
    dataKey: string;
  };

  type TCustomLegend = {
    payload?: TCustomLegendItem[];
  };

  const CustomLegend: React.FC<TCustomLegend> = ({ payload }) => {
    if (payload?.length === 0 || !payload) return null;
    return (
      <div className={styles.legend_layout}>
        <ul className={styles.legend_wrapper}>
          {Array.from(payload)
            .reverse()
            .map(item => {
              return (
                <li className={styles.legend_item} key={item.value}>
                  <div
                    className={
                      item.dataKey === 'prevValue'
                        ? `${styles.legend_mark} ${styles.prev}`
                        : item.dataKey === 'currentValue'
                          ? `${styles.legend_mark} ${styles.current}`
                          : styles.legend_mark
                    }
                  ></div>
                  <span className={styles.legend_text}>{item.value}</span>
                </li>
              );
            })}
        </ul>
      </div>
    );
  };

  return (
    <ResponsiveContainer className={styles.chart_container}>
      <LineChart
        className={styles.line_chart}
        responsive
        data={data}
        margin={{ top: 5, bottom: 90 }}
      >
        <CartesianGrid
          className={styles.chart_grid}
          vertical={false}
          horizontal={true}
          strokeDasharray="none"
        />
        <XAxis
          className={styles.chart_axis}
          type="category"
          dataKey="name"
          tick={false}
          axisLine={true}
          tickLine={false}
          padding={xAxisPadding}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          className={styles.chart_axis}
          domain={[0, maxValue]}
          tick={false}
          axisLine={true}
          width="auto"
        />
        <YAxis
          orientation="left"
          interval={0}
          type="number"
          dataKey="prevValue"
          className={styles.chart_axis}
          domain={[0, maxValue]}
          ticks={ticks}
          width="auto"
          axisLine={true}
          tickLine={false}
          tick={{
            textAnchor: 'end',
            fontFamily: 'Nunito Sans',
            fontSize: '12px',
            fontWeight: 600,
            fill: 'var(--text-supplementary-color, #37474f',
          }}
          tickMargin={4}
        />
        <Legend content={<CustomLegend />} />
        <Line
          className={`${styles.chart_line} ${styles.prev}`}
          type="linear"
          dataKey="prevValue"
          name={formatDateShort(prevDate)}
          dot={{
            fill: 'var(--chart-previous-period-data-color, #8550f6)',
            stroke: 'var(--chart-previous-period-data-color, #8550f6)',
          }}
          activeDot={false}
          isAnimationActive={false}
        />
        <Line
          className={`${styles.chart_line} ${styles.current}`}
          type="linear"
          dataKey="currentValue"
          name={formatDateShort(currentDate)}
          dot={{
            fill: 'var(--chart-current-data-color, #67f4b1)',
            stroke: 'var(--chart-current-data-color, #67f4b1)',
          }}
          activeDot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

//компонент подписей к диаграмме
const Tick: React.FC<TLineChartDataItem> = ({ name, dynamics }) => {
  return (
    <div className={styles.chart_tick}>
      <div className={styles.tick_wrapper}>
        {dynamics <= 100 && dynamics >= -100 ? (
          <>
            {dynamics !== 0 && (
              <img
                className={styles.tick_icon}
                src={dynamics > 0 ? iconArrowUp : iconArrowDown}
                alt={
                  dynamics > 0
                    ? 'маркер положительной динамики'
                    : 'маркер отрицательной динамики'
                }
              />
            )}
            <span className={styles.tick_value}>
              {String(Math.abs(dynamics)) + '%'}
            </span>
          </>
        ) : (
          <span className={styles.tick_value}>-</span>
        )}
      </div>
      <span
        className={
          name.length <= 25
            ? styles.tick_name
            : `${styles.tick_name} ${styles.tick_pressedName}`
        }
      >
        {name}
      </span>
      <span className={styles.tick_nameShort}>
        {makeShortName(name, 10, 8)}
      </span>
    </div>
  );
};

// итоговый компонент секции с линейной диаграммой
export const LineChartGroup: React.FC<TLineChartProps> = ({
  className,
  title,
  subtitle,
  data,
  prevDate,
  currentDate,
}) => {
  if (
    !data ||
    !prevDate ||
    !currentDate ||
    !isValidDate(prevDate) ||
    !isValidDate(currentDate)
  )
    return null;

  // проверка входящих данных: если хотя бы одно из значений не является числом в диапазоне от 0 до 100 включительно,
  // то вся пара (и предыдущее значение, и текущее) не отображаются на графике;
  const chartData: TLineChartDataItem[] = data.map(item => {
    const numPrevValue = Number(item.prevValue);
    const numCurrentValue = Number(item.currentValue);
    const difference = numCurrentValue - numPrevValue;
    if (
      numPrevValue >= 0 &&
      numPrevValue <= 100 &&
      numCurrentValue >= 0 &&
      numCurrentValue <= 100
    ) {
      return {
        ...item,
        prevValue: numPrevValue,
        currentValue: numCurrentValue,
        dynamics: difference,
      };
    } else {
      return { ...item, prevValue: NaN, currentValue: NaN, dynamics: NaN };
    }
  });

  return (
    <section
      className={
        className ? `${styles.container} ${className}` : styles.container
      }
    >
      {title && <h2 className={styles.title}>{title}</h2>}
      <div
        className={
          subtitle
            ? styles.content
            : `${styles.content} ${styles.content_withoutSubtitle}`
        }
      >
        <h3 className={styles.subtitle}>{subtitle}</h3>
        <div className={styles.chart_wrapper}>
          <LineChartLang
            data={chartData}
            prevDate={prevDate}
            currentDate={currentDate}
          ></LineChartLang>
          <div
            className={
              subtitle
                ? styles.ticks
                : `${styles.ticks} ${styles.ticks_withoutSubtitle}`
            }
          >
            {chartData.map(item => {
              return <Tick key={item.name} {...item}></Tick>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
