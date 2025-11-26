// src\pages\Result\components\gauge\Gauge.tsx

import React from 'react';
import styles from './Gauge.module.css';

type GaugeProps = {
  date: string;
  formed: number; // фиолетовая дуга %
  initiative: number; // зелёная дуга %
  frequency: number; // синяя дуга %
};

const SIZE = 230;
const CENTER = SIZE / 2;

// толщина дуг
const T1 = 10;

// радиусы из макета
const R1 = (230 - T1) / 2; // фиолетовая
const R2 = (204 - T1) / 2; // зелёная
const R3 = (178 - T1) / 2; // синяя

// цвета
const C1 = '#8550F6';
const C2 = '#67F4B1';
const C3 = '#5B93F4';

// фон дуг
const BG = '#F3EFFF';

// функция вычисления координат конца дуги
function polarToCartesian(radius: number, angleDeg: number) {
  const angle = angleDeg * (Math.PI / 180);
  const x = CENTER + radius * Math.cos(angle);
  const y = CENTER + radius * Math.sin(angle);
  return { x, y };
}

const START_ANGLE = 135;
const END_ANGLE = 405;
const TOTAL_ANGLE = END_ANGLE - START_ANGLE;

// генерация SVG path для дуги
function createArcPath(radius: number, percent: number) {
  const delta = (TOTAL_ANGLE * percent) / 100;
  const angle = START_ANGLE + delta;
  const start = polarToCartesian(radius, START_ANGLE);
  const end = polarToCartesian(radius, angle);
  if (delta > 180)
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 1 1 ${end.x} ${end.y}`;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
}

export const Gauge: React.FC<GaugeProps> = ({
  date,
  formed,
  initiative,
  frequency,
}) => {
  return (
    <div className={styles.wrapper}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* ===== ФОНОВЫЕ ДУГИ ===== */}
        <path
          d={createArcPath(R1, 100)}
          stroke={BG}
          strokeWidth={T1}
          fill="none"
          strokeLinecap="round"
        />

        <path
          d={createArcPath(R2, 100)}
          stroke={BG}
          strokeWidth={T1}
          fill="none"
          strokeLinecap="round"
        />

        <path
          d={createArcPath(R3, 100)}
          stroke={BG}
          strokeWidth={T1}
          fill="none"
          strokeLinecap="round"
        />

        {/* ===== АКТИВНЫЕ ДУГИ ===== */}
        <path
          d={createArcPath(R1, formed)}
          stroke={C1}
          strokeWidth={T1}
          fill="none"
          strokeLinecap="round"
        />

        <path
          d={createArcPath(R2, initiative)}
          stroke={C2}
          strokeWidth={T1}
          fill="none"
          strokeLinecap="round"
        />

        <path
          d={createArcPath(R3, frequency)}
          stroke={C3}
          strokeWidth={T1}
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className={styles.date}>{date}</div>
      <div className={styles.zero}>0%</div>
      <div className={styles.hundred}>100%</div>
    </div>
  );
};
