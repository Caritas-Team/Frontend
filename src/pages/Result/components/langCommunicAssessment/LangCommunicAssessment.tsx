import React from 'react';
import styles from './LangCommunicAssessment.module.css';
import { Chart } from './Chart/Chart';
import { TwoPieCharts } from './Chart/PieChart';
import { formatDateShort, isValidDate } from '../../../../lib/utils';
import iconArrowUp from '../../../../assets/double-arrow-up.svg';
import iconArrowDown from '../../../../assets/double-arrow-down.svg';
import type { TChartDataItem, TChartData } from './types';

export type TLangCommunicAssessment = TChartData & { className?: string };

const LegendSkillItem: React.FC<TChartDataItem> = ({
  name,
  prevValue,
  currentValue,
}) => {
  if (!name || !prevValue || !currentValue) return;
  const difference: number = Number(currentValue) - Number(prevValue);
  return (
    <li className={styles.legend_skill}>
      <div className={styles.legend_name}>{name}</div>
      <div className={styles.legend_info}>
        <div className={styles.legend_symbol}>
          <span className={styles.legend_letter}>{name.charAt(0)}</span>
        </div>
        <div className={styles.legend_dynamics}>
          <img
            className={styles.legend_icon}
            src={difference > 0 ? iconArrowUp : iconArrowDown}
          />
          <div className={styles.legend_difference}>
            {String(Math.abs(difference) + '%')}
          </div>
        </div>
      </div>
    </li>
  );
};

export const LangCommunicAssessment: React.FC<TLangCommunicAssessment> = ({
  className,
  data,
  initiative,
  prevDate,
  currentDate,
}: TLangCommunicAssessment) => {
  if (
    !data ||
    !initiative ||
    !prevDate ||
    !currentDate ||
    !isValidDate(prevDate) ||
    !isValidDate(currentDate)
  )
    return;

  return (
    <section
      className={
        className ? `${styles.container} ${className}` : styles.container
      }
    >
      <h2 className={styles.title}>Языковая и коммуникативная оценка</h2>
      <div className={styles.content}>
        <h3 className={styles.bar_title}>
          Уровень применения языковых навыков
        </h3>
        <div className={styles.grid_layout}>
          <div className={styles.bar_wrapper}>
            <Chart
              data={data}
              prevDate={prevDate}
              currentDate={currentDate}
            ></Chart>
            <div className={styles.bar_ticks}>
              {data.map((item: TChartDataItem) => (
                <span className={styles.bar_tick}>{item.name}</span>
              ))}
            </div>
          </div>
          <div className={styles.pie_wrapper}>
            <h4 className={styles.pie_title}>Инициатива</h4>
            <TwoPieCharts initiative={initiative}></TwoPieCharts>
          </div>
          <ul className={styles.legend_period}>
            <li className={styles.legend_item}>
              <div
                className={`${styles.legend_color} ${styles.legend_colorPrev}`}
              />
              <span className={styles.legend_value}>
                {formatDateShort(prevDate)}
              </span>
            </li>
            <li className={styles.legend_item}>
              <div
                className={`${styles.legend_color} ${styles.legend_colorCurrent}`}
              />
              <span className={styles.legend_value}>
                {formatDateShort(currentDate)}
              </span>
            </li>
          </ul>
          <ul className={styles.legend_skills}>
            {initiative.map((item: TChartDataItem) => (
              <LegendSkillItem {...item}></LegendSkillItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
