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

export const Charts: React.FC<ChartsProps> = ({
  data,
  prevDate,
  currentDate,
}: ChartsProps): JSX.Element => {
  const chartHeight = data.length * 74 + 100;

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
