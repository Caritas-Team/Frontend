import { Link } from 'react-router-dom'

export default function ResultPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Страница результата</h1>
      <p>Здесь можно показать результаты работы формы.</p>

      <p>
        <Link to="/">Назад на главную</Link>
      </p>
    </div>
  )
}
