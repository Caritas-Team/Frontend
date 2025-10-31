// src\pages\Home\index.tsx

import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/routes';
import { DatePicker } from './components/date-picker';
import { useState } from 'react';

export default function HomePage() {
  const [formingDate, setFormingDate] = useState<string>('');

  return (
    <section style={{ padding: '2rem' }}>
      <h1>Главная (форма)</h1>
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Введите данные" />
        <button type="submit">Отправить</button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        <Link to={ROUTES.result}>Перейти к результату</Link>
      </p>
      <DatePicker
        value={formingDate}
        onChange={setFormingDate}
        label="Дата заполнения"
        required={true}
      />
    </section>
  );
}
