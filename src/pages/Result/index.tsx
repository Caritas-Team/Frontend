import React from 'react';
import styles from './ResultPage.module.css';
import { Logo } from '@ui/logo';
import { Button } from './components/button';
// import { TitleSectionResult } from './components/titleSectionResult';
import { CardSection } from './components/cardSection';

// import { Link } from 'react-router-dom';
// import { ROUTES } from '../../lib/routes';
// import { CardSection } from './components/cardSection';
// import { CheckSection } from './components/checkSection';

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

    //   <CheckSection
    //     date1="15 Апр. 2025"
    //     formed1={20}
    //     initiative1={35}
    //     frequency1={50}
    //     date2="1 Мая 2025"
    //     formed2={90}
    //     initiative2={20}
    //     frequency2={55}
    //     description="На голубом!"
    //   />

    //   <CardSection
    //     personName="Иван Иванов"
    //     personId="12345"
    //     dateOfBirth="01.01.1990"
    //     diagnosis="Неврологическое заболевание"
    //     whereLives="г. Санкт-Петербург"
    //     socialFeatures="Общителен, любит книги и прогулки"
    //     photo="/src/assets/person-image.svg"
    //   />
    // </section>

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
    </main>
  );
};

export default ResultPage;
