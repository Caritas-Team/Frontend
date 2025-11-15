import React from 'react';
import styles from './ResultPage.module.css';
import { CardSection } from './components/cardSection';
import { SocialCircles } from './components/socialCircles';
import { LangCommunicAssessment } from './components/langCommunicAssessment';
import type { TChartData } from './components/langCommunicAssessment/types';
import { WordsSection } from './components/wordsSection';
import { Header } from '../ResultGroup/components/header';
import { CheckSection } from './components/checkSection';
import type { CommunicationType } from './components/CommunicativesFunctionChart';
import { CommunicativesFunctionChart } from './components/CommunicativesFunctionChart';
/* моковые данные для случая, если особенностей социальной ситуации нет, но есть id обследуемого - как в макете */
type TCardSection = {
  className?: string;
  personName?: string;
  personId?: string;
  dateOfBirth?: string;
  diagnosis?: string;
  whereLives?: string;
  socialFeatures?: string;
  photo?: string;
};

const mockPersonData: TCardSection = {
  personName: 'Иванов Иван Иванович',
  personId: 'ID II-1210C',
  dateOfBirth: '2012-10-21',
  diagnosis: 'Нарушение речи',
  whereLives: 'В семье',
};

const mockSocialCirclesData = {
  family: '+2 чел',
  friends: '+2 чел',
  specialists: '+2 чел',
  familiar: '+2 чел',
};

const chartInfo: TChartData = {
  data: [
    {
      name: 'Доинтенциальная коммуникация',
      prevValue: '90',
      currentValue: '70',
    },
    {
      name: 'Протоязык',
      prevValue: '60',
      currentValue: '50',
    },
    {
      name: 'Голофраза',
      prevValue: '5',
      currentValue: '90',
    },
    {
      name: 'Фраза',
      prevValue: '40',
      currentValue: '50',
    },
  ],
  initiative: [
    {
      name: 'Доинтенциальная коммуникация',
      prevValue: '55',
      currentValue: '75',
    },
    {
      name: 'Протоязык',
      prevValue: '60',
      currentValue: '50',
    },
    {
      name: 'Голофраза',
      prevValue: '80',
      currentValue: '90',
    },
    {
      name: 'Фраза',
      prevValue: '40',
      currentValue: '50',
    },
  ],
  prevDate: '2025-04-15',
  currentDate: '2025-05-01',
};
// Даты
const prevDate = '2025-04-15';
const currentDate = '2025-05-01';
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

export const ResultPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <Header></Header>
      <CardSection className={styles.mt_card} {...mockPersonData}></CardSection>
      <WordsSection
        newWords={['сказка', 'животное', 'ещё животное', `ёжик`]}
        communicationMethods={['семья', 'муж']}
        quickMessages={['капля', 'дождь']}
        verbalWordCount={{ now: 48, delta: 21 }}
      />
      <LangCommunicAssessment {...chartInfo}></LangCommunicAssessment>
      <CommunicativesFunctionChart
        prevDate={prevDate}
        currentDate={currentDate}
        dataPrevData={dataPrevData}
        dataCurrentData={dataCurrentData}
      />
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
      />
      <SocialCircles {...mockSocialCirclesData} />
    </main>
  );
};

export default ResultPage;
