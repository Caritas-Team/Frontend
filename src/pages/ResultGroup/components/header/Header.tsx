// src\pages\ResultGroup\components\header\Header.tsx

import React from 'react';
import styles from './Header.module.css';
import { Logo } from '@ui/logo';
import { Button } from '../../../Result/components/button';
import PrintIcon from '@/assets/icon-print.svg';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <Logo />
      </Link>

      <div className={styles.header__buttons}>
        <Button
          label="Сохранить"
          secondary
          onClick={() => {
            console.log('Button Save has been pressed');
          }}
        ></Button>

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
