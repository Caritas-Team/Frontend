import type { FC } from 'react';
import './DatePicker.css';
import reportSrc from '../../../../assets/report.svg';

type Props = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
};

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
