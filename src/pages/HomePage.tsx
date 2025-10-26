import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Главная страница</h1>
      <form>
        <input type="text" placeholder="Введите данные" />
        <button type="submit">Отправить</button>
      </form>

      <p>
        <Link to="/result">Перейти на страницу результата</Link>
      </p>
    </div>
  )
}