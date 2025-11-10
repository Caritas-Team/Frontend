// src\pages\Home\components\InstructionPopup\InstructionPopup.tsx
/*
Использование компонента:
const [isInstructionPopupOpen, setIsInstructionPopupOpen] = useState(false);

const openInstructionPopup = () => setIsInstructionPopupOpen(true);
const closeInstructionPopup = () => setIsInstructionPopupOpen(false);

// ...

return (
  <div>
    <button onClick={openInstructionPopup}>
      Показать инструкцию
    </button>
    
    <InstructionPopup 
      isOpen={isInstructionPopupOpen}
      doClose={closeInstructionPopup}
    />
  </div>
);

*/

import styles from './InstructionPopup.module.css';
import { ModalUI } from '../Modal';
import type { FC } from 'react';

interface InstructionPopupProps {
  isOpen: boolean;
  doClose: () => void;
}

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
            результатом в формате pdf
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
