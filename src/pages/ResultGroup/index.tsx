// src\pages\ResultGroup\index.tsx

import React from 'react';
import styles from './ResultGroupPage.module.css';
import { Header } from './components/header';

export const ResultGroupPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <Header></Header>
    </main>
  );
};

export default ResultGroupPage;
