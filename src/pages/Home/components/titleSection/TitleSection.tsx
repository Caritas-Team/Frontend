import React from 'react';
import style from './TitleSection.module.css';
type TTitleSection = {
  className?: string;
  title: string;
  subtitle: string;
};

export const TitleSection: React.FC<TTitleSection> = ({
  className,
  title,
  subtitle,
}) => {
  return (
    <section className={`${className}, ${style.section}`}>
      <h1 className={style.title}>{title}</h1>
      <p className={style.subtitle}>{subtitle}</p>
    </section>
  );
};

/* import React from 'react';
import style from './TitleSection.module.css';
type TTitleSection = {
  className?: string;  
};

export const TitleSection: React.FC<TTitleSection> = ({ className }) => {
  return (
    <section className={`${className}, ${style.section}`}>
      <h1 className={style.title}>Калькулятор динамики</h1>
      <p className={style.subtitle}>
        Мы не храним данные, а только предоставляем инструмент для расчёта
      </p>
    </section>
  );
}; */
