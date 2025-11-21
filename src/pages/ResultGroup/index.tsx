// src\pages\ResultGroup\index.tsx

import React from 'react';
import styles from './ResultGroupPage.module.css';
import { Header } from './components/header';
import { LangCommAssessmentGroup } from './components/langCommAssessmentGroup';
import { CheckSection } from '../Result/components/checkSection';
import { GroupWordsSection } from './components/groupWordsSection';

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
      <CheckSection
        date1="15 Апр. 2025"
        formed1={20}
        initiative1={35}
        frequency1={50}
        date2="1 Мая 2025"
        formed2={90}
        initiative2={20}
        frequency2={55}
        description="Прилетит, вдруг, волшебник"
      <GroupWordsSection
        newWordsCount={{ now: 48, delta: 21 }}
        verbalWordsCount={{ now: 49, delta: -21 }}
        noBaseWordsCount={{ now: 50, delta: 10 }}
        communicationMethods={['семья', 'муж', 'дочь']}
      />
      <LangCommAssessmentGroup {...mockLineChartData}></LangCommAssessmentGroup>
    </main>
  );
};

export default ResultGroupPage;
