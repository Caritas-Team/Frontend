// src\pages\ResultGroup\index.tsx

import React from 'react';
import styles from './ResultGroupPage.module.css';
import { Header } from './components/header';
import { CheckSection } from '../Result/components/checkSection';

export const ResultGroupPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <Header></Header>
      <CheckSection
        date1="15 Апр. 2025"
        formed1={20}
        initiative1={35}
        frequency1={50}
        date2="1 Мая 2025"
        formed2={90}
        initiative2={20}
        frequency2={55}
        description="Прилетит, вдруг, волшебник"
      />
    </main>
  );
};

export default ResultGroupPage;
