import React from 'react';
import styles from './PieChart.module.css';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { type PieLabelRenderProps } from 'recharts';
import { type TTwoPieCharts } from '../types';

type TPieChartData = {
  name: string;
  prevValue: number;
  currentValue: number;
};

export const TwoPieCharts: React.FC<TTwoPieCharts> = ({ initiative }) => {
  if (!initiative) return null;

  // проверка входящих данных: если хотя бы одно из значений не является числом в диапазоне от 0 до 100 включительно,
  // то вся пара (и предыдущее значени, и текущее) не отображаются на графике
  const pieChartData: TPieChartData[] = initiative.map(item => {
    const numPrevValue = Number(item.prevValue);
    const numCurrentValue = Number(item.currentValue);
    if (
      numCurrentValue >= 0 &&
      numCurrentValue <= 100 &&
      numPrevValue >= 0 &&
      numPrevValue <= 100
    ) {
      return {
        ...item,
        prevValue: numPrevValue,
        currentValue: numCurrentValue,
      };
    } else {
      return { ...item, prevValue: 0, currentValue: 0 };
    }
  });

  if (!pieChartData) return null;

  const CustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    index,
  }: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180;
    // отступ от внешнего края сегмента
    const offset = 5;
    // радиус белого кружка
    const circleRadius = 10;
    const radius = Number(outerRadius) - circleRadius - offset;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
    // формат подписи данных - первая буква названия категории
    const firstLetter = initiative[index].name.charAt(0);
    return (
      <g>
        <circle
          cx={x}
          cy={y}
          r={circleRadius}
          fill="var(--background-main-color, #fff)"
        />
        <text
          x={x}
          y={y}
          fill="var(--text-main-color, #141414)"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: '16px', fontWeight: '700' }}
        >
          {firstLetter}
        </text>
      </g>
    );
  };

  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="prevValue"
            className={styles.pie_prev}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={58}
            isAnimationActive={false}
          />
        </PieChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="currentValue"
            className={styles.pie_current}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={58}
            isAnimationActive={false}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
