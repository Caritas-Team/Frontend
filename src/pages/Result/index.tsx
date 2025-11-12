import React from 'react';
import styles from './ResultPage.module.css';
import { Logo } from '@ui/logo';
import { Button } from './components/button';
// import { TitleSectionResult } from './components/titleSectionResult';
import { CardSection } from './components/cardSection';
import { LangCommunicAssessment } from './components/langCommunicAssessment';
import type { TChartData } from './components/langCommunicAssessment/types';

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

export const ResultPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Logo></Logo>
        <div className={styles.header__buttons}>
          <Button
            label="Сохранить"
            secondary
            onClick={() => {
              console.log('Button Save has been pressed');
            }}
          ></Button>
          <Button
            label="Печать"
            tertiary
            onClick={() => window.print()}
            icon={
              <img
                src="src/assets/icon-print.svg"
                className={styles.button_icon}
              />
            }
          ></Button>
        </div>
      </header>
      {/* <TitleSectionResult
        className={styles.mt_title}
        reportDate="2025-01-32"
      ></TitleSectionResult> */}
      <CardSection className={styles.mt_card} {...mockPersonData}></CardSection>
      <LangCommunicAssessment {...chartInfo}></LangCommunicAssessment>
    </main>
  );
};

export default ResultPage;
