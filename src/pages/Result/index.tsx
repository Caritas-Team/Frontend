import React from 'react';
import styles from './ResultPage.module.css';
import { Logo } from '@ui/logo';
import { Button } from './components/button';
// import { TitleSectionResult } from './components/titleSectionResult';
import { CardSection } from './components/cardSection';
import { ThreeCommunicativeFunction } from './components/ThreeCommunicativeFunction';
import type { Statuses } from './components/ThreeCommunicativeFunction';

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

const communicativeData: {
  gettingDesired: Statuses;
  socialInteraction: Statuses;
  informationExchange: Statuses;
} = {
  gettingDesired: {
    Выбирает: 'уже не используется',
    'Просит ещё действие или предмет': 'уже не используется',
    'Просит действие': 'уже не используется',
    'Просит предмет (объект)': 'уже не используется',
  },
  socialInteraction: {
    'Привлекает внимание': 'превзошел',
    'Просит о помощи': 'превзошел',
    'Здоровляется, прощается, использует вежливые формы обращения': 'превзошел',
    'Выражает эмоции, чувства, состояние': 'превзошел',
  },
  informationExchange: {
    'Задаёт вопросы': 'недоступно',
    'Комментирует и выражает мнение': 'недоступно',
    'Объясняет что-то или описывает': 'недоступно',
    'Рассказывает (что было, что будет, что происходит сейчас)': 'недоступно',
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
      <ThreeCommunicativeFunction
        gettingDesired={communicativeData.gettingDesired}
        socialInteraction={communicativeData.socialInteraction}
        informationExchange={communicativeData.informationExchange}
      />
    </main>
  );
};

export default ResultPage;
