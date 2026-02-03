// src\pages\Result\components\gauge\Gauge.tsx

import React from 'react';
import styles from './Gauge.module.css';

/**
 * Тип пропсов для компонента Gauge
 * @typedef {Object} GaugeProps
 * @property {string} date - Дата для отображения в центре датчика
 * @property {number} formed - Процент заполнения фиолетовой дуги (0-100)
 * @property {number} initiative - Процент заполнения зеленой дуги (0-100)
 * @property {number} frequency - Процент заполнения синей дуги (0-100)
 */

type GaugeProps = {
  date: string;
  formed: number; // фиолетовая дуга %
  initiative: number; // зелёная дуга %
  frequency: number; // синяя дуга %
};

const SIZE = 230;
const CENTER = SIZE / 2;

// толщина дуг
const T1 = 10;

// радиусы из макета
const R1 = (230 - T1) / 2; // фиолетовая
const R2 = (204 - T1) / 2; // зелёная
const R3 = (178 - T1) / 2; // синяя

// цвета
const C1 = '#8550F6';
const C2 = '#67F4B1';
const C3 = '#5B93F4';

// фон дуг
const BG = '#F3EFFF';

/**
 * Преобразует полярные координаты в декартовы для SVG
 *
 * @function polarToCartesian
 * @private
 * @param {number} radius - Радиус от центра
 * @param {number} angleDeg - Угол в градусах
 * @returns {{x: number, y: number}} Координаты x, y
 */

// функция вычисления координат конца дуги
function polarToCartesian(radius: number, angleDeg: number) {
  const angle = angleDeg * (Math.PI / 180);
  const x = CENTER + radius * Math.cos(angle);
  const y = CENTER + radius * Math.sin(angle);
  return { x, y };
}

const START_ANGLE = 135;
const END_ANGLE = 405;
const TOTAL_ANGLE = END_ANGLE - START_ANGLE;

/**
 * Генерирует SVG path для дуги на основе процента заполнения
 *
 * @function createArcPath
 * @private
 * @param {number} radius - Радиус дуги
 * @param {number} percent - Процент заполнения (0-100)
 * @returns {string} Команда path для SVG
 */

// генерация SVG path для дуги
function createArcPath(radius: number, percent: number) {
  const delta = (TOTAL_ANGLE * percent) / 100;
  const angle = START_ANGLE + delta;
  const start = polarToCartesian(radius, START_ANGLE);
  const end = polarToCartesian(radius, angle);
  if (delta > 180)
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 1 1 ${end.x} ${end.y}`;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
}

/**
 * SVG-датичик с тремя концентрическими дугами для визуализации метрик
 *
 * @component Gauge
 * @description
 * Круговой датчик с тремя концентрическими дугами, каждая из которых представляет
 * определенную метрику. Дуги отображаются на фоне полупрозрачных кругов и
 * показывают процент заполнения от 0% до 100%. В центре отображается дата.
 *
 * **Визуальная структура:**
 * - Внешняя дуга (фиолетовая): параметр `formed`
 * - Средняя дуга (зеленая): параметр `initiative`
 * - Внутренняя дуга (синяя): параметр `frequency`
 * - Фоновые дуги: светло-фиолетовый цвет для обозначения 100%
 * - Текст в центре: дата
 * - Текст по краям: 0% и 100% для шкалы
 *
 * @param {GaugeProps} props - Свойства компонента
 * @returns {JSX.Element} SVG-датичик с тремя концентрическими дугами
 *
 * @example
 * // Датичик с разными значениями метрик
 * <Gauge
 *   date="2023-12"
 *   formed={75}    // Фиолетовая дуга заполнена на 75%
 *   initiative={50} // Зеленая дуга заполнена на 50%
 *   frequency={25}  // Синяя дуга заполнена на 25%
 * />
 *
 * @example
 * // Пустой датичик
 * <Gauge
 *   date="2024-01"
 *   formed={0}
 *   initiative={0}
 *   frequency={0}
 * />
 *
 * @example
 * // Полностью заполненный датичик
 * <Gauge
 *   date="2023-11"
 *   formed={100}
 *   initiative={100}
 *   frequency={100}
 * />
 *
 * @note
 * - Все значения процентов должны быть в диапазоне 0-100
 * - Дуги рисуются по часовой стрелке от угла 135° до 405°
 * - Фактически отображается 270° окружности (3/4 круга)
 * - Размер SVG фиксирован: 230x230 пикселей
 * - Толщина всех дуг одинакова: 10 пикселей
 *
 * @warning
 * 1. Значения более 100 или менее 0 могут привести к некорректному отображению
 * 2. Компонент не адаптивен - использует фиксированные размеры
 * 3. Не поддерживает анимацию заполнения (статичный)
 * 4. Цвета захардкожены и не настраиваются через пропсы
 * 5. Для корректного отображения требуется поддержка SVG в браузере
 *
 * @accessibility
 * - Компонент является декоративным и не содержит семантической информации
 * - Рекомендуется добавить скрытый текст для скринридеров
 * - Можно добавить aria-label с описанием значений
 * - Для дальтоников может потребоваться дополнительные паттерны
 *
 * @svg_geometry
 * ```
 * Координатная система: левый верхний угол (0,0), правый нижний (230,230)
 * Центр: (115,115)
 * Углы: 0° - вправо, 90° - вниз, 180° - влево, 270° - вверх
 * Видимая дуга: от 135° (левый нижний) до 405° (правый нижний через полный круг)
 * ```
 *
 * @colors
 * - Фиолетовая дуга (formed): #8550F6
 * - Зеленая дуга (initiative): #67F4B1
 * - Синяя дуга (frequency): #5B93F4
 * - Фон дуг: #F3EFFF
 *
 * @radii_calculation
 * ```
 * R1 = (230 - 10) / 2 = 110px  // Внешняя дуга
 * R2 = (204 - 10) / 2 = 97px   // Средняя дуга
 * R3 = (178 - 10) / 2 = 84px   // Внутренняя дуга
 * ```
 *
 * @see Gauge.module.css - Стили для текстовых элементов
 *
 * @todo
 * - Добавить анимацию плавного заполнения дуг
 * - Реализовать адаптивность к разным размерам контейнера
 * - Добавить пропсы для настройки цветов
 * - Реализовать hover-эффекты с подсказками значений
 * - Добавить валидацию входных значений (0-100)
 * - Поддержка градиентов для дуг
 * - Добавить интерактивность (клик по дуге)
 * - Реализовать кастомные метки на шкале
 * - Добавить отображение текущих значений в процентах
 *
 * @design
 * Компонент предназначен для:
 * 1. Визуального сравнения трех связанных метрик
 * 2. Быстрого восприятия прогресса по каждому показателю
 * 3. Создания современного и привлекательного интерфейса
 * 4. Отображения временных данных (дата в центре)
 * 5. Экономии пространства при отображении нескольких показателей
 */

export const Gauge: React.FC<GaugeProps> = ({
  date,
  formed,
  initiative,
  frequency,
}) => {
  return (
    <div className={styles.wrapper}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* ===== ФОНОВЫЕ ДУГИ ===== */}
        <path
          d={createArcPath(R1, 100)}
          stroke={BG}
          strokeWidth={T1}
          fill="none"
          strokeLinecap="round"
        />

        <path
          d={createArcPath(R2, 100)}
          stroke={BG}
          strokeWidth={T1}
          fill="none"
          strokeLinecap="round"
        />

        <path
          d={createArcPath(R3, 100)}
          stroke={BG}
          strokeWidth={T1}
          fill="none"
          strokeLinecap="round"
        />

        {/* ===== АКТИВНЫЕ ДУГИ ===== */}
        <path
          d={createArcPath(R1, formed)}
          stroke={C1}
          strokeWidth={T1}
          fill="none"
          strokeLinecap="round"
        />

        <path
          d={createArcPath(R2, initiative)}
          stroke={C2}
          strokeWidth={T1}
          fill="none"
          strokeLinecap="round"
        />

        <path
          d={createArcPath(R3, frequency)}
          stroke={C3}
          strokeWidth={T1}
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className={styles.date}>{date}</div>
      <div className={styles.zero}>0%</div>
      <div className={styles.hundred}>100%</div>
    </div>
  );
};
