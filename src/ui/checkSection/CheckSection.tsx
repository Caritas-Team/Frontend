// src\pages\Result\components\checkSection\CheckSection.tsx

import React from 'react';
import styles from './CheckSection.module.css';
import { Gauge } from '@ui/gauge';
import { LegendItem } from '@ui/legendItem';

const HEADER_TEXT = 'Коммуникативная функция «контроль»';
const TITLE_TEXT = 'Отказывается, отклоняет';
const PROTO_TEXT = 'Протоязык';

/**
 * Тип пропсов для компонента CheckSection
 * @typedef {Object} CheckSectionProps
 * @property {string} [className] - Дополнительные CSS-классы для секции
 * @property {boolean} [headerAlignCenter=false] - Центрировать заголовок секции (используется в десктопной версии групповой страницы)
 * @property {string} date1 - Дата для первого датчика (формат определяется компонентом Gauge)
 * @property {number} formed1 - Процент заполнения фиолетовой дуги для первого датчика (0-100)
 * @property {number} initiative1 - Процент заполнения зеленой дуги для первого датчика (0-100)
 * @property {number} frequency1 - Процент заполнения синей дуги для первого датчика (0-100)
 * @property {string} date2 - Дата для второго датчика (формат определяется компонентом Gauge)
 * @property {number} formed2 - Процент заполнения фиолетовой дуги для второго датчика (0-100)
 * @property {number} initiative2 - Процент заполнения зеленой дуги для второго датчика (0-100)
 * @property {number} frequency2 - Процент заполнения синей дуги для второго датчика (0-100)
 * @property {string} description - Текстовое описание секции (отображается в блоке "Описание")
 */

type CheckSectionProps = {
  className?: string;
  headerAlignCenter?: boolean; // подключается для десктопа на групповой странице
  date1: string; // дата для Gauge
  formed1: number; // фиолетовая дуга %
  initiative1: number; // зелёная дуга %
  frequency1: number; // синяя дуга %
  date2: string; // дата для Gauge
  formed2: number; // фиолетовая дуга %
  initiative2: number; // зелёная дуга %
  frequency2: number; // синяя дуга %
  description: string;
};

/**
 * Секция сравнения показателей с двумя датчиками и легендой
 *
 * @component CheckSection
 * @description
 * Комплексная секция для визуального сравнения двух наборов показателей
 * по коммуникативной функции "контроль". Используется для отображения
 * динамики изменений между двумя временными точками.
 *
 * **Структура секции:**
 * 1. Заголовок секции (h2) с возможностью центрирования
 * 2. Подзаголовок (h3) с названием функции
 * 3. Блок датчиков:
 *    - Заголовок "Протоязык" (h3)
 *    - Два компонента Gauge для сравнения показателей
 *    - Легенда с дельтами изменений между датчиками
 * 4. Блок описания с заголовком "Описание" и текстовым содержанием
 *
 * **Вычисляемые показатели в легенде:**
 * - Сформирован: разница между formed2 и formed1
 * - Инициатива: разница между initiative2 и initiative1
 * - Частота: разница между frequency2 и frequency1
 *
 * @param {CheckSectionProps} props - Свойства компонента
 * @returns {JSX.Element} Секция сравнения с датчиками, легендой и описанием
 *
 * @example
 * // Базовая секция сравнения
 * <CheckSection
 *   date1="Янв 2023"
 *   formed1={30}
 *   initiative1={40}
 *   frequency1={50}
 *   date2="Фев 2023"
 *   formed2={45}
 *   initiative2={35}
 *   frequency2={55}
 *   description="Показатель контроля демонстрирует рост сформированности..."
 * />
 *
 * @example
 * // С центрированным заголовком (для групповой страницы)
 * <CheckSection
 *   headerAlignCenter={true}
 *   date1="Янв"
 *   formed1={25}
 *   initiative1={60}
 *   frequency1={35}
 *   date2="Фев"
 *   formed2={40}
 *   initiative2={55}
 *   frequency2={40}
 *   description="Динамика положительная по всем показателям..."
 * />
 *
 * @example
 * // С дополнительными CSS-классами
 * <CheckSection
 *   className="custom-margin"
 *   date1="2023-01"
 *   formed1={20}
 *   initiative1={30}
 *   frequency1={40}
 *   date2="2023-02"
 *   formed2={35}
 *   initiative2={25}
 *   frequency2={45}
 *   description="Анализ коммуникативной функции контроля..."
 * />
 *
 * @note
 * - Все заголовки фиксированы (HEADER_TEXT, TITLE_TEXT, PROTO_TEXT)
 * - В легенде автоматически вычисляются дельты и определяются направления (positive/negative)
 * - Дельта округляется до целых чисел с помощью Math.round()
 * - Абсолютное значение дельты отображается через Math.abs()
 * - При отсутствии описания отображается "***"
 * - Класс `noBreak` предотвращает разрыв секции при печати
 *
 * @warning
 * 1. Компонент ожидает значения в диапазоне 0-100 для всех процентных параметров
 * 2. Не выполняется валидация корректности дат
 * 3. Отрицательные дельты в легенде отображаются с положительным числом (абсолютное значение)
 * 4. Цвета в LegendItem берутся из CSS-переменных, которые должны быть определены
 * 5. Компонент не адаптивен по умолчанию - адаптация определяется в стилях
 *
 * @accessibility
 * - Используется семантическая разметка: section, h2, h3
 * - Датчики (Gauge) должны иметь собственную accessibility-реализацию
 * - Легенда (LegendItem) должна иметь собственную accessibility-реализацию
 * - Рекомендуется добавить aria-label для всей секции
 * - Для скринридеров можно добавить скрытое описание вычисленных дельт
 *
 * @layout
 * **Десктопная структура:**
 * ```
 * <section class="section noBreak [custom-classes]">
 *   <h2 class="header [headerCentered]">Коммуникативная функция «контроль»</h2>
 *
 *   <div class="container">
 *     <h3 class="title">Отказывается, отклоняет</h3>
 *
 *     <div class="gaugesBox">
 *       <h3 class="centerTitle">Протоязык</h3>
 *
 *       <div class="gauges">
 *         <Gauge date={date1} ... />
 *         <Gauge date={date2} ... />
 *       </div>
 *
 *       <div class="legend">
 *         <LegendItem label="Сформирован" ... />
 *         <LegendItem label="Инициатива" ... />
 *         <LegendItem label="Частота" ... />
 *       </div>
 *     </div>
 *
 *     <div class="descriptionBlock">
 *       <div class="descriptionLabel">Описание</div>
 *       <div class="descriptionContent">{description}</div>
 *     </div>
 *   </div>
 * </section>
 * ```
 *
 * @dependencies
 * - Gauge - Компонент кругового датчика с тремя дугами
 * - LegendItem - Компонент элемента легенды с индикатором изменения
 *
 * @see Gauge - Компонент датчика
 * @see LegendItem - Компонент элемента легенды
 * @see CheckSection.module.css - Стили компонента
 *
 * @todo
 * - Добавить поддержку локализации текстовых констант
 * - Реализовать адаптивный дизайн для мобильных устройств
 * - Добавить валидацию входных параметров (0-100 для процентов)
 * - Реализовать скелетон-загрузку для асинхронной подгрузки данных
 * - Добавить обработку ошибок при некорректных данных
 * - Реализовать возможность скрытия/раскрытия описания
 * - Добавить tooltip с подробной информацией о каждом показателе
 * - Поддержка темной/светлой темы
 * - Добавить анимацию при появлении/изменении данных
 * - Реализовать экспорт данных секции (CSV, изображение)
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Визуальное сравнение двух временных точек по трем показателям
 * 2. Наглядное отображение динамики изменений через легенду с дельтами
 * 3. Предоставление контекста через текстовое описание
 * 4. Создание структурированного отчета по коммуникативной функции
 * 5. Обеспечение целостности данных при печати (noBreak)
 * 6. Интеграция с дизайн-системой через @ui компоненты
 *
 * @business_logic
 * Вычисление дельт в легенде:
 * 1. Сформирован: formed2 - formed1
 * 2. Инициатива: initiative2 - initiative1
 * 3. Частота: frequency2 - frequency1
 * 4. Округление: Math.round()
 * 5. Абсолютное значение: Math.abs()
 * 6. Направление: положительное если разница >= 0
 */

export const CheckSection: React.FC<CheckSectionProps> = ({
  className,
  headerAlignCenter = false,
  date1,
  formed1,
  initiative1,
  frequency1,
  date2,
  formed2,
  initiative2,
  frequency2,
  description,
}) => {
  return (
    <section
      className={`${styles.section} ${styles.noBreak} ${className ?? ''}`}
    >
      <h2
        className={
          headerAlignCenter
            ? `${styles.header} ${styles.headerCentered}`
            : styles.header
        }
      >
        {HEADER_TEXT}
      </h2>

      <div className={styles.container}>
        <h3 className={styles.title}>{TITLE_TEXT}</h3>

        <div className={styles.gaugesBox}>
          <h3 className={styles.centerTitle}>{PROTO_TEXT}</h3>

          <div className={styles.gauges}>
            <Gauge
              date={date1}
              formed={formed1}
              initiative={initiative1}
              frequency={frequency1}
            />

            <Gauge
              date={date2}
              formed={formed2}
              initiative={initiative2}
              frequency={frequency2}
            />
          </div>

          <div className={styles.legend}>
            <LegendItem
              label="Сформирован"
              color="var(--chart-circle-first-color, #8550f6)"
              digitsText={`${Math.abs(Math.round(formed2 - formed1))}%`}
              positive={formed2 - formed1 >= 0}
            />

            <LegendItem
              label="Инициатива"
              color="var(--chart-circle-second-color, #67f4b1)"
              digitsText={`${Math.abs(Math.round(initiative2 - initiative1))}%`}
              positive={initiative2 - initiative1 >= 0}
            />

            <LegendItem
              label="Частота"
              color="var(--chart-circle-third-sector-color, #5b93f4)"
              digitsText={`${Math.abs(Math.round(frequency2 - frequency1))}%`}
              positive={frequency2 - frequency1 >= 0}
            />
          </div>
        </div>

        {/* Блок описания */}
        <div className={styles.descriptionBlock}>
          <div className={styles.descriptionLabel}>Описание</div>
          <div className={styles.descriptionContent}>
            {description || '***'}
          </div>
        </div>
      </div>
    </section>
  );
};
