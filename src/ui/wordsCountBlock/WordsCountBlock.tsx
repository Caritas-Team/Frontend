// src\pages\Result\components\wordsCountBlock\WordsCountBlock.tsx

import React from 'react';
import styles from './WordsCountBlock.module.css';
import VerbalIcon from '@/assets/letter-a.svg';

/**
 * Тип пропсов для компонента WordsCountBlock
 * @typedef {Object} WordsCountBlockProps
 * @property {string} title - Заголовок блока с категорией слов
 * @property {number} wordCountNow - Текущее количество слов в категории
 * @property {number} wordCountDelta - Изменение количества слов относительно предыдущего результата
 * @property {string} bgColor - Цвет фона блока в любом CSS-формате
 */

type WordsCountBlockProps = {
  title: string;
  wordCountNow: number;
  wordCountDelta: number;
  bgColor: string;
};

/**
 * Вспомогательная функция для склонения слова "слово" в зависимости от числа
 *
 * @function pluralizeWords
 * @private
 * @description
 * Возвращает строку с числом и правильно склоненным словом "слово" в единственном или множественном числе.
 * Поддерживает все формы: "слово", "слова", "слов".
 *
 * @param {number} n - Число для склонения
 * @param {boolean} [withSign=false] - Добавлять знак "+" или "-" перед числом
 * @returns {string} Отформатированная строка (например: "+5 слов", "1 слово", "-3 слова")
 *
 * @example
 * pluralizeWords(1); // "1 слово"
 * pluralizeWords(3); // "3 слова"
 * pluralizeWords(5); // "5 слов"
 * pluralizeWords(15); // "15 слов"
 * pluralizeWords(-2, true); // "-2 слова"
 * pluralizeWords(5, true); // "+5 слов"
 *
 * @note
 * Функция учитывает все правила русского языка:
 * - 1, 21, 31... (кроме 11, 111...) → "слово"
 * - 2-4, 22-24, 32-34... (кроме 12-14, 112-114...) → "слова"
 * - остальные → "слов"
 *
 * @algorithm
 * 1. Берется абсолютное значение числа
 * 2. Проверяется последняя цифра и две последние цифры
 * 3. Выбирается правильная форма по правилам русского языка
 */

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

/**
 * Компонент для отображения статистики по количеству слов с иконкой и дельтой изменений
 *
 * @component WordsCountBlock
 * @description
 * Визуальный компонент, отображающий статистику по категориям слов с поддержкой:
 * - Иконки категории
 * - Текущего количества слов
 * - Изменения относительно предыдущего результата
 * - Правильного склонения слова "слово"
 *
 * Используется для визуализации результатов анализа текста, показывая динамику
 * изменений между текущим и предыдущим анализом.
 *
 * @param {WordsCountBlockProps} props - Свойства компонента
 * @returns {JSX.Element} Блок статистики слов
 *
 * @example
 * // Блок с положительной динамикой
 * <WordsCountBlock
 *   title="Позитивные слова"
 *   wordCountNow={15}
 *   wordCountDelta={3}
 *   bgColor="#e8f5e9"
 * />
 * // Отобразит: 15 слов, +3 слова к прошлому результату
 *
 * @example
 * // Блок с отрицательной динамикой
 * <WordsCountBlock
 *   title="Негативные слова"
 *   wordCountNow={5}
 *   wordCountDelta={-2}
 *   bgColor="#ffebee"
 * />
 * // Отобразит: 5 слов, -2 слова к прошлому результату
 *
 * @example
 * // Блок с нулевой динамикой
 * <WordsCountBlock
 *   title="Нейтральные слова"
 *   wordCountNow={10}
 *   wordCountDelta={0}
 *   bgColor="#f5f5f5"
 * />
 * // Отобразит: 10 слов, 0 слов к прошлому результату
 *
 * @example
 * // Блок с одним словом
 * <WordsCountBlock
 *   title="Ключевые слова"
 *   wordCountNow={1}
 *   wordCountDelta={1}
 *   bgColor="#e3f2fd"
 * />
 * // Отобразит: 1 слово, +1 слово к прошлому результату
 *
 * @note
 * - Иконка всегда одинаковая (VerbalIcon) для всех блоков
 * - Для склонения слова "слово" используется внутренняя функция pluralizeWords
 * - Знак "+" добавляется только для положительной дельты при withSign=true
 *
 * @warning
 * 1. Иконка имеет пустой alt="" - это допустимо только если она декоративная
 * 2. Отрицательные значения wordCountNow могут привести к некорректному отображению
 * 3. Очень большие числа могут нарушить верстку
 *
 * @accessibility
 * - Иконка имеет alt="" так как является декоративной
 * - Рекомендуется добавить aria-label для всего блока
 * - Для улучшения доступности можно добавить role="status" для динамических данных
 *
 * @layout
 * Структура компонента:
 * 1. Контейнер блока с фоном
 * 2. Заголовок с иконкой
 * 3. Основная информация: текущее количество слов
 * 4. Строка дельты: изменение + пояснительный текст
 *
 * @see WordsCountBlock.module.css - Стили компонента
 * @see VerbalIcon - Иконка компонента
 *
 * @todo
 * - Добавить пропс для кастомной иконки
 * - Добавить валидацию входных параметров
 * - Добавить анимацию при изменении значений
 * - Реализовать цветовое кодирование дельты (зеленый/красный)
 * - Добавить tooltip с дополнительной информацией
 * - Поддержка других слов кроме "слово" (например, "фраза", "термин")
 *
 * @design
 * Компонент предназначен для:
 * - Наглядного отображения статистики анализа текста
 * - Быстрого восприятия динамики изменений
 * - Визуального сравнения разных категорий слов
 * - Создания информационной панели результатов
 */

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
