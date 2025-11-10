// src\components\FallbackErrorView.tsx
// опционально — универсальный фоллбек UI

import React from 'react';

type Props = {
  message?: string;
};

export const FallbackErrorView: React.FC<Props> = ({ message }) => {
  return (
    <div role="alert" style={{ padding: '2rem', color: '#b00020' }}>
      <h2>Что-то пошло не так</h2>
      <p>{message ?? 'Попробуйте обновить страницу.'}</p>
    </div>
  );
};
