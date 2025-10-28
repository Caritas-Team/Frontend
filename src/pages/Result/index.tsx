// src\pages\Result\index.tsx

import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';

export default function ResultPage() {
  return (
    <section style={{ padding: '2rem' }}>
      <h1>Результат</h1>
      <p>Здесь будет вывод данных.</p>
      <p style={{ marginTop: '1rem' }}>
        <Link to={ROUTES.home}>На главную</Link>
      </p>
    </section>
  );
}
