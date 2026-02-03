// src\pages\Result\components\button\Button.tsx

import React, { type ReactNode } from 'react';
import styles from './Button.module.css';

/**
 * Тип пропсов для компонента Button
 * @typedef {Object} TButton
 * @property {string} [className] - Дополнительные CSS-классы
 * @property {string} label - Текст кнопки
 * @property {Function} onClick - Обработчик клика по кнопке
 * @property {'button' | 'submit' | 'reset'} [type='button'] - HTML-тип кнопки
 * @property {boolean} [secondary=false] - Вторичный стиль кнопки
 * @property {boolean} [tertiary=false] - Третичный стиль кнопки
 * @property {boolean} [disabled=false] - Состояние отключения кнопки
 * @property {ReactNode} [icon] - Иконка для отображения перед текстом
 */

type TButton = {
  className?: string;
  label: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  secondary?: boolean;
  tertiary?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
};

/**
 * Универсальный компонент кнопки с поддержкой различных стилей и состояний
 *
 * @component Button
 * @description
 * Гибкий и многоразовый компонент кнопки, который поддерживает:
 * - Три визуальных стиля (primary, secondary, tertiary)
 * - Состояние disabled
 * - Иконки рядом с текстом
 * - Все стандартные HTML-типы кнопок
 *
 * Компонент использует CSS-модули для стилизации и полностью типизирован.
 *
 * @param {TButton} props - Свойства компонента
 * @returns {JSX.Element} Элемент кнопки
 *
 * @example
 * // Базовая кнопка
 * <Button
 *   label="Сохранить"
 *   onClick={() => console.log('Клик!')}
 * />
 *
 * @example
 * // Вторичная кнопка с иконкой
 * <Button
 *   label="Отмена"
 *   secondary
 *   onClick={handleCancel}
 *   icon={<CancelIcon />}
 * />
 *
 * @example
 * // Отправка формы
 * <Button
 *   type="submit"
 *   label="Отправить"
 *   onClick={handleSubmit}
 * />
 *
 * @example
 * // Отключенная третичная кнопка
 * <Button
 *   label="Недоступно"
 *   tertiary
 *   disabled
 *   onClick={() => {}} // Не будет вызвано из-за disabled
 * />
 *
 * @example
 * // Кнопка с пользовательским классом
 * <Button
 *   label="Особенная"
 *   onClick={handleSpecial}
 *   className="special-button"
 * />
 *
 * @note
 * Приоритет стилей: tertiary > secondary > primary
 * Если одновременно установлены secondary и tertiary, применится tertiary
 *
 * @warning
 * При использовании type="submit" в формах, обработчик onClick
 * будет вызван ДО стандартного поведения отправки формы.
 * Используйте event.preventDefault() если нужно предотвратить отправку.
 *
 * @see Button.module.css - Стили компонента
 *
 * @todo
 * - Добавить поддержку tooltip
 * - Добавить свойство loading для отображения индикатора загрузки
 * - Добавить свойство size для управления размером
 * - Добавить свойство fullWidth для растягивания на всю ширину
 *
 * @design
 * Компонент соответствует дизайн-системе и гарантирует:
 * - Консистентность стилей
 * - Доступность (ARIA-атрибуты)
 * - Правильные hover/focus состояния
 */

export const Button: React.FC<TButton> = ({
  className,
  label,
  onClick,
  type = 'button',
  secondary = false,
  tertiary = false,
  disabled = false,
  icon,
}: TButton) => (
  <button
    type={type}
    disabled={disabled}
    className={`${styles.button} ${className ?? ''} ${secondary ? styles.secondary : ''} ${tertiary ? styles.tertiary : ''}`}
    onClick={onClick}
  >
    {icon}
    {label}
  </button>
);
