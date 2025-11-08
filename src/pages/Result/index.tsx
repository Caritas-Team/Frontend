import React from 'react';
import styles from './ResultPage.module.css';
import { Logo } from '@ui/logo';
import { Button } from './components/button';
import { CardSection } from './components/cardSection';
import { WordsSection } from './components/wordsSection';

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
      <WordsSection
        newWords={[
          'сказка',
          'животное',
          'муравей',
          'лягушка - глупое животное',
        ]}
        communicationMethods={['красотка', 'семья', 'муж', 'напиться']}
        quickMessages={['капля', 'дождь', 'лужа', 'река']}
        verbalWordCount={{ now: 48, delta: 21 }}
      />

      <CardSection className={styles.mt_card} {...mockPersonData}></CardSection>
    </main>
  );
};

export default ResultPage;
