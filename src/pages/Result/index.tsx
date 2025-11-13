import React from 'react';
import styles from './ResultPage.module.css';
import { CardSection } from './components/cardSection';
import { Header } from '../ResultGroup/components/header';
import { CheckSection } from './components/checkSection';
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
      <Header></Header>
      <CardSection className={styles.mt_card} {...mockPersonData}></CardSection>
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

      <ThreeCommunicativeFunction
        gettingDesired={communicativeData.gettingDesired}
        socialInteraction={communicativeData.socialInteraction}
        informationExchange={communicativeData.informationExchange}
      />
    </main>
  );
};

export default ResultPage;
