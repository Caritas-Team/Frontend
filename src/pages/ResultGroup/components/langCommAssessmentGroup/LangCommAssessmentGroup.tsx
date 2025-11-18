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
import styles from './LangCommAssessmentGroup.module.css';
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

type TLineChartData = {
  data: TLineChartDataItem[];
  prevDate: string;
  currentDate: string;
};

type TLangCommAssessmentGroup = TChartData & { className?: string };

// компонент диаграммы
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
          orientation="left"
          interval={0}
          type="number"
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
          activeDot={false}
          isAnimationActive={false}
        />
        <Line
          className={`${styles.chart_line} ${styles.current}`}
          type="linear"
          dataKey="currentValue"
          name={formatDateShort(currentDate)}
          activeDot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

//компонент подписей к диаграмме
const Tick: React.FC<TLineChartDataItem> = ({ name, dynamics }) => {
  console.log(dynamics);
  return (
    <div className={styles.chart_tick} key={name}>
      <div className={styles.tick_wrapper}>
        <img
          className={styles.tick_icon}
          src={dynamics > 0 ? iconArrowUp : dynamics < 0 ? iconArrowDown : ''}
          alt={
            dynamics > 0
              ? 'маркер положительной динамики'
              : dynamics < 0
                ? 'маркер отрицательной динамики'
                : ''
          }
        />
        <span className={styles.tick_value}>
          {dynamics >= -100 && dynamics <= 100
            ? String(Math.abs(dynamics)) + '%'
            : '-'}
        </span>
      </div>
      <span className={styles.tick_name}>{name}</span>
      <span className={styles.tick_nameShort}>
        {makeShortName(name, 10, 8)}
      </span>
    </div>
  );
};

// итоговый компонент секции
export const LangCommAssessmentGroup: React.FC<TLangCommAssessmentGroup> = ({
  className,
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
      <h2 className={styles.title}>Языковая и коммуникативная оценка</h2>
      <div className={styles.content}>
        <h3 className={styles.subtitle}>Уровень применения языковых навыков</h3>
        <div className={styles.chart_wrapper}>
          <LineChartLang
            data={chartData}
            prevDate={prevDate}
            currentDate={currentDate}
          ></LineChartLang>
        </div>
      </div>
      <div className={styles.ticks}>
        {chartData.map(item => {
          return <Tick {...item}></Tick>;
        })}
      </div>
    </section>
  );
};
