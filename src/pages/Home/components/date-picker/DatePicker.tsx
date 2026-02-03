import type { FC } from 'react';
import './DatePicker.css';
import reportSrc from '../../../../assets/report.svg';

/**
 * Тип пропсов для компонента DatePicker
 * @typedef {Object} DatePickerProps
 * @property {string} value - Текущее значение даты в формате YYYY-MM-DD
 * @property {(value: string) => void} onChange - Обработчик изменения даты
 * @property {string} [label] - Текстовая метка для поля ввода
 * @property {boolean} [required] - Флаг обязательности поля
 * @property {string} [error] - Текст сообщения об ошибке валидации
 */

type Props = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
};

/**
 * Компонент поля выбора даты с валидацией и отображением ошибок
 *
 * @component DatePicker
 * @description
 * Универсальный компонент для выбора даты, обертывающий нативный HTML5 input type="date".
 * Поддерживает метки, флаг обязательности и отображение ошибок валидации.
 * Визуально интегрирован с дизайн-системой через CSS-классы.
 *
 * **Ключевые особенности:**
 * - Использует нативный браузерный интерфейс выбора даты
 * - Отображает иконку ошибки при наличии сообщения об ошибке
 * - Поддерживает обязательные поля с индикацией (*)
 * - Полностью управляемый компонент (controlled)
 * - Интегрирован с CSS-модулем для стилизации
 *
 * @param {DatePickerProps} props - Свойства компонента
 * @returns {JSX.Element} Поле выбора даты с меткой и валидацией
 *
 * @example
 * // Базовое использование
 * const [date, setDate] = useState('2023-12-31');
 *
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   label="Дата отчета"
 * />
 *
 * @example
 * // С обязательным полем и валидацией
 * const [date, setDate] = useState('');
 * const [error, setError] = useState('');
 *
 * const handleDateChange = (value) => {
 *   setDate(value);
 *   if (!value) {
 *     setError('Пожалуйста, выберите дату');
 *   } else {
 *     setError('');
 *   }
 * };
 *
 * <DatePicker
 *   value={date}
 *   onChange={handleDateChange}
 *   label="Дата рождения"
 *   required={true}
 *   error={error}
 * />
 *
 * @example
 * // В составе формы
 * <form onSubmit={handleSubmit}>
 *   <DatePicker
 *     value={formData.startDate}
 *     onChange={(value) => setFormData({...formData, startDate: value})}
 *     label="Дата начала"
 *     required
 *   />
 *   <DatePicker
 *     value={formData.endDate}
 *     onChange={(value) => setFormData({...formData, endDate: value})}
 *     label="Дата окончания"
 *     required
 *   />
 *   <button type="submit">Сохранить</button>
 * </form>
 *
 * @note
 * - Использует нативный input[type="date"], поэтому внешний вид зависит от браузера
 * - Формат значения должен соответствовать YYYY-MM-DD (стандарт HTML5)
 * - Для кросс-браузерной консистентности могут потребоваться полифиллы
 * - Иконка ошибки использует SVG из статических ассетов
 * - Неразрывный пробел (\u00A0) используется для правильного отображения звездочки
 *
 * @warning
 * 1. Нативный input[type="date"] не поддерживается в IE и некоторых мобильных браузерах
 * 2. Формат даты YYYY-MM-DD может не соответствовать локальным настройкам пользователя
 * 3. Компонент не предоставляет кастомный календарь для браузеров без поддержки
 * 4. Не выполняется дополнительная валидация кроме нативной браузерной
 * 5. Сообщения об ошибках должны управляться родительским компонентом
 *
 * @accessibility
 * - Используется семантический тег <label> связанный с полем ввода
 * - Иконка ошибки имеет alt-текст "Лого ошибки"
 * - При наличии ошибки добавляется CSS-класс для визуального выделения
 * - Рекомендуется добавить aria-invalid и aria-describedby для ошибок
 * - Поддерживает навигацию с клавиатуры (стандартное поведение input)
 *
 * @layout
 * Структура компонента:
 * ```
 * <div class="date-picker">
 *   <div class="date-label">
 *     <label>{label}</label>
 *     {'\u00A0'}
 *     {required && <span class="date-required">*</span>}
 *   </div>
 *   <div class="date-input">
 *     <input
 *       type="date"
 *       value={value}
 *       onChange={handleDateChange}
 *       class="input [input-error]"
 *     />
 *   </div>
 *   {error && (
 *     <div class="date-error">
 *       <img src={reportSrc} alt="Лого ошибки" />
 *       {error}
 *     </div>
 *   )}
 * </div>
 * ```
 *
 * @css_structure
 * Предполагаемые CSS-классы (из DatePicker.css):
 * - .date-picker - Основной контейнер
 * - .date-label - Контейнер метки
 * - .date-required - Стили для звездочки обязательного поля
 * - .date-input - Контейнер поля ввода
 * - .input - Базовые стили поля ввода
 * - .input-error - Модификатор для поля с ошибкой
 * - .date-error - Контейнер сообщения об ошибке
 *
 * @see DatePicker.css - Стили компонента
 * @see report.svg - Иконка для отображения ошибок
 *
 * @todo
 * - Добавить поддержку кастомного календаря для браузеров без поддержки
 * - Реализовать локализацию формата даты и календаря
 * - Добавить пропсы для минимальной и максимальной даты (min/max)
 * - Реализовать маску ввода для лучшего UX
 * - Добавить поддержку disabled состояния
 * - Реализовать валидацию на стороне клиента
 * - Добавить подсказку (placeholder) в поле ввода
 * - Поддержка темной/светлой темы
 * - Добавить анимацию появления ошибки
 * - Реализовать очистку поля (крестик)
 * - Добавить кастомные иконки календаря и ошибки
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Предоставляет единообразный интерфейс выбора даты во всем приложении
 * 2. Интегрирует нативный браузерный компонент с дизайн-системой
 * 3. Обеспечивает доступность и удобство использования
 * 4. Предоставляет механизм валидации и отображения ошибок
 * 5. Поддерживает обязательные поля со стандартной индикацией
 * 6. Сохраняет консистентность с другими полями формы в приложении
 *
 * @browser_support
 * Поддержка input[type="date"]:
 * - Chrome: полная поддержка
 * - Firefox: полная поддержка
 * - Safari: полная поддержка
 * - Edge: полная поддержка
 * - IE: не поддерживается
 * Для IE и старых браузеров нужен полифилл или fallback.
 */

export const DatePicker: FC<Props> = ({
  value,
  onChange,
  label,
  required,
  error,
}: Props) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="date-picker">
      <div className="date-label">
        {label && <label>{label}</label>}
        {'\u00A0'}
        {required && <span className="date-required">*</span>}
      </div>
      <div className="date-input">
        <input
          className={`input ${error ? 'input-error' : ''}`}
          type="date"
          value={value}
          onChange={handleDateChange}
        />
      </div>
      {error && (
        <div className="date-error">
          <img src={reportSrc} alt="Лого ошибки" />
          {error}
        </div>
      )}
    </div>
  );
};
