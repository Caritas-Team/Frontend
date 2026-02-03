import styles from './Modal.module.css';
import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import closeIcon from './icon/close.svg';

/**
 * Тип пропсов для компонента ModalUI
 * @typedef {Object} ModalUIProps
 * @property {boolean} isOpen - Флаг открытого состояния модального окна
 * @property {() => void} doClose - Функция закрытия модального окна
 * @property {ReactNode} [children] - Содержимое модального окна
 */

interface ModalUIProps {
  isOpen: boolean;
  doClose: () => void;
  children?: ReactNode;
}

/**
 * Универсальное модальное окно с управлением через клавиатуру и клики
 *
 * @component ModalUI
 * @description
 * Компонент модального окна, который предоставляет стандартный интерфейс
 * для отображения контента поверх основного содержимого страницы.
 * Реализует паттерн "portal-like" поведение без использования React Portal.
 *
 * **Ключевые особенности:**
 * - Управление открытием/закрытием через проп `isOpen`
 * - Закрытие по клику на оверлей, кнопку закрытия или клавишу Escape
 * - Блокировка скролла страницы при открытом модальном окне
 * - Защита от закрытия при клике внутри контента модалки
 * - Адаптивная структура для различного содержимого
 *
 * @param {ModalUIProps} props - Свойства компонента
 * @returns {JSX.Element | null} Модальное окно или null если закрыто
 *
 * @example
 * // Базовое использование
 * const [isModalOpen, setIsModalOpen] = useState(false);
 *
 * return (
 *   <>
 *     <button onClick={() => setIsModalOpen(true)}>
 *       Открыть модалку
 *     </button>
 *
 *     <ModalUI
 *       isOpen={isModalOpen}
 *       doClose={() => setIsModalOpen(false)}
 *     >
 *       <h2>Заголовок модалки</h2>
 *       <p>Содержимое модального окна</p>
 *     </ModalUI>
 *   </>
 * );
 *
 * @example
 * // С формой внутри модалки
 * <ModalUI
 *   isOpen={isLoginModalOpen}
 *   doClose={() => setLoginModalOpen(false)}
 * >
 *   <form onSubmit={handleLogin}>
 *     <input type="email" placeholder="Email" />
 *     <input type="password" placeholder="Пароль" />
 *     <button type="submit">Войти</button>
 *   </form>
 * </ModalUI>
 *
 * @example
 * // С кастомными обработчиками закрытия
 * const handleClose = () => {
 *   if (window.confirm('Вы уверены, что хотите закрыть?')) {
 *     setIsModalOpen(false);
 *   }
 * };
 *
 * <ModalUI
 *   isOpen={isModalOpen}
 *   doClose={handleClose}
 * >
 *   Несохраненные данные будут потеряны
 * </ModalUI>
 *
 * @note
 * - Компонент не использует React Portal, поэтому рендерится в DOM-дереве родителя
 * - При открытии блокируется скролл страницы через `document.body.style.overflow`
 * - Событие закрытия всплывает только при клике на оверлей или кнопку закрытия
 * - Кнопка закрытия использует SVG-иконку из локальных ассетов
 * - Модальное окно имеет фиксированное позиционирование и занимает весь экран
 *
 * @warning
 * 1. Компонент не использует React Portal, что может вызвать проблемы с z-index
 * 2. Блокировка скролла через `document.body.style.overflow` может конфликтовать с другими модалками
 * 3. При нескольких модалках одновременно нужно управлять состоянием body overflow
 * 4. Отсутствует анимация открытия/закрытия
 * 5. Не поддерживает автоматический фокус на первом интерактивном элементе
 * 6. Не восстанавливает фокус на предыдущем элементе при закрытии
 *
 * @accessibility
 * - Кнопка закрытия имеет alt-текст "close" (можно улучшить для локализации)
 * - Поддерживается закрытие по клавише Escape
 * - Модальное окно должно быть объявлено как диалоговое окно для скринридеров
 * - Рекомендуется управлять фокусом внутри модального окна
 * - Нужно добавить aria-* атрибуты для семантики диалога
 *
 * @keyboard_navigation
 * - Escape: закрывает модальное окно
 * - Tab: перемещает фокус внутри модального окна (должен быть ограничен)
 * - Shift+Tab: перемещает фокус в обратном порядке внутри модалки
 *
 * @layout
 * Структура компонента:
 * ```
 * <div class="overlay" onClick={doClose}>           // Фон-оверлей
 *   <div class="modal" onClick={e => e.stopPropagation()}>  // Контейнер модалки
 *     <div class="content">{children}</div>        // Контентная область
 *     <button class="closeButton" onClick={doClose}>  // Кнопка закрытия
 *       <img src={closeIcon} alt="close" />
 *     </button>
 *   </div>
 * </div>
 * ```
 *
 * @css_structure
 * Предполагаемые CSS-классы (из Modal.module.css):
 * - .overlay - Фон-оверлей (фиксированное позиционирование, полупрозрачный)
 * - .modal - Основной контейнер модального окна
 * - .content - Область для контента
 * - .closeButton - Кнопка закрытия (обычно в правом верхнем углу)
 *
 * @effects
 * Эффект компонента выполняет:
 * 1. Добавление/удаление обработчика клавиши Escape
 * 2. Блокировку/разблокировку скролла страницы
 * 3. Очистку при размонтировании компонента
 *
 * @see Modal.module.css - Стили компонента
 * @see close.svg - Иконка закрытия модального окна
 *
 * @todo
 * - Реализовать использование React Portal для правильного позиционирования в DOM
 * - Добавить анимации открытия/закрытия (fade, slide, scale)
 * - Реализовать управление фокусом (автофокус на первом элементе, trap focus)
 * - Добавить пропсы для кастомных иконок закрытия
 * - Реализовать возможность закрытия только по кнопке (disableOverlayClick)
 * - Добавить поддержку различных размеров модалки (small, medium, large, fullscreen)
 * - Реализовать заголовок модального окна как отдельный пропс
 * - Добавить возможность кастомизации z-index
 * - Поддержка вертикального центрирования или других позиций
 * - Реализовать восстановление фокуса на элементе, открывшем модалку
 * - Добавить aria-* атрибуты для доступности
 * - Реализовать блокировку body scroll более надежным способом
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Предоставляет стандартный интерфейс для модальных окон в приложении
 * 2. Обеспечивает доступность и удобство использования
 * 3. Управляет состоянием страницы при открытии модального окна
 * 4. Предоставляет интуитивные способы закрытия (клик, Escape, кнопка)
 * 5. Защищает от случайного закрытия при взаимодействии с контентом
 * 6. Создает визуальное разделение между модалкой и основным контентом
 *
 * @ux_considerations
 * 1. Модальные окна должны использоваться для важных действий
 * 2. Следует избегать модалок внутри модалок
 * 3. Контент должен быть кратким и релевантным
 * 4. На мобильных устройствах модалка должна занимать весь экран
 * 5. Должна быть четкая визуальная иерархия между модалкой и фоном
 */

export const ModalUI: FC<ModalUIProps> = ({ isOpen, doClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') doClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, doClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={doClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.content}>{children}</div>
        <button className={styles.closeButton} onClick={doClose}>
          <img src={closeIcon} alt="close" />
        </button>
      </div>
    </div>
  );
};
