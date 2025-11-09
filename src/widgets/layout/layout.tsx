import styles from './styles.module.css';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { InstructionPopup } from 'pages/Home/components/InstructionPopup';
import { ValidErrorPopup } from 'pages/Home/components/ValidErrorPopup';

import { subtitle, title } from '@ui/constants';
import { Outlet } from 'react-router-dom';
import { PageLayout } from '@widgets/page-layuot';
import { Header } from 'pages/Home/components/header';
import { MainWrapper } from '@widgets/main-wrapper';

export function Layout() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      localStorage.setItem('user', JSON.stringify({ popupSeen: true }));
      setIsOpenPopup(true);
    }
  }, []);

  const hadleClosePopup = (state: Dispatch<SetStateAction<boolean>>): void => {
    state(false);
  };

  return (
    <MainWrapper>
      <Header isBlockDate={true} title={title} subtitle={subtitle} />
      <main className={styles.main}>{<PageLayout content={<Outlet />} />}</main>
      <InstructionPopup
        isOpen={isOpenPopup}
        doClose={() => hadleClosePopup(setIsOpenPopup)}
      />
      <ValidErrorPopup
        isOpen={isError}
        doClose={() => {
          hadleClosePopup(setIsError);
          setErrorMessage(null);
        }}
        errors={errorMessage ?? ''}
      />
    </MainWrapper>
  );
}
