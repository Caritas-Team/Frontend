import { useState, useId } from 'react';
import reportError from '../../../../../assets/report_error.svg';
import styles from '../MainBlockForm.module.css';

const NAME_REGEX = /^[А-ЯЁа-яё\s-']+$/;
const MAX_NAME_LENGTH = 100;

type InputFullNameProps = {
  initialName?: string;
  onValidityChange: (isValid: boolean, name?: string) => void;
};

export const InputFullName = ({
  initialName = '',
  onValidityChange,
}: InputFullNameProps) => {
  const uniqueId = useId();
  const [nameError, setNameError] = useState<string>('');
  const [fullName, setFullName] = useState<string>(initialName);

  // Функция для очистки пробелов
  const cleanSpaces = (text: string): string => {
    return text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
      .join(' ');
  };

  const validateFullName = (value: string): string | undefined => {
    const cleanedValue = cleanSpaces(value);
    if (!cleanedValue) {
      onValidityChange(false);
      return 'Фамилия и имя обязательны для заполнения';
    }

    if (value.length > MAX_NAME_LENGTH) {
      onValidityChange(false);
      return `Превышена максимальная длина ${MAX_NAME_LENGTH} символов`;
    }

    if (!NAME_REGEX.test(cleanedValue)) {
      onValidityChange(false);
      return 'Можно использовать только кириллицу, пробелы, дефисы и апострофы';
    }

    const words = cleanedValue.split(' ').filter(word => word.length > 0);
    if (words.length < 2) {
      onValidityChange(false);
      return 'Введите и фамилию, и имя';
    }

    const validWords = words.filter(word => word.length >= 2);
    if (validWords.length < 2) {
      onValidityChange(false);
      return 'Введите и фамилию, и имя';
    }

    onValidityChange(true, cleanedValue);
    return undefined;
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);

    const error = validateFullName(value);
    setNameError(error || '');
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // При потере фокуса очищаем пробелы и обновляем поле
    const cleanedValue = cleanSpaces(e.target.value);
    setFullName(cleanedValue);

    const error = validateFullName(cleanedValue);
    setNameError(error || '');
  };

  return (
    <div
      className={`${styles.formSpeakerCalculatorGroup} ${styles.formSpeakerCalculatorGroupName}`}
    >
      <label className={styles.groupRequired}>
        Фамилия и имя
        {!initialName && (
          <span
            className={`${styles.groupRequiredMark} ${styles.groupRequiredMarkFirst}`}
          >
            *
          </span>
        )}
      </label>
      <input
        className={`${styles.inputFullName} ${styles.fieldText} ${styles.fieldTextName}`}
        type="text"
        id={uniqueId}
        placeholder="Петров Иван"
        value={fullName}
        onChange={handleFullNameChange}
        onBlur={handleBlur}
        maxLength={MAX_NAME_LENGTH}
        required
        aria-describedby={`${uniqueId}-error`}
      />
      {nameError && (
        <span
          className={styles.inputTextError}
          id={`${uniqueId}-error`}
          aria-live="polite"
        >
          <img
            className={styles.inputIconError}
            src={reportError}
            alt="значок ошибки"
            width={'24'}
          />
          <p>{nameError}</p>
        </span>
      )}
    </div>
  );
};
