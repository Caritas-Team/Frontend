import React from 'react';
import styles from './ResultPage.module.css';
import { CardSection } from './components/cardSection';
import { Header } from '../ResultGroup/components/header';

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

export const ResultPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <Header></Header>

      {/* <TitleSectionResult
        className={styles.mt_title}
        reportDate="2025-01-32"
      ></TitleSectionResult> */}

      <CardSection className={styles.mt_card} {...mockPersonData}></CardSection>
    </main>
  );
};

export default ResultPage;
