// src\pages\Result\components\wordsSection\WordsSection.tsx

import React from 'react';
import styles from './WordsSection.module.css';
import { WordsListBlock } from '../wordsListBlock/WordsListBlock';
import { WordsCountBlock } from '../wordsCountBlock/WordsCountBlock';

type WordsSectionProps = {
  newWords: string[];
  communicationMethods: string[];
  quickMessages: string[];
  verbalWordCount: {
    now: number;
    delta: number;
  };
};

const HEADER_TEXT = 'Доступный словарный запас';

const NEW_WORDS = 'Новые слова';
const color_new_words = 'var(--background-input-color, #e7f6ff)';

const COMMUNICATION_METHODS = 'Способы общения';
const colorCommunicationMethods = 'var(--background-input-color, #e7f6ff)';

const VERBAL_WORDS = 'Вербальные слова';
const colorVerbalWords = 'var(--background-accent-color, #f3edff)';

const QUICK_MESSAGES = 'Быстрые сообщения';
const colorQuickMessages = 'var(--background-input-color, #e7f6ff)';

export const WordsSection: React.FC<WordsSectionProps> = ({
  newWords,
  communicationMethods,
  quickMessages,
  verbalWordCount,
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.header}>{HEADER_TEXT}</h2>

      <section className={styles.grid}>
        <WordsListBlock
          title={NEW_WORDS}
          words={newWords}
          bgColor={color_new_words}
        />

        <WordsListBlock
          title={COMMUNICATION_METHODS}
          words={communicationMethods}
          bgColor={colorCommunicationMethods}
        />

        <WordsCountBlock
          title={VERBAL_WORDS}
          wordCountNow={verbalWordCount.now}
          wordCountDelta={verbalWordCount.delta}
          bgColor={colorVerbalWords}
        />

        <WordsListBlock
          title={QUICK_MESSAGES}
          words={quickMessages}
          bgColor={colorQuickMessages}
        />
      </section>
    </section>
  );
};
