// src\pages\Result\components\checkSection\CheckSection.tsx

import React from 'react';
import styles from './CheckSection.module.css';
import { Gauge } from '../gauge/Gauge';
import { LegendItem } from '../legendItem/LegendItem';

const HEADER_TEXT = 'Коммуникативная функция «контроль»';
const TITLE_TEXT = 'Отказывается, отклоняет';
const PROTO_TEXT = 'Протоязык';

type CheckSectionProps = {
  date1: string; // дата для Gauge
  formed1: number; // фиолетовая дуга %
  initiative1: number; // зелёная дуга %
  frequency1: number; // синяя дуга %
  date2: string; // дата для Gauge
  formed2: number; // фиолетовая дуга %
  initiative2: number; // зелёная дуга %
  frequency2: number; // синяя дуга %
  description: string;
};

export const CheckSection: React.FC<CheckSectionProps> = ({
  date1,
  formed1,
  initiative1,
  frequency1,
  date2,
  formed2,
  initiative2,
  frequency2,
  description,
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.header}>{HEADER_TEXT}</h2>

      <div className={styles.container}>
        <h3 className={styles.title}>{TITLE_TEXT}</h3>
        <div className={styles.gaugesBox}>
          <h3 className={styles.centerTitle}>{PROTO_TEXT}</h3>

          <div className={styles.gauges}>
            <Gauge
              date={date1}
              formed={formed1}
              initiative={initiative1}
              frequency={frequency1}
            />

            <Gauge
              date={date2}
              formed={formed2}
              initiative={initiative2}
              frequency={frequency2}
            />
          </div>

          <div className={styles.legend}>
            <LegendItem
              label="Сформирован"
              color="var(--chart-circle-first-color, #8550f6)"
              digitsText={`${Math.abs(formed2 - formed1)}%`}
              positive={formed2 - formed1 >= 0}
            />

            <LegendItem
              label="Инициатива"
              color="var(--chart-circle-second-color, #67f4b1)"
              digitsText={`${Math.abs(initiative2 - initiative1)}%`}
              positive={initiative2 - initiative1 >= 0}
            />

            <LegendItem
              label="Частота"
              color="var(--chart-circle-third-sector-color, #5b93f4)"
              digitsText={`${Math.abs(frequency2 - frequency1)}%`}
              positive={frequency2 - frequency1 >= 0}
            />
          </div>
        </div>

        {/* Блок описания */}
        <div className={styles.descriptionBlock}>
          <div className={styles.descriptionLabel}>Описание</div>
          <div className={styles.descriptionContent}>
            {description || '***'}
          </div>
        </div>
      </div>
    </section>
  );
};
