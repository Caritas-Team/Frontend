// src\pages\Result\components\legendItem\LegendItem.tsx
import styles from './LegendItem.module.css';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Delta } from '../delta/Delta';

/**
 * Тип пропсов для компонента LegendItem
 * @typedef {Object} LegendProps
 * @property {string} label - Текст метки легенды
 * @property {string} color - Цвет маркера в любом CSS-формате
 * @property {string} digitsText - Числовое значение с символом (например, "25%", "+3.5")
 * @property {boolean} positive - Флаг, указывающий на позитивное/негативное значение
 */

type LegendProps = {
  label: string;
  color: string;
  digitsText: string; // например "25%"
  positive: boolean;
};

/**
 * Адаптивный элемент легенды для графиков или диаграмм с поддержкой мобильных устройств
 *
 * @component LegendItem
 * @description
 * Элемент легенды, отображающий цветной маркер, текстовую метку и числовое значение
 * с индикатором тренда (положительного/отрицательного). Компонент автоматически
 * адаптирует макет в зависимости от устройства (десктоп/мобильный):
 *
 * **Десктоп версия (горизонтальная):**
 * ```
 * [●] Метка        [+25%]
 * ```
 *
 * **Мобильная версия (вертикальная):**
 * ```
 * Метка
 * [+25%] [●]
 * ```
 *
 * Для определения типа устройства используется кастомный хук useIsMobile.
 *
 * @param {LegendProps} props - Свойства компонента
 * @returns {JSX.Element} Элемент легенды с адаптивным макетом
 *
 * @example
 * // Десктоп версия
 * <LegendItem
 *   label="Продажи"
 *   color="#4caf50"
 *   digitsText="+25%"
 *   positive={true}
 * />
 * // Отобразит: ● Продажи [+25%] (горизонтально)
 *
 * @example
 * // Мобильная версия (при isMobile = true)
 * <LegendItem
 *   label="Конверсия"
 *   color="#ff9800"
 *   digitsText="-12%"
 *   positive={false}
 * />
 * // Отобразит:
 * // Конверсия
 * // [-12%] ● (вертикально)
 *
 * @example
 * // Использование в легенде графика
 * const legendData = [
 *   { label: '2023', color: '#3f51b5', digitsText: '45%', positive: true },
 *   { label: '2024', color: '#ff4081', digitsText: '62%', positive: true }
 * ];
 *
 * return (
 *   <div className="legend">
 *     {legendData.map((item, index) => (
 *       <LegendItem key={index} {...item} />
 *     ))}
 *   </div>
 * );
 *
 * @note
 * - Цвет маркера применяется инлайн через style attribute
 * - Компонент Delta отвечает за отображение числового значения со стрелкой
 * - Адаптация происходит на основе значения useIsMobile()
 * - Пороговое значение для мобильных определяется в хуке useIsMobile
 *
 * @warning
 * 1. Компонент зависит от корректной работы хука useIsMobile
 * 2. Цвет не валидируется - передавайте только валидные CSS-цвета
 * 3. Компонент Delta должен поддерживать пропсы text и up
 * 4. digitsText должен включать символы (%, $, и т.д.) если они нужны
 *
 * @accessibility
 * - Цветной маркер является декоративным элементом
 * - Рекомендуется использовать достаточный цветовой контраст
 * - Для дальтоников можно добавить паттерны или символы
 * - Рассмотреть добавление aria-label для всей легенды
 *
 * @layout
 * **Десктоп макет:**
 * ```
 * <div class="legendItem">
 *   <div class="oneRow">
 *     <span class="dot" style="background-color: color" />
 *     <span class="labelText">{label}</span>
 *   </div>
 *   <Delta text={digitsText} up={positive} />
 * </div>
 * ```
 *
 * **Мобильный макет:**
 * ```
 * <div class="legendItem">
 *   <span class="labelText">{label}</span>
 *   <div class="oneRow">
 *     <Delta text={digitsText} up={positive} />
 *     <span class="dot" style="background-color: color" />
 *   </div>
 * </div>
 * ```
 *
 * @dependencies
 * - useIsMobile - хук для определения типа устройства
 * - Delta - компонент для отображения числового значения с индикатором тренда
 *
 * @see useIsMobile - Хук для определения мобильного устройства
 * @see Delta - Компонент индикатора изменения
 * @see LegendItem.module.css - Стили компонента
 *
 * @todo
 * - Добавить пропс для кастомного размера маркера
 * - Реализовать hover-эффекты для лучшей интерактивности
 * - Добавить возможность клика по элементу легенды (для фильтрации данных)
 * - Поддержка различных форм маркеров (квадрат, ромб, треугольник)
 * - Добавить tooltip с подробной информацией
 * - Реализовать плавную анимацию при переключении между макетами
 * - Добавить валидацию цвета через CSS.supports()
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Создание информативной и понятной легенды для визуализаций
 * 2. Адаптация к различным размерам экранов
 * 3. Сохранение читаемости на всех устройствах
 * 4. Обеспечение консистентности стилей легенд в приложении
 * 5. Наглядное отображение трендов через компонент Delta
 */

export const LegendItem = ({
  label,
  color,
  digitsText,
  positive,
}: LegendProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className={styles.legendItem}>
        <span className={styles.labelText}>{label}</span>
        <div className={styles.oneRow}>
          <Delta text={digitsText} up={positive} />
          <span className={styles.dot} style={{ backgroundColor: color }} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.legendItem}>
      <div className={styles.oneRow}>
        <span className={styles.dot} style={{ backgroundColor: color }} />
        <span className={styles.labelText}>{label}</span>
      </div>
      <Delta text={digitsText} up={positive} />
    </div>
  );
};
