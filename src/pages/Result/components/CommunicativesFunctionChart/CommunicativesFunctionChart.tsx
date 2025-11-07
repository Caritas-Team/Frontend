/* 
Пример использования элемента CommunicativesFunctionChart

// Даты
  const prevDate = '15.04.2025';
  const currentDate = '01.05.2025';
  // Данные для предыдущего периода (01.05.2025)
  const dataPrevData: CommunicationType = {
    ExchangeOfInformation: {
      name: 'Обмен информацией',
      value: 40,
    },
    SocialInteraction: {
      name: 'Социальное взаимодействие',
      value: 48,
    },
    GetWhatYouWant: {
      name: 'Получение желаемого результата',
      value: 39,
    },
    Control: {
      name: 'Контроль',
      value: 41,
    },
  };

  // Данные для текущего периода (01.05.2025)
  const dataCurrentData: CommunicationType = {
    ExchangeOfInformation: {
      name: 'Обмен информацией',
      value: 99,
    },
    SocialInteraction: {
      name: 'Социальное взаимодействие',
      value: 41,
    },
    GetWhatYouWant: {
      name: 'Получение желаемого результата',
      value: 75,
    },
    Control: {
      name: 'Контроль',
      value: 59,
    },
  };


  <CommunicativesFunctionChart
        prevDate={prevDate}
        currentDate={currentDate}
        dataPrevData={dataPrevData}
        dataCurrentData={dataCurrentData}
      />
*/

import styles from './CommunicativesFunctionChart.module.css';
import React from 'react';
import type { JSX } from 'react';
import arrowUp from './icons/keyboard_double_arrow_up.svg';
import arrowDown from './icons/keyboard_double_arrow_down.svg';
import { Charts } from './Charts';
import type { ChartDataItem } from './Charts';

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

interface CommunicatiovesFunctionProps {
  prevDate: string;
  currentDate: string;
  dataPrevData: CommunicationType;
  dataCurrentData: CommunicationType;
}

const CommunicativesFunctionChart: React.FC<CommunicatiovesFunctionProps> = (
  props: CommunicatiovesFunctionProps
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
    const change = current - previous;
    return Math.abs(change);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Коммуникативные функции</h2>

      <div className={styles.chartWrapper}>
        <div className={styles.titleConteiner}>
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
        </div>
        <div className={styles.chartLine}>
          <Charts
            data={chartData}
            prevDate={prevDate}
            currentDate={currentDate}
          />
        </div>
      </div>
    </div>
  );
};

export { CommunicativesFunctionChart };
export type { CommunicatiovesFunctionProps, CommunicationType };
