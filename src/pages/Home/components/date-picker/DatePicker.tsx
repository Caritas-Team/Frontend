import type { FC } from 'react';
import './DatePicker.css';

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
        <input type="date" value={value} onChange={handleDateChange} />
      </div>
    </div>
  );
};
