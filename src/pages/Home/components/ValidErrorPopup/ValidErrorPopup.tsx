/*
Использование компонента:

// Одиночная ошибка (строка)
const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

const errorMessage = "Неверный формат файла";
// или
const errorMessage = [
  "Неверный формат файла",
  "Отсутствуют обязательные поля",
  "Неверная дата отчета"
];

const openErrorPopup = () => setIsErrorPopupOpen(true);
const closeErrorPopup = () => setIsErrorPopupOpen(false);

// ...

return (
  <div>
    <button onClick={openErrorPopup}>
      Показать ошибки
    </button>
    <ValidErrorPopup 
      isOpen={isErrorPopupOpen}
      doClose={closeErrorPopup}
      errors={errorMessage}
    />
  </div>
);

*/

import styles from './ValidErrorPopup.module.css';
import { ModalUI } from '../Modal';
import type { FC } from 'react';
import report from './icons/report.svg';

interface ValidErrorPopupProps {
  isOpen: boolean;
  doClose: () => void;
  errors: string | string[];
}

export const ValidErrorPopup: FC<ValidErrorPopupProps> = ({
  isOpen,
  doClose,
  errors,
}) => {
  const errorsArray = Array.isArray(errors) ? errors : [errors];

  return (
    <ModalUI isOpen={isOpen} doClose={doClose}>
      <div className={styles.popup}>
        <img
          className={styles.popup__img}
          src={report}
          alt="Иконка ошибки валидации"
        />
        <h2 className={styles.popup__title}>Ошибка валидации отчетов!</h2>
        <ul className={styles.popup__content}>
          {errorsArray.map((error, index) => (
            <li className={styles.popup__text} key={index}>
              {error}
            </li>
          ))}
        </ul>
        <p className={styles.popup__text}>
          Пожалуйста, поправьте и перезагрузите файлы
        </p>
      </div>
    </ModalUI>
  );
};
