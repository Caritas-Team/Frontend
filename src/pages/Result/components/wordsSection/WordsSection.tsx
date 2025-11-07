// src\pages\Result\components\wordsSection\WordsSection.tsx

import React from 'react';
import styles from './WordsSection.module.css';
import VerbalIcon from '@/assets/letter-a.svg';

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
    <section className={styles.section}>
      <h2 className={styles.header}>{HEADER_TEXT}</h2>

      <section className={styles.grid}>
        <div className={`${styles.extraWords} ${styles.block}`}>
          <h3 className={styles.title}>{ABSENT_WORDS}</h3>

          <div className={styles.chips}>
            {new_words.map(word => (
              <span key={word} className={styles.chip}>
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className={`${styles.communicationMethods} ${styles.block}`}>
          <h3 className={styles.title}>{COMMUNICATION_METHODS}</h3>
          <div className={styles.chips}>
            {methods.map(method => (
              <span key={method} className={styles.chip}>
                {method}
              </span>
            ))}
          </div>
        </div>

        <div className={`${styles.verbalWords} ${styles.block}`}>
          <h3 className={styles.title}>
            <img src={VerbalIcon} alt="" className={styles.icon} />
            {VERBAL_WORDS}
          </h3>
          <div className={styles.info}>{pluralizeWords(words1, false)}</div>
          <div className={styles.deltaLine}>
            <span className={styles.delta}>{pluralizeWords(words2, true)}</span>
            <span className={styles.sub}>к прошлому результату</span>
          </div>
        </div>

        <div className={`${styles.quickMessages} ${styles.block}`}>
          <h3 className={styles.title}>{QUICK_MESSAGES}</h3>
          <div className={styles.chips}>
            {messages.map(message => (
              <span key={message} className={styles.chip}>
                {message}
              </span>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};
