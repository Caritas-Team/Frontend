// src\pages\Result\index.tsx

import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';
import { CardSection } from './components/cardSection/CardSection';
import { WordsSection } from './components/wordsSection';
import styles from './ResultPage.module.css';

export default function ResultPage() {
  return (
    // <section style={{ padding: '2rem' }}>
    <section className={styles.page}>
      <h1>Результат</h1>
      <p>Здесь будет вывод данных.</p>
      <p style={{ marginTop: '1rem' }}>
        <Link to={ROUTES.home}>На главную</Link>
      </p>
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
