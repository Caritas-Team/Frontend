import styles from './Charts.module.css';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import type { JSX } from 'react';

export interface ChartDataItem {
  name: string;
  previous: number;
  current: number;
}

interface ChartsProps {
  data: ChartDataItem[];
  prevDate: string;
  currentDate: string;
}

// Используем типы из Recharts
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataItem;
    value?: number;
    dataKey?: string;
  }>;
  label?: string;
}

export const Charts: React.FC<ChartsProps> = ({
  data,
  prevDate,
  currentDate,
}: ChartsProps): JSX.Element => {
  const chartHeight = data.length * 60 + 100;

  const maxValue = Math.max(
    ...data.map(item => Math.max(item.previous, item.current))
  );
  const roundedMax = Math.ceil(maxValue / 10) * 10;

  const generateTicks = () => {
    const step = roundedMax / 10;
    const ticks = [];
    for (let i = 0; i <= 10; i++) {
      ticks.push(Math.round(i * step));
    }
    return ticks;
  };

  const ticks = generateTicks();

  // Используем более широкий тип для совместимости с Recharts
  const CustomBarShape = (props: unknown) => {
    // Приводим тип к нужному интерфейсу
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

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipLabel}>{data.name}</p>
          <p className={`${styles.tooltipValue} ${styles.tooltipValueCurrent}`}>
            Текущий: {data.current}%
          </p>
          <p
            className={`${styles.tooltipValue} ${styles.tooltipValuePrevious}`}
          >
            Предыдущий: {data.previous}%
          </p>
        </div>
      );
    }
    return null;
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
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 40, left: 20, bottom: 60 }}
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
          <Tooltip content={<CustomTooltip />} />
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

          <Legend content={renderLegend} verticalAlign="bottom" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
