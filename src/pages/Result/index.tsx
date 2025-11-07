// src\pages\Result\index.tsx

import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';
import { CardSection } from './components/cardSection/CardSection';
import { WordsSection } from './components/wordsSection';
import styles from './ResultPage.module.css';
import { CheckSection } from './components/checkSection';

export default function ResultPage() {
  return (
    // <section style={{ padding: '2rem' }}>
    <section className={styles.page}>
      <h1>Результат</h1>
      <p>Здесь будет вывод данных.</p>
      <p style={{ marginTop: '1rem' }}>
        <Link to={ROUTES.home}>На главную</Link>
      </p>

      <CheckSection
        date1="15 Апр. 2025"
        formed1={20}
        initiative1={35}
        frequency1={50}
        date2="1 Мая 2025"
        formed2={90}
        initiative2={45}
        frequency2={55}
        description="На голубом!"
      />

      {/* <div style={{position: 'relative', width: '230px', height: '230px',}}>
        <Gauge
          date="15 Апр. 2025"
          formed={90}      // фиолетовая дуга
          initiative={25}  // зелёная дуга
          frequency={50}   // синяя дуга
        />
      </div> */}

      <CardSection
        personName="Иван Иванов"
        personId="12345"
        dateOfBirth="01.01.1990"
        diagnosis="Неврологическое заболевание"
        whereLives="г. Санкт-Петербург"
        socialFeatures="Общителен, любит книги и прогулки"
        photo="/src/assets/person-image.svg"
      />
      <WordsSection
        new_words={[
          'сказка',
          'животное',
          'муравей',
          'лягушка - глупое животное',
        ]}
        methods={['красотка', 'семья', 'муж', 'напиться']}
        messages={['капля', 'дождь', 'лужа', 'река']}
        words1={48}
        words2={21}
      />
    </section>
  );
}
