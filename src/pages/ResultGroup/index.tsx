// src\pages\ResultGroup\index.tsx

import React, { useState } from 'react';
import styles from './ResultGroupPage.module.css';
import { Header } from './components/header';
import { GroupDescription } from './components/groupDescription';
import type { TGroupItem } from './components/groupDescription/GroupDescription';
import defaultGroupImageSrc from './components/groupDescription/assets/group.png';

const mockGroupData: TGroupItem[] = [
  { name: 'Петров Иван', date: '12.03.2012', age: '12 лет' },
  { name: 'Сидоров Михаил', date: '16.06.2011', age: '12 лет' },
  { name: 'Елинова Дарья', date: '11.12.2018', age: '12 лет' },
];

export const ResultGroupPage: React.FC = () => {
  const [groupName, setGroupName] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState(defaultGroupImageSrc);

  return (
    <main className={styles.main}>
      <Header></Header>
      <GroupDescription
        data={mockGroupData}
        groupName={groupName}
        onChangeGroupName={setGroupName}
        photoUrl={photoUrl}
        onChangePhotoUrl={setPhotoUrl}
      />
    </main>
  );
};

export default ResultGroupPage;
