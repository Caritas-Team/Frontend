// src\pages\ResultGroup\index.tsx

import React, { useState } from 'react';
import styles from './ResultGroupPage.module.css';
import { Header } from './components/header';
import { LangCommAssessmentGroup } from './components/langCommAssessmentGroup';
import { GroupDescription } from './components/groupDescription';
import type { TGroupItem } from './components/groupDescription/GroupDescription';
import defaultGroupImageSrc from './components/groupDescription/assets/group.png';

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

const mockGroupData: TGroupItem[] = [
  { name: 'Петров Иван', date: '12.03.2012', age: '12 лет' },
  { name: 'Сидоров Михаил', date: '16.06.2011', age: '12 лет' },
  { name: 'Елинова Дарья', date: '11.12.2018', age: '12 лет' },
];

export const ResultGroupPage: React.FC = () => {
  const [groupName, setGroupName] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState(defaultGroupImageSrc);

  return (
    <main className={styles.main}>
      <Header></Header>
      <GroupDescription
        data={mockGroupData}
        groupName={groupName}
        onChangeGroupName={setGroupName}
        photoUrl={photoUrl}
        onChangePhotoUrl={setPhotoUrl}
      />
      <LangCommAssessmentGroup {...mockLineChartData}></LangCommAssessmentGroup>
    </main>
  );
};

export default ResultGroupPage;
