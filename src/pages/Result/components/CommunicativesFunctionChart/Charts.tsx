import styles from './Charts.module.css';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import type { JSX } from 'react';

/**
 * Интерфейс элемента данных для графика
 * @interface ChartDataItem
 * @property {string} name - Название категории/показателя
 * @property {number} previous - Значение предыдущего периода
 * @property {number} current - Значение текущего периода
 */

export interface ChartDataItem {
  name: string;
  previous: number;
  current: number;
}

/**
 * Тип пропсов для компонента Charts
 * @typedef {Object} ChartsProps
 * @property {ChartDataItem[]} data - Массив данных для отображения на графике
 * @property {string} prevDate - Метка для данных предыдущего периода (отображается в легенде)
 * @property {string} currentDate - Метка для данных текущего периода (отображается в легенде)
 */

interface ChartsProps {
  data: ChartDataItem[];
  prevDate: string;
  currentDate: string;
}

/**
 * Вертикальный сравнительный график с двумя наборами данных
 *
 * @component Charts
 * @description
 * Компонент вертикальной столбчатой диаграммы (гистограммы) для визуального сравнения
 * показателей между двумя периодами времени. Использует библиотеку Recharts для
 * отрисовки и предоставляет кастомную стилизацию через CSS-модули.
 *
 * **Ключевые особенности:**
 * - Вертикальная ориентация (layout="vertical") - категории по Y, значения по X
 * - Два набора столбцов для сравнения "предыдущий" и "текущий" периоды
 * - Скругленные столбцы с кастомной отрисовкой
 * - Числовые метки значений справа от столбцов
 * - Кастомная легенда с цветовыми маркерами
 * - Адаптивный контейнер (ResponsiveContainer)
 * - Фиксированная шкала от 0 до 100% с делениями
 *
 * **Визуальная структура:**
 * 1. Вертикальная ось (Y): названия категорий (скрыта, так как используются метки в данных)
 * 2. Горизонтальная ось (X): шкала значений от 0 до 100%
 * 3. Два набора столбцов: предыдущий и текущий периоды
 * 4. Сетка для удобного чтения значений
 * 5. Легенда с цветовыми индикаторами и датами
 *
 * @param {ChartsProps} props - Свойства компонента
 * @returns {JSX.Element} Вертикальный сравнительный график
 *
 * @example
 * // Базовое использование
 * const chartData = [
 *   { name: 'Показатель 1', previous: 30, current: 45 },
 *   { name: 'Показатель 2', previous: 50, current: 65 },
 *   { name: 'Показатель 3', previous: 20, current: 35 }
 * ];
 *
 * <Charts
 *   data={chartData}
 *   prevDate="Январь 2023"
 *   currentDate="Февраль 2023"
 * />
 *
 * @example
 * // Динамическое обновление данных
 * const PerformanceChart = ({ metrics, startDate, endDate }) => {
 *   const chartData = metrics.map(metric => ({
 *     name: metric.label,
 *     previous: metric.previousValue,
 *     current: metric.currentValue
 *   }));
 *
 *   return (
 *     <div className="chart-container">
 *       <h3>Динамика показателей</h3>
 *       <Charts
 *         data={chartData}
 *         prevDate={startDate}
 *         currentDate={endDate}
 *       />
 *     </div>
 *   );
 * };
 *
 * @example
 * // Использование с реальными данными диагностики
 * const DiagnosticChart = ({ patientData }) => {
 *   const categories = ['Коммуникация', 'Социализация', 'Поведение'];
 *
 *   const chartData = categories.map(category => ({
 *     name: category,
 *     previous: patientData.previous[category] || 0,
 *     current: patientData.current[category] || 0
 *   }));
 *
 *   return (
 *     <Charts
 *       data={chartData}
 *       prevDate="Предыдущая диагностика"
 *       currentDate="Текущая диагностика"
 *     />
 *   );
 * };
 *
 * @note
 * - Использует библиотеку Recharts (должна быть установлена как зависимость)
 * - Все значения отображаются в процентах (шкала 0-100%)
 * - Столбцы имеют скругленные углы (border-radius: 10px)
 * - Легенда отображается в обратном порядке (текущий период сверху)
 * - График полностью адаптивен благодаря ResponsiveContainer
 * - Тип данных строго типизирован через TypeScript интерфейсы
 * - Для кастомной отрисовки столбцов используется функция CustomBarShape
 *
 * @warning
 * 1. Библиотека Recharts должна быть установлена и импортирована корректно
 * 2. Все значения должны быть в диапазоне 0-100 для корректного отображения
 * 3. Шкала жестко ограничена 0-100%, значения выше 100 не отобразятся
 * 4. Количество категорий может повлиять на читаемость при большом количестве
 * 5. Компонент не поддерживает горизонтальную прокрутку для многих категорий
 * 6. Отсутствует анимация появления/изменения данных
 * 7. Легенда может перекрывать данные при недостаточной высоте контейнера
 *
 * @accessibility
 * - График является визуальным представлением данных и должен сопровождаться текстовой сводкой
 * - Цвета столбцов имеют достаточный контраст для различия
 * - Легенда четко объясняет что означают цвета
 * - Числовые метки позволяют точно определить значения
 * - Для скринридеров рекомендуется добавить скрытый текст с описанием данных
 * - Рассмотреть добавление aria-label для всего графика
 *
 * @chart_configuration
 * **Оси:**
 * - XAxis: числовая ось от 0 до 100 с делениями каждые 10%
 * - YAxis: категориальная ось (скрыта, названия берутся из data.name)
 *
 * **Столбцы:**
 * - Bar (previous): данные предыдущего периода, кастомная форма, класс .barPrevious
 * - Bar (current): данные текущего периода, кастомная форма, класс .barCurrent
 *
 * **Сетка:**
 * - CartesianGrid: вертикальные линии через каждые 10%
 *
 * **Легенда:**
 * - Кастомный рендер с цветовыми маркерами
 * - Расположение внизу графика
 *
 * @customization
 * **CSS-классы для стилизации:**
 * - .container: основной контейнер графика
 * - .barPrevious: стили для столбцов предыдущего периода
 * - .barCurrent: стили для столбцов текущего периода
 * - .labelText: стили для числовых меток
 * - .legendContainer: контейнер легенды
 * - .legendItem: элемент легенды
 * - .legendMarker: цветовой маркер легенды
 * - .legendMarkerPrevious: стиль маркера предыдущего периода
 * - .legendMarkerCurrent: стиль маркера текущего периода
 * - .legendText: текст легенды
 *
 * @dependencies
 * - Recharts: библиотека для построения графиков
 *   - BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LabelList
 *
 * @see Recharts - Библиотека для построения графиков
 * @see Charts.module.css - Стили компонента
 *
 * @todo
 * - Добавить пропсы для настройки цветовой схемы столбцов
 * - Реализовать анимацию появления столбцов
 * - Добавить tooltip с дополнительной информацией при наведении
 * - Реализовать возможность изменения диапазона шкалы (не только 0-100)
 * - Добавить поддержку горизонтальной прокрутки для многих категорий
 * - Реализовать режим группировки столбцов (grouped) рядом с режимом наложения
 * - Добавить пропс для отображения/скрытия числовых меток
 * - Реализовать кастомные форматеры для осей и меток
 * - Добавить возможность экспорта графика как изображения
 * - Поддержка темной/светлой темы
 * - Реализовать выбор типа графика (вертикальный/горизонтальный)
 * - Добавить интерактивность (клик по столбцу для деталей)
 * - Реализовать масштабирование графика
 * - Добавить линии тренда или средние значения
 * - Поддержка локализации (формат чисел, дат в легенде)
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Визуальное сравнение показателей между двумя временными точками
 * 2. Предоставление количественной оценки изменений
 * 3. Упрощение анализа многомерных данных через графическое представление
 * 4. Создание профессиональных отчетов и дашбордов
 * 5. Интеграция с медицинской/диагностической системой данных
 * 6. Обеспечение консистентного стиля графиков во всем приложении
 *
 * @data_visualization_principles
 * График следует принципам эффективной визуализации данных:
 * 1. Четкое сравнение через парные столбцы
 * 2. Единая шкала для всех категорий
 * 3. Цветовое кодирование для различения периодов
 * 4. Числовые метки для точных значений
 * 5. Легенда для объяснения кодирования
 * 6. Сетка для облегчения чтения значений
 *
 * @performance
 * Recharts оптимизирован для производительности, но:
 * - Большое количество категорий (>50) может повлиять на отрисовку
 * - Анимации могут замедлять работу на слабых устройствах
 * - ResponsiveContainer использует resize observer, что может быть ресурсоемким
 * - Рекомендуется использовать мемоизацию данных при частых обновлениях
 */

export const Charts: React.FC<ChartsProps> = ({
  data,
  prevDate,
  currentDate,
}: ChartsProps): JSX.Element => {
  const roundedMax = 100;
  const ticks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const CustomBarShape = (props: unknown) => {
    const barProps = props as {
      x?: number;
      y?: number;
      width?: number;
      height?: number;
      fill?: string;
    };

    const { x = 0, y = 0, width = 0, height = 0, fill } = barProps;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          opacity={0.8}
          rx={10}
        />
      </g>
    );
  };

  const formatLabel = (value: unknown): string => {
    if (typeof value === 'number') {
      return `${value}`;
    }
    return '';
  };

  // Используем правильный тип для legend из Recharts
  interface LegendEntry {
    value: string;
    type?: string;
    color?: string;
    id?: string;
  }

  const renderLegend = (props: unknown) => {
    // Приводим тип к нужному интерфейсу
    const legendProps = props as { payload?: LegendEntry[] };
    const { payload } = legendProps;

    const reversedPayload = payload ? [...payload].reverse() : [];

    return (
      <div className={styles.legendContainer}>
        {reversedPayload.map((entry: LegendEntry, index: number) => (
          <div key={`item-${index}`} className={styles.legendItem}>
            <div
              className={`${styles.legendMarker} ${
                entry.value === currentDate
                  ? styles.legendMarkerCurrent
                  : styles.legendMarkerPrevious
              }`}
            />
            <span className={styles.legendText}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 20, left: 0, bottom: 15 }}
          barSize={16}
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            vertical={true}
            stroke="#e0e0e0"
          />

          <XAxis
            type="number"
            domain={[0, roundedMax]}
            ticks={ticks}
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#e0e0e0' }}
            tickLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={0}
            tick={false}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <Bar
            dataKey="previous"
            name={`${prevDate}`}
            className={styles.barPrevious}
            shape={CustomBarShape}
          >
            <LabelList
              dataKey="previous"
              position="right"
              className={styles.labelText}
              formatter={formatLabel}
              offset={8}
            />
          </Bar>

          <Bar
            dataKey="current"
            name={`${currentDate}`}
            className={styles.barCurrent}
            shape={CustomBarShape}
          >
            <LabelList
              dataKey="current"
              position="right"
              className={styles.labelText}
              formatter={formatLabel}
              offset={8}
            />
          </Bar>

          <Legend
            content={renderLegend}
            verticalAlign="bottom"
            height={19}
            wrapperStyle={{
              position: 'absolute',
              width: '100%',
              bottom: 20,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
