import styles from './loader.module.css';

/**
 * Полноэкранный компонент индикатора загрузки с сеткой анимированных кубов
 *
 * @component Loader
 * @description
 * Индикатор загрузки, который занимает весь экран и отображает анимацию из девяти пульсирующих кубов,
 * расположенных в сетке 3x3, с текстовым сообщением "Формируется отчёт" и анимированными точками.
 * Используется для отображения состояний длительной обработки, таких как формирование отчетов.
 *
 * **Визуальная структура:**
 * - Полноэкранный контейнер с абсолютным позиционированием (фиксирует весь экран)
 * - Сетка 3x3 из пульсирующих кубов с индивидуальными задержками анимации
 * - Текстовое сообщение с CSS-анимацией многоточия
 * - Адаптивные стили для мобильных устройств
 *
 * **Анимационные эффекты:**
 * - Пульсация кубов: изменение масштаба и прозрачности с изменением цвета
 * - Каскадная анимация: каждый куб имеет уникальную задержку для волнообразного эффекта
 * - Анимированное многоточие: точки появляются последовательно
 *
 * **CSS-переменные:**
 * - `--font-h1` / `--font-h1-mobile`: шрифт для текста
 * - `--text-for-light-button`: цвет текста
 *
 * @returns {JSX.Element} Полноэкранный индикатор загрузки
 *
 * @example
 * // Базовое использование
 * const ReportPage = () => {
 *   const [isGenerating, setIsGenerating] = useState(true);
 *
 *   useEffect(() => {
 *     generateReport().then(() => setIsGenerating(false));
 *   }, []);
 *
 *   return (
 *     <>
 *       {isGenerating && <Loader />}
 *       <ReportContent />
 *     </>
 *   );
 * };
 *
 * @example
 * // Использование с перекрытием контента
 * const LoadingOverlay = ({ isLoading, children }) => {
 *   return (
 *     <div style={{ position: 'relative' }}>
 *       {children}
 *       {isLoading && (
 *         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
 *           <Loader />
 *         </div>
 *       )}
 *     </div>
 *   );
 * };
 *
 * @example
 * // В компоненте отправки формы
 * const FormWithLoader = () => {
 *   const [isSubmitting, setIsSubmitting] = useState(false);
 *
 *   const handleSubmit = async () => {
 *     setIsSubmitting(true);
 *     try {
 *       await submitForm();
 *     } finally {
 *       setIsSubmitting(false);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       {isSubmitting && <Loader />}
 *       <form onSubmit={handleSubmit}>
 *         {/* поля формы * /}
 *       </form>
 *     </div>
 *   );
 * };
 *
 * @note
 * - Компонент использует абсолютное позиционирование и занимает весь экран (100vw x 100vh)
 * - Имеет высокий z-index (9999) для отображения поверх других элементов
 * - Фон прозрачный (background-color: transparent)
 * - Анимации реализованы через CSS keyframes
 * - Сетка кубов использует CSS Grid с gap для промежутков
 * - Текст использует CSS-переменные для шрифта и цвета
 *
 * @accessibility
 * - Компонент является визуальным индикатором и должен сопровождаться текстовым описанием
 * - Рекомендуется добавить aria-live для объявления изменения состояния
 * - Для скринридеров можно добавить скрытый текст с описанием процесса
 * - Рассмотреть добавление role="status" или role="alert"
 * - Анимации могут вызывать проблемы у пользователей с вестибулярными нарушениями
 *
 * @animation_details
 * **Пульсация кубов (keyframes pulse):**
 * - 0%, 100%: полная непрозрачность, нормальный масштаб, синий цвет (#3498db)
 * - 50%: 50% непрозрачности, масштаб 0.8, зеленый цвет (#2ecc71)
 * - Длительность: 1.4s с ease-in-out timing function
 *
 * **Анимация точек (keyframes dotsSequence):**
 * - Многоточие появляется и исчезает в три этапа
 * - Использует steps(3, end) для дискретной анимации
 * - Длительность: 1.5s, бесконечное повторение
 *
 * **Задержки анимации кубов:**
 * - Создают волнообразный эффект от верхнего левого угла к нижнему правому
 * - Задержки: 0s, 0.2s, 0.4s, 0.2s, 0.4s, 0.6s, 0.4s, 0.6s, 0.8s
 *
 * @css_structure
 * - .container: полноэкранный flex-контейнер
 * - .text: текстовое сообщение с использованием CSS-переменных
 * - .dots::after: псевдоэлемент для анимированных точек
 * - .loader: grid-контейнер 3x3 для кубов
 * - .cube: стили и анимация отдельного куба
 * - @media screen and (max-width: 833px): адаптивные стили для мобильных
 *
 * @see loader.module.css - Стили компонента с анимациями
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Визуальная индикация длительных операций (формирование отчетов)
 * 2. Удержание внимания пользователя во время ожидания
 * 3. Предотвращение повторных действий (блокировка интерфейса)
 * 4. Предоставление обратной связи о состоянии системы
 * 5. Создание профессионального впечатления от приложения
 * 6. Улучшение восприятия времени ожидания через анимацию
 **/

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
      </div>
      <span className={styles.text}>
        Формируется отчёт<span className={styles.dots}></span>
      </span>
    </div>
  );
};

export default Loader;
