// src\pages\Result\components\checkSection\CheckSection.tsx

import React from 'react';
import styles from './CheckSection.module.css';
import { Gauge } from '../gauge/Gauge';
// import DoubleArrowUp from '@/assets/double-arrow-up.svg';
// import DoubleArrowDown from '@/assets/double-arrow-down.svg';

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
            <div className={styles.legendItem}>
              <div className={styles.legendTop}>
                <span className={styles.dotFirst}></span>
                <span className={styles.legendText}>Сформирован</span>
              </div>

              <div className={styles.legendBottom}>
                <img
                  src="/icons/arrow-up-green.svg"
                  alt=""
                  className={styles.arrow}
                />
                <span className={styles.percent}>50%</span>
              </div>
            </div>

            <div className={styles.legendItem}>
              <div className={styles.legendTop}>
                <span className={styles.dotSecond}></span>
                <span className={styles.legendText}>Инициатива</span>
              </div>

              <div className={styles.legendBottom}>
                <img
                  src="/icons/arrow-up-green.svg"
                  alt=""
                  className={styles.arrow}
                />
                <span className={styles.percent}>25%</span>
              </div>
            </div>

            <div className={styles.legendItem}>
              <div className={styles.legendTop}>
                <span className={styles.dotThird}></span>
                <span className={styles.legendText}>Частота</span>
              </div>

              <div className={styles.legendBottom}>
                <img
                  src="/icons/arrow-up-green.svg"
                  alt=""
                  className={styles.arrow}
                />
                <span className={styles.percent}>27%</span>
              </div>
            </div>
          </div>

          {/* 
        <div className={styles.legend}>
          <div className={styles.row}>
            <span className={styles.dotFirst}></span>
            <span className={styles.text}>Сформированность</span>
          </div>

          <div className={styles.row}>
            <span className={styles.dotSecond}></span>
            <span className={styles.text}>Инициативность</span>
          </div>

          <div className={styles.row}>
            <span className={styles.dotThird}></span>
            <span className={styles.text}>Частота</span>
          </div>
        </div>
 */}
        </div>

        {/* Блок описания */}
        <div className={styles.descriptionBlock}>
          <div className={styles.descriptionLabel}>Описание</div>
          <div className={styles.descriptionContent}>{description || '-'}</div>
        </div>
      </div>
    </section>
  );
};
