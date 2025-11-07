// src\pages\Result\index.tsx

import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';
import { CardSection } from './components/cardSection';
import { CheckSection } from './components/checkSection';

export default function ResultPage() {
  return (
    <section style={{ padding: '2rem' }}>
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
