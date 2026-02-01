import React from 'react';
import styles from './ResultPage.module.css';
import { Header } from '@ui/header';
import { CardSection } from './components/cardSection';
import { LangCommunicAssessment } from './components/langCommunicAssessment';
import { CommunicativesFunctionChart } from './components/CommunicativesFunctionChart';
import { ThreeCommunicativeFunction } from './components/ThreeCommunicativeFunction';
import { WordsSection } from './components/wordsSection';
import { SocialCircles } from './components/socialCircles';
import { FinalTable } from './components/finalTable';
import type { TChartData } from './components/langCommunicAssessment/types';
import type { CommunicationType } from './components/CommunicativesFunctionChart';
import type { ThreeCommunicativeFunctionProps } from './components/ThreeCommunicativeFunction';
import type { FinalTableProps } from './components/finalTable/FinalTable';
import { TitleSectionResult } from '@ui/titleSectionResult';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
//import type { CompletedResult } from '../../api/types';

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

const finalTableData: FinalTableProps = {
  languageDevelopmentLevels: '25%',
  communicationInitiative: '34%',
  communicativeFunctionsProgress: '15%',
  vocabularyLevel: '30',
  spokenWordsCount: '4',
};

const communicativeData: ThreeCommunicativeFunctionProps = {
  control: [
    {
      name: { 'Отказывается, отклоняет': 'прогресс' },
      subCategory: [
        { name: 'Протоязык', icon: 'arrowDown', value: 18 },
        { name: 'Голофраза', icon: 'equal' },
        { name: 'Фраза', icon: 'manyArrowsUp' },
      ],
    },
  ],

  gettingDesired: [
    {
      name: { Выбирает: 'прогресс' },
      subCategory: [{ name: 'Голофраза', icon: 'complete' }],
    },
    {
      name: { 'Просит ещё действие или предмет': 'прогресс' },
      subCategory: [{ name: 'Фраза', icon: 'arrowDown', value: 15 }],
    },
    {
      name: { 'Просит действие': 'прогресс' },
      subCategory: [
        { name: 'Голофраза', icon: 'complete' },
        { name: 'Фраза', icon: 'arrowUp', value: 27 },
      ],
    },
    {
      name: { 'Просит предмет (объект)': 'уже не используется' },
    },
  ],

  socialInteraction: [
    { name: { 'Привлекает внимание': 'превзошел' } },
    { name: { 'Просит о помощи': 'превзошел' } },
    {
      name: {
        'Здоровается, прощается, использует вежливые формы обращения':
          'уже не используется',
      },
    },
    { name: { 'Выражает эмоции, чувства, состояние': 'уже не используется' } },
  ],

  informationExchange: [
    { name: { 'Задаёт вопросы': 'недоступно' } },
    { name: { 'Комментирует и выражает мнение': 'недоступно' } },
    { name: { 'Объясняет что-то или описывает': 'недоступно' } },
    {
      name: {
        'Рассказывает (что было, что будет, что происходит сейчас)':
          'недоступно',
      },
    },
  ],
};

export const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dataFromServer = location.state; //данные с сервера
  const reportDate = dataFromServer.completionsDate;

  useEffect(() => {
    if (
      !dataFromServer ||
      typeof dataFromServer !== 'object' ||
      Object.keys(dataFromServer || {}).length === 0
    ) {
      navigate('/');
    }
  }, [dataFromServer, navigate]);

  return (
    <main className={styles.main}>
      <div className={styles.with_padding}>
        <Header />
        <TitleSectionResult
          reportDate={reportDate}
          className={styles.title_section}
        />
        <CardSection className={styles.card_section} {...mockPersonData} />
        <LangCommunicAssessment
          className={styles.language_section}
          {...chartInfo}
        />
        <CommunicativesFunctionChart
          className={styles.communicatives_functuion}
          prevDate={prevDate}
          currentDate={currentDate}
          dataPrevData={dataPrevData}
          dataCurrentData={dataCurrentData}
        />

        <ThreeCommunicativeFunction
          className={styles.three_functions}
          control={communicativeData.control}
          gettingDesired={communicativeData.gettingDesired}
          socialInteraction={communicativeData.socialInteraction}
          informationExchange={communicativeData.informationExchange}
        />
        <WordsSection
          className={styles.words_section}
          newWords={['сказка', 'животное']}
          communicationMethods={['семья', 'муж']}
          quickMessages={['капля', 'дождь']}
          verbalWordCount={{ now: 48, delta: 21 }}
        />
        <SocialCircles
          className={styles.social_circles}
          {...mockSocialCirclesData}
        />
      </div>
      <FinalTable
        className={styles.final_table}
        languageDevelopmentLevels={finalTableData.languageDevelopmentLevels}
        communicationInitiative={finalTableData.communicationInitiative}
        communicativeFunctionsProgress={
          finalTableData.communicativeFunctionsProgress
        }
        vocabularyLevel={finalTableData.vocabularyLevel}
        spokenWordsCount={finalTableData.spokenWordsCount}
      />
    </main>
  );
};

export default ResultPage;
