// src/pages/Result/components/delta/Delta.tsx

import React from 'react';
import styles from './Delta.module.css';

import ArrowUp from '@/assets/double-arrow-up.svg';
import ArrowDown from '@/assets/double-arrow-down.svg';

type DeltaProps = {
  text: string; // Например "50%" или "-25%"
  up: boolean; // true → вверх, false → вниз
};

export const Delta: React.FC<DeltaProps> = ({ text, up }) => {
  return (
    <div className={styles.delta}>
      <img src={up ? ArrowUp : ArrowDown} alt="" className={styles.arrow} />
      <span className={text}>{text}</span>
    </div>
  );
};
