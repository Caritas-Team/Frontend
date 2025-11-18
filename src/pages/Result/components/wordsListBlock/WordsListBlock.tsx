// src\pages\Result\components\wordsListBlock\WordsListBlock.tsx

import React from 'react';
import styles from './WordsListBlock.module.css';

type WordsListBlockProps = {
  title: string;
  words: string[];
  bgColor: string;
};

export const WordsListBlock: React.FC<WordsListBlockProps> = ({
  title,
  words,
  bgColor,
}) => {
  return (
    <div className={styles.block} style={{ backgroundColor: bgColor }}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.wordChips}>
        {words.map(word => (
          <span key={word} className={styles.wordChip}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};
