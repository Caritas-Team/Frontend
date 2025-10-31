import styles from './CommunicatioveFunction.module.css';
import React from 'react';
import type { JSX } from 'react';
import { Charts } from './Charts';
import type { ChartDataItem } from './Charts';
import arrowUp from './icons/keyboard_double_arrow_up.svg';
import arrowDown from './icons/keyboard_double_arrow_down.svg';

type BarData = {
  name: string;
  value: number;
};

type CommunicationType = {
  GetWhatYouWant: BarData;
  SocialInteraction: BarData;
  ExchangeOfInformation: BarData;
  Control: BarData;
};

interface CommunicatioveFunctionProps {
  prevDate: string;
  currentDate: string;
  dataPrevData: CommunicationType;
  dataCurrentData: CommunicationType;
}

export const CommunicativeFunction: React.FC<CommunicatioveFunctionProps> = (
  props: CommunicatioveFunctionProps
): JSX.Element => {
  const { prevDate, currentDate, dataCurrentData, dataPrevData } = props;

  const chartData: ChartDataItem[] = [
    {
      name: dataCurrentData.ExchangeOfInformation.name,
      previous: dataPrevData.ExchangeOfInformation.value,
      current: dataCurrentData.ExchangeOfInformation.value,
    },
    {
      name: dataCurrentData.SocialInteraction.name,
      previous: dataPrevData.SocialInteraction.value,
      current: dataCurrentData.SocialInteraction.value,
    },
    {
      name: dataCurrentData.GetWhatYouWant.name,
      previous: dataPrevData.GetWhatYouWant.value,
      current: dataCurrentData.GetWhatYouWant.value,
    },
    {
      name: dataCurrentData.Control.name,
      previous: dataPrevData.Control.value,
      current: dataCurrentData.Control.value,
    },
  ];

  const calculateChange = (current: number, previous: number): number => {
    if (previous === 0) {
      return current > 0 ? 100 : 0;
    }

    const change = ((current - previous) / previous) * 100;
    return Math.abs(Math.round(change));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Коммуникативные функции</h2>

      <div className={styles.chartWrapper}>
        <div className={styles.chartTitle}>
          <ul className={styles.title_chart__list}>
            <li className={styles.chart__item}>Обмен информацией</li>
            <li className={styles.chart__item}>Социльное взаимодействие</li>
            <li className={styles.chart__item}>
              Получение желаемого результата
            </li>
            <li className={styles.chart__item}>Контроль</li>
          </ul>
        </div>
        <div className={styles.chartProcent}>
          <ul className={styles.chart__list}>
            <li className={styles.chart__item}>
              <img
                src={
                  dataCurrentData.ExchangeOfInformation.value >
                  dataPrevData.ExchangeOfInformation.value
                    ? arrowUp
                    : arrowDown
                }
                alt="arrow"
              />
              {calculateChange(
                dataCurrentData.ExchangeOfInformation.value,
                dataPrevData.ExchangeOfInformation.value
              )}
              %
            </li>
            <li className={styles.chart__item}>
              <img
                src={
                  dataCurrentData.SocialInteraction.value >
                  dataPrevData.SocialInteraction.value
                    ? arrowUp
                    : arrowDown
                }
                alt="arrow"
              />
              {calculateChange(
                dataCurrentData.SocialInteraction.value,
                dataPrevData.SocialInteraction.value
              )}
              %
            </li>
            <li className={styles.chart__item}>
              <img
                src={
                  dataCurrentData.GetWhatYouWant.value >
                  dataPrevData.GetWhatYouWant.value
                    ? arrowUp
                    : arrowDown
                }
                alt="arrow"
              />
              {calculateChange(
                dataCurrentData.GetWhatYouWant.value,
                dataPrevData.GetWhatYouWant.value
              )}
              %
            </li>
            <li className={styles.chart__item}>
              <img
                src={
                  dataCurrentData.Control.value > dataPrevData.Control.value
                    ? arrowUp
                    : arrowDown
                }
                alt="arrow"
              />
              {calculateChange(
                dataCurrentData.Control.value,
                dataPrevData.Control.value
              )}
              %
            </li>
          </ul>
        </div>
        <Charts
          data={chartData}
          prevDate={prevDate}
          currentDate={currentDate}
        />
      </div>
    </div>
  );
};
