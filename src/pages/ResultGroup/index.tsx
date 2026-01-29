// src\pages\ResultGroup\index.tsx

import React, { useState } from 'react';
import styles from './ResultGroupPage.module.css';
import { Header } from '@ui/header';
import { LineChartGroup } from './components/lineChart';
import { GroupWordsSection } from './components/groupWordsSection';
import { GroupDescription } from './components/groupDescription';
import type { TGroupItem } from './components/groupDescription/GroupDescription';
import defaultGroupImageSrc from './components/groupDescription/assets/group.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { TitleSectionResult } from '@ui/titleSectionResult';

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

const mockGroupData: TGroupItem[] = [
  { name: 'Петров Иван', date: '12.03.2012', age: '12 лет' },
  { name: 'Сидоров Михаил', date: '16.06.2011', age: '12 лет' },
  { name: 'Елинова Дарья', date: '11.12.2018', age: '12 лет' },
];

export const ResultGroupPage: React.FC = () => {
  const [groupName, setGroupName] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState(defaultGroupImageSrc);
  const location = useLocation();
  const navigate = useNavigate();
  const dataFromServer = location.state; //данные с сервера
  const reportDate = dataFromServer.completionsDate;

  if (!dataFromServer || Object.keys(dataFromServer).length === 0) {
    navigate('/');
  }

  return (
    <main className={styles.main}>
      <Header />
      {/* Строка заголовка страницы */}
      <TitleSectionResult reportDate={reportDate} />
      <GroupDescription
        className={styles.groupDescriptionSection}
        data={mockGroupData}
        groupName={groupName}
        onChangeGroupName={setGroupName}
        photoUrl={photoUrl}
        onChangePhotoUrl={setPhotoUrl}
      />
      <LineChartGroup
        className={styles.language_section}
        title={'Языковая и коммуникативная оценка'}
        subtitle={'Уровень применения языковых навыков'}
        {...mockLineChartData_langSkills}
      />
      <LineChartGroup
        className={styles.initiative_section}
        title={'Инициатива'}
        {...mockLineChartData_initiative}
      />
      <LineChartGroup
        className={styles.communicative_section}
        title={'Коммуникативные функции'}
        {...mockLineChartData_communFunctions}
      />
      <GroupWordsSection
        newWordsCount={{ now: 48, delta: 21 }}
        verbalWordsCount={{ now: 49, delta: -21 }}
        noBaseWordsCount={{ now: 50, delta: 10 }}
        communicationMethods={['семья', 'муж', 'дочь']}
      />
    </main>
  );
};

export default ResultGroupPage;
