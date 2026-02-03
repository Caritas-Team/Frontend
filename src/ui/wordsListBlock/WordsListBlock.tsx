// src\pages\Result\components\wordsListBlock\WordsListBlock.tsx

import React from 'react';
import styles from './WordsListBlock.module.css';

/**
 * Тип пропсов для компонента WordsListBlock
 * @typedef {Object} WordsListBlockProps
 * @property {string} title - Заголовок блока
 * @property {string[]} words - Массив слов/фраз для отображения
 * @property {string} bgColor - Цвет фона блока в любом CSS-формате
 */

type WordsListBlockProps = {
  title: string;
  words: string[];
  bgColor: string;
};

/**
 * Компонент для отображения блока со списком слов в виде чипсов
 *
 * @component WordsListBlock
 * @description
 * Визуальный компонент, представляющий группу связанных слов или тегов
 * в виде цветного блока с заголовком. Каждое слово отображается как отдельный
 * чип (chip) внутри блока. Используется для визуализации категорий,
 * тегов, ключевых слов или групп связанных элементов.
 *
 * @param {WordsListBlockProps} props - Свойства компонента
 * @returns {JSX.Element} Блок со списком слов
 *
 * @example
 * // Блок с положительными словами
 * <WordsListBlock
 *   title="Сильные стороны"
 *   words={['коммуникабельность', 'ответственность', 'лидерство']}
 *   bgColor="#e8f5e9"
 * />
 *
 * @example
 * // Блок с областями развития
 * <WordsListBlock
 *   title="Навыки для развития"
 *   words={['тайм-менеджмент', 'публичные выступления', 'делегирование']}
 *   bgColor="#fff3e0"
 * />
 *
 * @example
 * // Блок с тегами
 * <WordsListBlock
 *   title="Теги"
 *   words={['React', 'TypeScript', 'UI/UX', 'Frontend']}
 *   bgColor="#e3f2fd"
 * />
 *
 * @example
 * // С пустым списком слов
 * <WordsListBlock
 *   title="Пока пусто"
 *   words={[]}
 *   bgColor="#f5f5f5"
 * />
 * // Отобразит только заголовок без чипсов
 *
 * @note
 * - Для уникальности ключей используется комбинация слова и индекса
 * - Цвет фона применяется инлайн через style attribute
 * - Слова отображаются в порядке массива
 *
 * @warning
 * 1. Если передать длинные слова, они могут не поместиться в чип
 * 2. При большом количестве слов может потребоваться скролл
 * 3. Цвет фона не валидируется - убедитесь в корректности формата
 *
 * @accessibility
 * Компонент использует семантические теги:
 * - `<h3>` для заголовка
 * - `<span>` для отдельных слов
 * Рекомендуется добавить aria-label для блока, если он имеет важное значение
 *
 * @layout
 * Структура компонента:
 * 1. Контейнер блока (div) с заданным фоном
 * 2. Заголовок h3
 * 3. Контейнер для чипсов (div)
 * 4. Чипсы (span) для каждого слова
 *
 * @see WordsListBlock.module.css - Стили компонента
 *
 * @todo
 * - Добавить пропс `maxWords` для ограничения количества отображаемых слов
 * - Добавить кнопку "Показать все" для длинных списков
 * - Добавить валидацию цвета фона
 * - Добавить поддержку кастомных CSS-классов
 * - Добавить обработку клика по чипсам
 * - Реализовать адаптивную высоту блока
 *
 * @design
 * Компонент предназначен для:
 * - Визуальной группировки связанных элементов
 * - Цветового кодирования категорий
 * - Быстрого обзора тегов или ключевых слов
 * - Улучшения визуальной иерархии информации
 */

export const WordsListBlock: React.FC<WordsListBlockProps> = ({
  title,
  words,
  bgColor,
}) => {
  return (
    <div className={styles.block} style={{ backgroundColor: bgColor }}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.wordChips}>
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className={styles.wordChip}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};
