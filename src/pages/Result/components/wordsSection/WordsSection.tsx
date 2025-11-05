// src\pages\Result\components\wordsSection\WordsSection.tsx

import React from 'react';
import styles from './WordsSection.module.css';

type WordsSectionProps = {
  new_words: string[];
  methods: string[];
  messages: string[];
  words1: number;
  words2: number;
};

const HEADER_TEXT = 'Доступный словарный запас';
const ABSENT_WORDS = 'Слова, которых нет в словаре выше';
const COMMUNICATION_METHODS = 'Способы общения';
const VERBAL_WORDS = 'Вербальные слова';
const QUICK_MESSAGES = 'Быстрые сообщения';

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

export const WordsSection: React.FC<WordsSectionProps> = ({
  new_words,
  methods,
  messages,
  words1,
  words2,
}) => {
  return (
    <section>
      <h2 className={styles.header}>{HEADER_TEXT}</h2>

      <section className={styles.extraGrid}>
        <div className={`${styles.extraWords} ${styles.extraBlocks}`}>
          <h3 className={styles.extraTitle}>{ABSENT_WORDS}</h3>

          <div className={styles.extraChips}>
            {new_words.map(word => (
              <span key={word} className={styles.extraChip}>
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className={`${styles.communicationMethods} ${styles.extraBlocks}`}>
          <h3 className={styles.extraTitle}>{COMMUNICATION_METHODS}</h3>
          <div className={styles.extraChips}>
            {methods.map(method => (
              <span key={method} className={styles.extraChip}>
                {method}
              </span>
            ))}
          </div>
        </div>

        <div className={`${styles.verbalWords} ${styles.extraBlocks}`}>
          <h3 className={styles.extraTitle}>{VERBAL_WORDS}</h3>
          <div className={styles.extraInfo}>
            {pluralizeWords(words1, false)}
          </div>
          <div className={styles.extraDeltaLine}>
            <span className={styles.extraDelta}>
              {pluralizeWords(words2, true)}
            </span>
            <span className={styles.extraSub}>к прошлому результату</span>
          </div>
        </div>

        <div className={`${styles.quickMessages} ${styles.extraBlocks}`}>
          <h3 className={styles.extraTitle}>{QUICK_MESSAGES}</h3>
          <div className={styles.extraChips}>
            {messages.map(message => (
              <span key={message} className={styles.extraChip}>
                {message}
              </span>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};
