// src\pages\ResultGroup\index.tsx

import React from 'react';
import styles from './ResultGroupPage.module.css';
import { Header } from './components/header';
import { LangCommAssessmentGroup } from './components/langCommAssessmentGroup';

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

const mockLineChartData: TChartData = {
  data: [
    {
      name: 'Доинтенциальная коммуникация',
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

export const ResultGroupPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <Header></Header>
      <LangCommAssessmentGroup {...mockLineChartData}></LangCommAssessmentGroup>
    </main>
  );
};

export default ResultGroupPage;
