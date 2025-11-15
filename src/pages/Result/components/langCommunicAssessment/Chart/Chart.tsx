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

type TChartDataCalculated = TChartDataItem & { dynamics: number };

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
