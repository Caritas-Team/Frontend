// src\pages\ResultGroup\components\groupWordsSection\GroupWordsSection.tsx

import React from 'react';
import styles from './GroupWordsSection.module.css';
import { WordsListBlock } from '@ui/wordsListBlock';
import { WordsCountBlock } from '@ui/wordsCountBlock';

type GroupWordsSectionProps = {
  newWordsCount: {
    now: number;
    delta: number;
  };
  verbalWordsCount: {
    now: number;
    delta: number;
  };
  noBaseWordsCount: {
    now: number;
    delta: number;
  };
  communicationMethods: string[];
};

const HEADER_TEXT = 'Доступный словарный запас';

const NEW_WORDS = 'Новые слова';
const colorNewWords = 'var(--green-light, #e7fff4)';

const VERBAL_WORDS = 'Вербальные слова';
const colorVerbalWords = 'var(--background-accent-color, #f3edff)';

const NO_BASE_WORDS = 'Слова, которых нет в Базовом';
const colorNoBaseWords = 'var(--background-input-color, #e7f6ff)';

const COMMUNICATION_METHODS = 'Способы общения';
const colorCommunicationMethods = 'var(--background-input-color, #e7f6ff)';

export const GroupWordsSection: React.FC<GroupWordsSectionProps> = ({
  newWordsCount,
  verbalWordsCount,
  noBaseWordsCount,
  communicationMethods,
}) => {
  return (
    <section className={`${styles.section} ${styles.noBreak}`}>
      <h2 className={styles.header}>{HEADER_TEXT}</h2>
      <section className={styles.grid}>
        <WordsCountBlock
          title={NEW_WORDS}
          wordCountNow={newWordsCount.now}
          wordCountDelta={newWordsCount.delta}
          bgColor={colorNewWords}
        />

        <WordsCountBlock
          title={VERBAL_WORDS}
          wordCountNow={verbalWordsCount.now}
          wordCountDelta={verbalWordsCount.delta}
          bgColor={colorVerbalWords}
        />

        <WordsCountBlock
          title={NO_BASE_WORDS}
          wordCountNow={noBaseWordsCount.now}
          wordCountDelta={noBaseWordsCount.delta}
          bgColor={colorNoBaseWords}
        />

        <WordsListBlock
          title={COMMUNICATION_METHODS}
          words={communicationMethods}
          bgColor={colorCommunicationMethods}
        />
      </section>
    </section>
  );
};
