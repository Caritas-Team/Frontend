import { useState, useId } from 'react';
import reportError from '../../../../../assets/report_error.svg';
import styles from '../MainBlockForm.module.css';

type InputFullNameProps = {
  initialName?: string;
  onValidityChange: (isValid: boolean, name?: string) => void;
};

export const InputFullName = ({
  initialName = '',
  onValidityChange,
}: InputFullNameProps) => {
  const uniqueId = useId();

  const [nameError, setNameError] = useState<string>(initialName);
  const [fullName, setFullName] = useState<string>('');

  const validateFullName = (value: string) => {
    if (!value.trim()) {
      onValidityChange(false);
      return 'Фамилия и имя обязательны для заполнения';
    }

    if (value !== value.trim()) {
      onValidityChange(false);
      return 'Уберите лишние пробелы в начале или в конце';
    }

    const nameRegex = /^[А-ЯЁ][а-яё-]+\s+[А-ЯЁ][а-яё-]+$/;
    if (!nameRegex.test(value.trim())) {
      onValidityChange(false);
      return 'Введите фамилию и имя через пробел (только кириллица, первые буквы заглавные)';
    }
    onValidityChange(true, value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);

    const error = validateFullName(value);
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
        pattern="^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$"
        required
      />
      {nameError && (
        <span
          className={styles.inputTextError}
          id={uniqueId}
          aria-live="polite"
        >
          <img
            className={styles.inputIconError}
            src={reportError}
            alt="значек ошибки"
            width={'24'}
          />
          <p>{nameError}</p>
        </span>
      )}
    </div>
  );
};
