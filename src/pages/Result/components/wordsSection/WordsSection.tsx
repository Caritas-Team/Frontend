// src\pages\Result\components\wordsSection\WordsSection.tsx

import React from 'react';
import styles from './WordsSection.module.css';
import { WordsListBlock } from '@ui/wordsListBlock';
import { WordsCountBlock } from '@ui/wordsCountBlock';

type WordsSectionProps = {
  className?: string;
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

/**
 * Компонент секции "Доступный словарный запас" для отображения различных категорий слов и методов общения
 *
 * Отображает четыре блока с информацией о словарном запасе пользователя:
 * новые слова, способы общения, вербальные слова и быстрые сообщения.
 *
 * @component
 * @example
 * // Пример использования с полными данными
 * <WordsSection
 *   newWords={['реабилитация', 'терапия', 'коммуникация']}
 *   communicationMethods={['жесты', 'карточки', 'приложение']}
 *   quickMessages={['привет', 'помощь', 'спасибо']}
 *   verbalWordCount={{ now: 150, delta: 25 }}
 * />
 *
 * @typedef {Object} WordsSectionProps
 * @property {string} [className] - Дополнительные CSS-классы для секции
 * @property {string[]} newWords - Массив новых слов, изученных пользователем
 * @property {string[]} communicationMethods - Массив способов общения
 * @property {string[]} quickMessages - Массив быстрых сообщений/фраз
 * @property {Object} verbalWordCount - Объект с количеством вербальных слов
 * @property {number} verbalWordCount.now - Текущее количество вербальных слов
 * @property {number} verbalWordCount.delta - Изменение количества вербальных слов (разница)
 *
 * @param {WordsSectionProps} props - Пропсы компонента
 * @param {string} [props.className] - Дополнительный CSS-класс для стилизации контейнера
 * @param {string[]} props.newWords - Список новых слов, изученных пользователем
 * @param {string[]} props.communicationMethods - Список доступных способов коммуникации
 * @param {string[]} props.quickMessages - Список быстрых сообщений/готовых фраз
 * @param {Object} props.verbalWordCount - Данные о вербальном словарном запасе
 * @param {number} props.verbalWordCount.now - Текущее количество слов
 * @param {number} props.verbalWordCount.delta - Изменение количества слов (может быть положительным или отрицательным)
 *
 * @returns {JSX.Element} Возвращает секцию с заголовком и сеткой из четырех блоков
 *
 * @description
 * Компонент разделяет словарный запас на четыре категории:
 * 1. Новые слова - недавно изученные слова
 * 2. Способы общения - методы и инструменты коммуникации
 * 3. Вербальные слова - количественные показатели словесного запаса
 * 4. Быстрые сообщения - готовые фразы для быстрой коммуникации
 *
 * @structure
 * - Заголовок "Доступный словарный запас"
 * - Сетка из четырех блоков:
 *   1. WordsListBlock для новых слов (голубой фон)
 *   2. WordsListBlock для способов общения (голубой фон)
 *   3. WordsCountBlock для вербальных слов (фиолетовый фон)
 *   4. WordsListBlock для быстрых сообщений (голубой фон)
 *
 * @styles
 * Компонент использует CSS-переменные для цветов фона:
 * - Новые слова: --background-input-color (#e7f6ff)
 * - Способы общения: --background-input-color (#e7f6ff)
 * - Вербальные слова: --background-accent-color (#f3edff)
 * - Быстрые сообщения: --background-input-color (#e7f6ff)
 *
 * @dependencies
 * - WordsListBlock: Компонент для отображения списка слов
 * - WordsCountBlock: Компонент для отображения числовых показателей слов
 *
 * @constants
 * - HEADER_TEXT: "Доступный словарный запас"
 * - NEW_WORDS: "Новые слова"
 * - COMMUNICATION_METHODS: "Способы общения"
 * - VERBAL_WORDS: "Вербальные слова"
 * - QUICK_MESSAGES: "Быстрые сообщения"
 *
 * @note Добавлен CSS-класс `noBreak` для предотвращения разрыва при печати/экспорте
 * @note Компонент использует абсолютные пути импорта через алиас @ui
 *
 * @see WordsListBlock Дочерний компонент для отображения списков слов
 * @see WordsCountBlock Дочерний компонент для отображения счетчиков слов
 */

export const WordsSection: React.FC<WordsSectionProps> = ({
  className,
  newWords,
  communicationMethods,
  quickMessages,
  verbalWordCount,
}) => {
  return (
    <section
      className={`${styles.section} ${styles.noBreak} ${className ?? ''}`}
    >
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
