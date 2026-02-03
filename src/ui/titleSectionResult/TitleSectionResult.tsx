import React from 'react';
import styles from './TitleSectionResult.module.css';
import { formatDateShort, isValidDate } from '../../lib/utils';

/**
 * Тип пропсов для компонента TitleSectionResult
 * @typedef {Object} TTitleSectionResult
 * @property {string} [className] - Дополнительные CSS-классы для секции
 * @property {string} [reportDate] - Дата отчета в формате 'YYYY-MM-DD'
 */

type TTitleSectionResult = {
  className?: string;
  reportDate?: string; // ожидаемый формат 'гггг-мм-дд'
};

/**
 * Компонент заголовка секции с результатами расчета и датой отчета
 *
 * @component TitleSectionResult
 * @description
 * Заголовочный компонент для страницы результатов, отображающий:
 * - Основной заголовок "Результат расчёта динамики"
 * - Дату отчета в формате DD.MM.YYYY с добавлением "г."
 *
 * Компонент автоматически обрабатывает валидацию и форматирование даты:
 * 1. Если дата передана и валидна - форматируется в русский формат
 * 2. Если дата не передана или невалидна - используется текущая дата
 * 3. Результат всегда содержит " г." в конце (сокращение от "года")
 *
 * @param {TTitleSectionResult} props - Свойства компонента
 * @returns {JSX.Element} Секция с заголовком и датой
 *
 * @example
 * // С передачей даты отчета
 * <TitleSectionResult reportDate="2023-12-31" />
 * // Отобразит: "Результат расчёта динамики" и "31.12.2023 г."
 *
 * @example
 * // Без даты (используется текущая дата)
 * <TitleSectionResult />
 * // Если сегодня 2024-01-15, отобразит: "Результат расчёта динамики" и "15.01.2024 г."
 *
 * @example
 * // С невалидной датой
 * <TitleSectionResult reportDate="невалидная-дата" />
 * // Используется текущая дата
 *
 * @example
 * // С дополнительным классом для стилизации
 * <TitleSectionResult
 *   className="custom-styles"
 *   reportDate="2023-06-15"
 * />
 *
 * @example
 * // В составе страницы результатов
 * const ResultsPage = () => (
 *   <div>
 *     <TitleSectionResult reportDate={data.reportDate} />
 *     {/* остальной контент * /}
 *   </div>
 * );
 *
 * @note
 * - Форматирование даты: используется утилита formatDateShort из '../../lib/utils'
 * - Валидация даты: используется утилита isValidDate из '../../lib/utils'
 * - Формат даты на выходе: "DD.MM.YYYY г."
 * - Текущая дата берется из локального времени браузера
 *
 * @warning
 * 1. Зависит от корректной работы утилит formatDateShort и isValidDate
 * 2. При использовании текущей даты учитывается часовой пояс пользователя
 * 3. Месяцы в JavaScript: 0 = январь, поэтому добавляется +1
 * 4. Компонент не обрабатывает часовой пояс для переданной даты
 *
 * @accessibility
 * - Используется семантический тег <section> для обозначения секции
 * - Заголовок первого уровня <h1> для основного заголовка страницы
 * - Дата представлена в понятном формате для всех пользователей
 *
 * @layout
 * Структура компонента:
 * 1. Секция (<section>) с объединенными классами
 * 2. Заголовок <h1> с основным текстом
 * 3. Элемент <span> с отформатированной датой
 *
 * @dependencies
 * - formatDateShort - форматирует дату из YYYY-MM-DD в DD.MM.YYYY
 * - isValidDate - проверяет валидность строки с датой
 *
 * @see formatDateShort - Утилита для форматирования даты
 * @see isValidDate - Утилита для валидации даты
 * @see TitleSectionResult.module.css - Стили компонента
 *
 * @todo
 * - Добавить поддержку локализации (i18n) для заголовка и формата даты
 * - Добавить пропс для кастомного заголовка
 * - Реализовать скелетон-загрузку для асинхронной подгрузки даты
 * - Добавить обработку ошибок форматирования даты
 * - Поддержать разные форматы входной даты
 * - Добавить tooltip с полной датой и временем
 *
 * @design
 * Компонент выполняет следующие задачи:
 * - Четко обозначает начало раздела с результатами
 * - Предоставляет контекст времени для результатов
 * - Создает визуальную иерархию на странице
 * - Обеспечивает согласованное отображение даты во всем приложении
 */

export const TitleSectionResult: React.FC<TTitleSectionResult> = ({
  className,
  reportDate,
}) => {
  // если дата не передана с бэкенда или передана в неправильном формате, то указывается текущая дата
  const formattedReportDate: string =
    reportDate && isValidDate(reportDate)
      ? formatDateShort(reportDate)
      : formatDateShort(
          `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
        );
  return (
    <section
      className={className ? `${className} ${styles.section}` : styles.section}
    >
      <h1 className={styles.title}>Результат расчёта динамики</h1>
      <span className={styles.date}>{formattedReportDate + ' г.'}</span>
    </section>
  );
};
