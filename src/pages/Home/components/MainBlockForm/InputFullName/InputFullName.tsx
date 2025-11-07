import { useState, useId } from 'react';
import reportError from '../../../../../assets/report_error.svg';

type InputFullNameProps = {
  initialName?: string;
  onValidityChange: (isValid: boolean, name?: string) => void;
};

export const InputFullName = ({
  initialName = '',
  onValidityChange,
}: InputFullNameProps) => {
  const uniqueId = useId();

  const [nameError, setNameError] = useState(initialName);
  const [fullName, setFullName] = useState('');

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
    <div className="form-speaker-calculator__group form-speaker-calculator__group__name">
      <label className="group__required">
        Фамилия и имя
        {!initialName && (
          <span className="group__required-mark group__required-mark--first">
            *
          </span>
        )}
      </label>
      <input
        className="component-reset-input input__full-name field-text field-text__name"
        type="text"
        id={uniqueId}
        placeholder="Петров Иван"
        value={fullName}
        onChange={handleFullNameChange}
        pattern="^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$"
        required
      />
      {nameError && (
        <span className="input__text-error" id={uniqueId} aria-live="polite">
          <img
            className="input__icon-error"
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
