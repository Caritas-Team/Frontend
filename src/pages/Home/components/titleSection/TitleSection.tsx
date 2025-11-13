import React from 'react';
import style from './TitleSection.module.css';
type TTitleSection = {
  className?: string;
};

export const TitleSection: React.FC<TTitleSection> = ({ className }) => {
  return (
    <section
      className={className ? `${className} ${style.section}` : style.section}
    >
      <h1 className={style.title}>Калькулятор динамики</h1>
      <p className={style.subtitle}>
        Мы не храним данные, а только предоставляем инструмент для расчёта
      </p>
    </section>
  );
};
