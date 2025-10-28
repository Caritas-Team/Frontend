// src\ui\FallbackErrorView.tsx
// опционально — универсальный фоллбек UI

type Props = {
  message?: string;
};

export default function FallbackErrorView({ message }: Props) {
  return (
    <div role="alert" style={{ padding: '2rem', color: '#b00020' }}>
      <h2>Что-то пошло не так</h2>
      <p>{message ?? 'Попробуйте обновить страницу.'}</p>
    </div>
  );
}
