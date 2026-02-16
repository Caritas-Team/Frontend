// src\pages\ResultGroup\components\groupWordsSection\GroupWordsSection.tsx

import React from 'react';
import styles from './GroupWordsSection.module.css';
import { WordsListBlock } from '@ui/wordsListBlock';
import { WordsCountBlock } from '@ui/wordsCountBlock';

type GroupWordsSectionProps = {
  className?: string;
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

/**
 * Компонент секции "Доступный словарный запас группы" для сводной статистики по словарю группы
 *
 * Отображает четыре блока с количественными показателями и списками,
 * характеризующие словарный запас группы пользователей.
 * Три блока показывают числовые счетчики с динамикой изменений,
 * один блок отображает список способов общения.
 *
 * @component
 * @example
 * // Пример использования
 * <GroupWordsSection
 *   newWordsCount={{ now: 42, delta: 12 }}
 *   verbalWordsCount={{ now: 128, delta: -5 }}
 *   noBaseWordsCount={{ now: 36, delta: 8 }}
 *   communicationMethods={['жесты', 'PECS', 'коммуникатор', 'речь']}
 * />
 *
 * @typedef {Object} GroupWordsSectionProps
 * @property {string} [className] - Дополнительные CSS-классы для секции
 * @property {Object} newWordsCount - Статистика по новым словам группы
 * @property {number} newWordsCount.now - Текущее количество новых слов
 * @property {number} newWordsCount.delta - Изменение количества новых слов (может быть отрицательным)
 * @property {Object} verbalWordsCount - Статистика по вербальным словам
 * @property {number} verbalWordsCount.now - Текущее количество вербальных слов
 * @property {number} verbalWordsCount.delta - Изменение количества вербальных слов
 * @property {Object} noBaseWordsCount - Статистика по словам, отсутствующим в базовом наборе
 * @property {number} noBaseWordsCount.now - Текущее количество уникальных слов
 * @property {number} noBaseWordsCount.delta - Изменение количества уникальных слов
 * @property {string[]} communicationMethods - Массив используемых способов коммуникации
 *
 * @param {GroupWordsSectionProps} props - Пропсы компонента
 * @param {string} [props.className] - Дополнительный CSS-класс для стилизации контейнера
 * @param {Object} props.newWordsCount - Данные о новых словах группы
 * @param {number} props.newWordsCount.now - Текущее количество новых изученных слов
 * @param {number} props.newWordsCount.delta - Прирост или убыль новых слов
 * @param {Object} props.verbalWordsCount - Данные о вербальном словарном запасе
 * @param {number} props.verbalWordsCount.now - Текущее количество словесных выражений
 * @param {number} props.verbalWordsCount.delta - Динамика вербального запаса
 * @param {Object} props.noBaseWordsCount - Данные о словах вне базового набора
 * @param {number} props.noBaseWordsCount.now - Количество уникальных/специфичных слов
 * @param {number} props.noBaseWordsCount.delta - Изменение количества уникальных слов
 * @param {string[]} props.communicationMethods - Список используемых методов коммуникации
 *
 * @returns {JSX.Element} Возвращает секцию с заголовком и сеткой из четырех блоков
 *
 * @description
 * Компонент предназначен для отображения сводной статистики словарного запаса
 * группы пользователей. В отличие от индивидуальной версии, фокусируется на
 * агрегированных данных по всей группе.
 *
 * @structure
 * - Заголовок "Доступный словарный запас" (одинаковый с индивидуальной версией)
 * - Сетка 2×2 с четырьмя блоками:
 *   1. WordsCountBlock для новых слов (зеленый фон)
 *   2. WordsCountBlock для вербальных слов (фиолетовый фон)
 *   3. WordsCountBlock для слов вне базового набора (голубой фон)
 *   4. WordsListBlock для способов общения (голубой фон)
 *
 * @categories
 * 1. **Новые слова** - недавно добавленные в словарь группы
 *    - Зеленый фон (--green-light, #e7fff4)
 * 2. **Вербальные слова** - словарный запас устной речи
 *    - Фиолетовый фон (--background-accent-color, #f3edff)
 * 3. **Слова, которых нет в Базовом** - уникальные/специализированные слова
 *    - Голубой фон (--background-input-color, #e7f6ff)
 * 4. **Способы общения** - используемые коммуникативные методы
 *    - Голубой фон (--background-input-color, #e7f6ff)
 *
 * @styles
 * Используются CSS-переменные для цветового кодирования:
 * - Новые слова: зеленый (#e7fff4)
 * - Вербальные слова: фиолетовый (#f3edff)
 * - Уникальные слова и способы общения: голубой (#e7f6ff)
 *
 * @comparison
 * Отличия от индивидуального компонента WordsSection:
 * - Нет блока "Быстрые сообщения"
 * - Добавлен блок "Слова, которых нет в Базовом"
 * - Все три количественных блока используют WordsCountBlock
 * - Только один блок использует WordsListBlock
 * - Другие цвета для категорий
 *
 * @dependencies
 * - WordsListBlock: для отображения списка способов общения
 * - WordsCountBlock: для отображения трех числовых показателей с динамикой
 *
 * @constants
 * - HEADER_TEXT: "Доступный словарный запас"
 * - NEW_WORDS: "Новые слова"
 * - VERBAL_WORDS: "Вербальные слова"
 * - NO_BASE_WORDS: "Слова, которых нет в Базовом"
 * - COMMUNICATION_METHODS: "Способы общения"
 *
 * @note Добавлен CSS-класс `noBreak` для предотвращения разрыва при печати/экспорте
 * @note Все числовые блоки отображают как текущее значение, так и дельту изменений
 * @note Компонент использует абсолютные пути импорта через алиас @ui
 *
 * @see WordsSection Индивидуальная версия компонента для одного пользователя
 * @see WordsListBlock Дочерний компонент для отображения списков
 * @see WordsCountBlock Дочерний компонент для отображения счетчиков с динамикой
 */

export const GroupWordsSection: React.FC<GroupWordsSectionProps> = ({
  className,
  newWordsCount,
  verbalWordsCount,
  noBaseWordsCount,
  communicationMethods,
}) => {
  return (
    <section
      className={`${styles.section} ${styles.noBreak} ${className ?? ''}`}
    >
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
