// src\pages\Result\index.tsx

import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';
import { CardSection } from './components/cardSection/CardSection';
import { TitleSectionResult } from './components/titleSectionResult';

export default function ResultPage() {
  return (
    <section style={{ padding: '2rem' }}>
      <h1>Результат</h1>
      <p>Здесь будет вывод данных.</p>
      <p style={{ marginTop: '1rem' }}>
        <Link to={ROUTES.home}>На главную</Link>
      </p>
      <div>
        <TitleSectionResult reportDate="2025-10-01" />
      </div>
      <CardSection
        personName="Иван Иванов"
        personId="12345"
        dateOfBirth="01.01.1990"
        diagnosis="Неврологическое заболевание"
        whereLives="г. Санкт-Петербург"
        socialFeatures="Общителен, любит книги и прогулки"
        photo="/src/assets/person-image.svg"
      />
    </section>
  );
}
