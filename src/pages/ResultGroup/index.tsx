// src\pages\ResultGroup\index.tsx

import React from 'react';
import styles from './ResultGroupPage.module.css';
import { Header } from './components/header';
import { LineChartGroup } from './components/lineChart';

type TChartDataItem = {
  name: string;
  prevValue: string;
  currentValue: string;
};

type TChartData = {
  data: TChartDataItem[];
  prevDate: string;
  currentDate: string;
};

const mockLineChartData_langSkills: TChartData = {
  data: [
    {
      name: 'Доинтенциональная коммуникация',
      prevValue: '40',
      currentValue: '60',
    },
    {
      name: 'Протоязык',
      prevValue: '70',
      currentValue: '50',
    },
    {
      name: 'Голофраза',
      prevValue: '50',
      currentValue: '60',
    },
    {
      name: 'Фраза',
      prevValue: '70',
      currentValue: '90',
    },
  ],
  prevDate: '2025-04-15',
  currentDate: '2025-05-01',
};

const mockLineChartData_initiative: TChartData = {
  data: [
    {
      name: 'Доинтенциональная коммуникация',
      prevValue: '30',
      currentValue: '50',
    },
    {
      name: 'Протоязык',
      prevValue: '60',
      currentValue: '40',
    },
    {
      name: 'Голофраза',
      prevValue: '20',
      currentValue: '50',
    },
    {
      name: 'Фраза',
      prevValue: '50',
      currentValue: '80',
    },
  ],
  prevDate: '2025-04-15',
  currentDate: '2025-05-01',
};

const mockLineChartData_communFunctions: TChartData = {
  data: [
    {
      name: 'Обмен информацией',
      prevValue: '30',
      currentValue: '50',
    },
    {
      name: 'Сильное взаимодействие',
      prevValue: '80',
      currentValue: '40',
    },
    {
      name: 'Получение желаемого результата',
      prevValue: '20',
      currentValue: '50',
    },
    {
      name: 'Контроль',
      prevValue: '60',
      currentValue: '80',
    },
  ],
  prevDate: '2025-04-15',
  currentDate: '2025-05-01',
};

export const ResultGroupPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <Header></Header>
      <LineChartGroup
        className={styles.language_section}
        title={'Языковая и коммуникативная оценка'}
        subtitle={'Уровень применения языковых навыков'}
        {...mockLineChartData_langSkills}
      ></LineChartGroup>
      <LineChartGroup
        className={styles.initiative_section}
        title={'Инициатива'}
        {...mockLineChartData_initiative}
      ></LineChartGroup>
      <LineChartGroup
        className={styles.communicative_section}
        title={'Коммуникативные функции'}
        {...mockLineChartData_communFunctions}
      ></LineChartGroup>
    </main>
  );
};

export default ResultGroupPage;
