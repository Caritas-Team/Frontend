import React from 'react';
import styles from './TitleSectionResult.module.css';
import { formatDateShort } from '../../../../lib/utils';

type TTitleSectionResult = {
  className?: string;
  reportDate?: string;
};

export const TitleSectionResult: React.FC<TTitleSectionResult> = ({
  className,
  reportDate,
}) => {
  const formattedReportDate: string = reportDate
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
