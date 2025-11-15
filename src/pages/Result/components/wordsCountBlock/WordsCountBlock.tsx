// src\pages\Result\components\wordsCountBlock\WordsCountBlock.tsx

import React from 'react';
import styles from './WordsCountBlock.module.css';
import VerbalIcon from '@/assets/letter-a.svg';

type WordsCountBlockProps = {
  title: string;
  wordCountNow: number;
  wordCountDelta: number;
  bgColor: string;
};

function pluralizeWords(n: number, withSign: boolean = false): string {
  const abs = Math.abs(n);
  const last = abs % 10;
  const lastTwo = abs % 100;

  let form: string;

  if (lastTwo >= 11 && lastTwo <= 14) form = 'слов';
  else if (last === 1) form = 'слово';
  else if (last >= 2 && last <= 4) form = 'слова';
  else form = 'слов';

  const sign = withSign && n > 0 ? '+' : withSign && n < 0 ? '-' : '';

  return `${sign}${abs} ${form}`;
}

export const WordsCountBlock: React.FC<WordsCountBlockProps> = ({
  title,
  wordCountNow,
  wordCountDelta,
  bgColor,
}) => {
  return (
    <div className={styles.block} style={{ backgroundColor: bgColor }}>
      <div className={styles.title}>
        <img src={VerbalIcon} alt="" className={styles.icon} />
        {title}
      </div>
      <div className={styles.info}>{pluralizeWords(wordCountNow, false)}</div>
      <div className={styles.deltaLine}>
        <span className={styles.delta}>
          {pluralizeWords(wordCountDelta, true)}
        </span>
        <span className={styles.lastResultText}>к прошлому результату</span>
      </div>
    </div>
  );
};
