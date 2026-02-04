// src\pages\ResultGroup\components\header\Header.tsx

import React from 'react';
import styles from './Header.module.css';
import { Logo } from '@ui/logo';
import { Button } from '@ui/button';
import PrintIcon from '@/assets/icon-print.svg';
import { Link } from 'react-router-dom';

/**
 * Хедер страницы группы результатов с навигацией и действиями
 *
 * @component Header
 * @description
 * Верхний навигационный компонент для страницы с группой результатов.
 * Содержит логотип с ссылкой на главную страницу и панель действий:
 * 1. Кнопка "Сохранить" (вторичный стиль) - для сохранения результатов
 * 2. Кнопка "Печать" (третичный стиль) с иконкой - для вызова диалога печати
 *
 * Компонент использует UI-компоненты из дизайн-системы (@ui) и React Router
 * для навигации. Предназначен для использования на страницах с результатами
 * анализа или отчетов.
 *
 * @returns {JSX.Element} Хедер с логотипом и кнопками действий
 *
 * @example
 * // Использование на странице результатов
 * const ResultsGroupPage = () => {
 *   return (
 *     <div className="page">
 *       <Header />
 *       <main>
 *         {/* контент страницы * /}
 *       </main>
 *     </div>
 *   );
 * };
 *
 * @note
 * - Логотип кликабелен и ведет на главную страницу (/)
 * - Кнопка "Сохранить" в текущей реализации только логирует действие
 * - Кнопка "Печать" вызывает нативный диалог печати через window.print()
 * - Иконка печати использует SVG-изображение из ассетов
 *
 * @accessibility
 * - Логотип вложен в ссылку <Link> для навигации
 * - Иконка печати имеет alt-текст "Иконка печати"
 * - Кнопки используют компонент Button с встроенной доступностью
 * - Для улучшения можно добавить aria-label для всего хедера
 *
 * @layout
 * Структура компонента:
 * ```
 * <header class="header">
 *   <Link to="/">           // Ссылка на главную
 *     <Logo />              // Компонент логотипа
 *   </Link>
 *
 *   <div class="header__buttons"> // Контейнер кнопок
 *     <Button label="Сохранить" secondary />  // Кнопка сохранения
 *     <Button label="Печать" tertiary icon={PrintIcon} /> // Кнопка печати
 *   </div>
 * </header>
 * ```
 *
 * @dependencies
 * - Logo - Компонент логотипа из дизайн-системы
 * - Button - Компонент кнопки из дизайн-системы
 * - Link - Компонент навигации из React Router
 * - PrintIcon - SVG-иконка для кнопки печати
 *
 * @see Logo - Компонент логотипа
 * @see Button - Компонент кнопки
 * @see Link - Компонент навигации React Router
 * @see Header.module.css - Стили компонента
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Обеспечивает навигацию на главную страницу
 * 2. Предоставляет доступ к основным действиям с результатами
 * 3. Сохраняет брендинг через логотип
 * 4. Создает консистентный хедер для всех страниц результатов
 * 5. Интегрируется с дизайн-системой через @ui компоненты
 *
 * @responsibilities
 * 1. Навигация: возврат на главную через логотип
 * 2. Действия: сохранение и печать результатов
 * 3. Брендинг: отображение логотипа приложения
 * 4. UX: предоставление быстрого доступа к основным функциям
 */

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>

      <div className={styles.header__buttons}>
        <Button
          label="Сохранить"
          secondary
          onClick={() => {
            console.log('Button Save has been pressed');
          }}
        ></Button>

        <Button
          label="Печать"
          tertiary
          onClick={() => window.print()}
          icon={
            <img
              src={PrintIcon}
              alt="Иконка печати"
              className={styles.button_icon}
            />
          }
        ></Button>
      </div>
    </header>
  );
};
