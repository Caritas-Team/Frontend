import React from 'react';
import styles from './TitleSectionResult.module.css';
import { formatDateShort, isValidDate } from '../../../../lib/utils';

type TTitleSectionResult = {
  className?: string;
  reportDate?: string; // ожидаемый формат 'гггг-мм-дд'
};

export const TitleSectionResult: React.FC<TTitleSectionResult> = ({
  className,
  reportDate,
}) => {
  /* если дата не передана с бэкэнда или передана в неверном формате, то указывается текущая дата */
  const formattedReportDate: string =
    reportDate && isValidDate(reportDate)
      ? formatDateShort(reportDate)
      : formatDateShort(String(new Date()));
  return (
    <section
      className={className ? `${className} ${styles.section}` : styles.section}
    >
      <h1 className={styles.title}>Результат расчёта динамики</h1>
      <span className={styles.date}>{formattedReportDate + ' г.'}</span>
    </section>
  );
};
