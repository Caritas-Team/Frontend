import styles from './InstructionPopup.module.css';
import { ModalUI } from '../Modal';
import type { FC } from 'react';

/**
 * Тип пропсов для компонента InstructionPopup
 * @typedef {Object} InstructionPopupProps
 * @property {boolean} isOpen - Флаг открытого состояния попапа с инструкцией
 * @property {() => void} doClose - Функция закрытия попапа
 */

interface InstructionPopupProps {
  isOpen: boolean;
  doClose: () => void;
}

/**
 * Попап с инструкцией по использованию функционала загрузки и расчета
 *
 * @component InstructionPopup
 * @description
 * Компонент отображает модальное окно с инструкцией по работе с системой расчета диагностики.
 * Содержит пошаговые указания по загрузке файлов, расчету групп и сохранению результатов.
 * Использует базовый компонент ModalUI для отображения в виде модального окна.
 *
 * **Содержание инструкции:**
 * 1. Требования к файлам для расчета (формат JSON, предыдущая и текущая диагностики)
 * 2. Инструкция по расчету групп (ограничение до 10 человек)
 * 3. Инструкция по сохранению результатов расчета
 *
 * @param {InstructionPopupProps} props - Свойства компонента
 * @returns {JSX.Element} Модальное окно с инструкцией
 *
 * @example
 * // Базовое использование
 * const [isInstructionOpen, setIsInstructionOpen] = useState(false);
 *
 * return (
 *   <>
 *     <button onClick={() => setIsInstructionOpen(true)}>
 *       Показать инструкцию
 *     </button>
 *
 *     <InstructionPopup
 *       isOpen={isInstructionOpen}
 *       doClose={() => setIsInstructionOpen(false)}
 *     />
 *   </>
 * );
 *
 * @example
 * // Использование с иконкой помощи
 * const HelpButton = () => {
 *   const [showHelp, setShowHelp] = useState(false);
 *
 *   return (
 *     <>
 *       <button
 *         className="help-button"
 *         onClick={() => setShowHelp(true)}
 *         aria-label="Показать инструкцию"
 *       >
 *         ?
 *       </button>
 *
 *       <InstructionPopup
 *         isOpen={showHelp}
 *         doClose={() => setShowHelp(false)}
 *       />
 *     </>
 *   );
 * };
 *
 * @example
 * // Автоматическое открытие при первом посещении
 * const UploadPage = () => {
 *   const [isFirstVisit, setIsFirstVisit] = useState(true);
 *   const [showInstruction, setShowInstruction] = useState(false);
 *
 *   useEffect(() => {
 *     if (isFirstVisit) {
 *       setShowInstruction(true);
 *       setIsFirstVisit(false);
 *     }
 *   }, []);
 *
 *   return (
 *     <div>
 *       <h1>Загрузка диагностики</h1>
 *       <InstructionPopup
 *         isOpen={showInstruction}
 *         doClose={() => setShowInstruction(false)}
 *       />
 *     </div>
 *   );
 * };
 *
 * @note
 * - Компонент является оберткой над ModalUI с предопределенным содержимым
 * - Содержание инструкции захардкожено в компоненте и не настраивается через пропсы
 * - Используется семантическая разметка: h2 для заголовка, ul/li для списка
 * - Стили определяются через CSS-модуль InstructionPopup.module.css
 * - Все тексты инструкции на русском языке без поддержки локализации
 *
 * @accessibility
 * - Заголовок использует h2 для правильной иерархии заголовков
 * - Список инструкций использует семантический ul/li
 * - Модальное окно наследует accessibility-функции от ModalUI
 * - Рекомендуется добавить aria-label для кнопки закрытия в ModalUI
 * - Для скринридеров можно добавить role="document" для содержимого
 *
 * @layout
 * Структура компонента:
 * ```
 * <ModalUI isOpen={isOpen} doClose={doClose}>
 *   <div class="popup">
 *     <h2 class="popup__title">Инструкция по заполнению</h2>
 *     <ul class="popup__content">
 *       <li class="popup__text">Пункт инструкции 1</li>
 *       <li class="popup__text">Пункт инструкции 2</li>
 *       <li class="popup__text">Пункт инструкции 3</li>
 *     </ul>
 *   </div>
 * </ModalUI>
 * ```
 *
 * @dependencies
 * - ModalUI - Базовый компонент модального окна
 *
 * @see ModalUI - Базовый компонент модального окна
 * @see InstructionPopup.module.css - Стили компонента
 *
 * @design
 * Компонент решает следующие задачи:
 * 1. Предоставляет пользователю четкую инструкцию по использованию функционала
 * 2. Уменьшает количество ошибок при загрузке файлов
 * 3. Объясняет ограничения системы (10 человек в группе)
 * 4. Напоминает о возможности сохранения результатов
 * 5. Создает профессиональное впечатление от системы
 * 6. Уменьшает нагрузку на поддержку за счет самообслуживания
 *
 * @content_strategy
 * Текст инструкции следует принципам:
 * 1. Краткость - только необходимая информация
 * 2. Последовательность - шаги в логическом порядке
 * 3. Ясность - простой и понятный язык
 * 4. Актуальность - соответствует текущему функционалу
 * 5. Действенность - каждое утверждение ведет к действию
 *
 * @ux_considerations
 * 1. Инструкция должна появляться в контексте (рядом с элементами, которые она описывает)
 * 2. Не следует показывать инструкцию слишком часто (риск игнорирования)
 * 3. Важные изменения в инструкции должны быть выделены
 * 4. Для опытных пользователей должна быть возможность скрыть инструкцию
 * 5. Инструкция должна быть легко доступна в любое время
 */

export const InstructionPopup: FC<InstructionPopupProps> = ({
  isOpen,
  doClose,
}) => {
  return (
    <ModalUI isOpen={isOpen} doClose={doClose}>
      <div className={styles.popup}>
        <h2 className={styles.popup__title}>Инструкция по заполнению</h2>
        <ul className={styles.popup__content}>
          <li className={styles.popup__text}>
            Для расчёта требуется файл с предыдущей диагностикой и с текущим
            результатом в формате json
          </li>
          <li className={styles.popup__text}>
            Для расчёта группы нажмите «Добавить к расчёту» и появится
            дополнительное поле для загрузки файлов. Но не более 10 человек в
            группе
          </li>
          <li className={styles.popup__text}>
            После получения расчёта, для сохранения на своё устройство, нажмите
            «Сохранить»
          </li>
        </ul>
      </div>
    </ModalUI>
  );
};
