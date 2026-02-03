import React from 'react';
import styles from './LangCommunicAssessment.module.css';
import { Chart } from './Chart/Chart';
import { TwoPieCharts } from './Chart/PieChart';
import {
  formatDateShort,
  isValidDate,
  makeShortName,
} from '../../../../lib/utils';
import iconArrowUp from '../../../../assets/double-arrow-up.svg';
import iconArrowDown from '../../../../assets/double-arrow-down.svg';
import type { TChartDataItem, TChartData } from './types';

export type TLangCommunicAssessment = TChartData & { className?: string };

/**
 * Компонент "Языковая и коммуникативная оценка"
 *
 * Отображает визуализацию прогресса языковых и коммуникативных навыков
 * с использованием столбчатой диаграммы и двойной круговой диаграммы.
 *
 * @component
 * @example
 * const data = [
 *   { name: 'Грамматика', prevValue: 65, currentValue: 75 },
 *   { name: 'Лексика', prevValue: 70, currentValue: 80 }
 * ];
 *
 * const initiative = [
 *   { name: 'Активность', prevValue: 60, currentValue: 70 }
 * ];
 *
 * return (
 *   <LangCommunicAssessment
 *     data={data}
 *     initiative={initiative}
 *     prevDate="2024-01-15"
 *     currentDate="2024-03-20"
 *   />
 * );
 *
 * @typedef {Object} TChartDataItem
 * @property {string} name - Название навыка/параметра
 * @property {number|string} prevValue - Значение на предыдущую дату
 * @property {number|string} currentValue - Значение на текущую дату
 *
 * @typedef {Object} TChartData
 * @property {TChartDataItem[]} data - Данные для столбчатой диаграммы
 * @property {TChartDataItem[]} initiative - Данные для круговой диаграммы "Инициатива"
 * @property {string|Date} prevDate - Дата предыдущей оценки
 * @property {string|Date} currentDate - Дата текущей оценки
 *
 * @typedef {TChartData & { className?: string }} TLangCommunicAssessment
 * @property {string} [className] - Дополнительные CSS-классы для контейнера
 *
 * @param {TLangCommunicAssessment} props - Пропсы компонента
 * @param {TChartDataItem[]} props.data - Массив данных для отображения уровней навыков
 * @param {TChartDataItem[]} props.initiative - Массив данных для отображения инициативы
 * @param {string|Date} props.prevDate - Дата предыдущей оценки (форматируемая дата)
 * @param {string|Date} props.currentDate - Дата текущей оценки (форматируемая дата)
 * @param {string} [props.className] - Дополнительный CSS-класс для стилизации
 *
 * @returns {JSX.Element|null} Возвращает разметку компонента или null при некорректных данных
 *
 * @description
 * Компонент включает:
 * 1. Столбчатую диаграмму (Chart) для сравнения уровней навыков между двумя датами
 * 2. Двойную круговую диаграмму (TwoPieCharts) для визуализации показателей инициативы
 * 3. Легенду с периодами оценки
 * 4. Список навыков с отображением динамики изменений
 *
 * @requires Chart - Компонент столбчатой диаграммы
 * @requires TwoPieCharts - Компонент двойной круговой диаграммы
 * @requires formatDateShort - Функция форматирования даты
 * @requires isValidDate - Функция проверки корректности даты
 * @requires makeShortName - Функция сокращения длинных названий
 *
 * @todo Добавить обработку ошибок при некорректных значениях данных
 * @todo Реализовать адаптивную верстку для мобильных устройств
 * @note Компонент возвращает null при отсутствии обязательных данных или некорректных датах
 */

const LegendSkillItem: React.FC<TChartDataItem> = ({
  name,
  prevValue,
  currentValue,
}) => {
  if (!name || !prevValue || !currentValue) return null;
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
            {String(Math.abs(difference)) + '%'}
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
    return null;

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
                <span className={styles.bar_tick} key={item.name}>
                  {makeShortName(item.name, 10, 8)}
                </span>
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
              <LegendSkillItem key={item.name} {...item}></LegendSkillItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
