import React from 'react';
import styles from './ResultPage.module.css';
import { CardSection } from './components/cardSection';
import { Header } from '../ResultGroup/components/header';
import { CheckSection } from './components/checkSection';

// import { Link } from 'react-router-dom';
// import { ROUTES } from '../../lib/routes';

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
    // <section style={{ padding: '2rem' }}>
    //   <h1>Результат</h1>
    //   <p>Здесь будет вывод данных.</p>
    //   <p style={{ marginTop: '1rem' }}>
    //     <Link to={ROUTES.home}>На главную</Link>
    //   </p>

    // </section>

    <main className={styles.main}>
      <Header></Header>

      {/* <TitleSectionResult
        className={styles.mt_title}
        reportDate="2025-01-32"
      ></TitleSectionResult> */}

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

      <CardSection className={styles.mt_card} {...mockPersonData}></CardSection>
    </main>
  );
};

export default ResultPage;
