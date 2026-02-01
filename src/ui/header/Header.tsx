// src\pages\ResultGroup\components\header\Header.tsx

import React from 'react';
import styles from './Header.module.css';
import { Logo } from '@ui/logo';
import { Button } from '@ui/button';
import PrintIcon from '@/assets/icon-print.svg';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>

      <div className={styles.header__buttons}>
        <p className={styles.header__text}>
          Если хотите сохранить результат расчета как файл - нажмите кнопку
          "Печать" и в окне выбора принтера выберите - "Сохранить как pdf"
        </p>
        <Button
          label="Печать"
          tertiary
          onClick={() => window.print()}
          icon={
            <img
              src={PrintIcon}
              alt="Иконка печати"
              className={styles.button_icon}
            />
          }
        ></Button>
      </div>
    </header>
  );
};
