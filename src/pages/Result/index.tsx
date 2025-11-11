import React from 'react';
import styles from './ResultPage.module.css';
import { Logo } from '@ui/logo';
import { Button } from './components/button';
// import { TitleSectionResult } from './components/titleSectionResult';
import { CardSection } from './components/cardSection';
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
      <br />
      <CommunicativesFunctionChart
        prevDate={prevDate}
        currentDate={currentDate}
        dataPrevData={dataPrevData}
        dataCurrentData={dataCurrentData}
      />
    </main>
  );
};

export default ResultPage;
