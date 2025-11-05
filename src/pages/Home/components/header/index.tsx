import { Logo } from '@ui/logo';
import styles from './header.module.css';
import { TitleSection } from '../titleSection';
import { DatePicker } from '../date-picker';
import { useState } from 'react';

interface HeaderProps {
  isBlockDate: boolean;
  title: string;
  subtitle: string;
}

export const Header = ({ isBlockDate, title, subtitle }: HeaderProps) => {
  const [selectDate, setSelectDate] = useState('');

  const handleDateChane = (newDate: string) => {
    setSelectDate(newDate);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoBlock}>
        <Logo />
      </div>
      <div className={styles.titleBlock}>
        <TitleSection title={title} subtitle={subtitle} />
      </div>
      <div className={styles.dateBlock}>
        {isBlockDate && (
          <DatePicker
            value={selectDate}
            onChange={handleDateChane}
            label={'Дата заполнения'}
            required={true}
          />
        )}
      </div>
    </header>
  );
};
