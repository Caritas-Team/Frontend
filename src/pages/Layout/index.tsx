/* import { Outlet } from 'react-router'; */
/* import { Logo } from '../../ui/logo'; */
import { MainWrapper } from '../../ui/main-wrapper';
import styles from './styles.module.css';
/* import { PageLayout } from '../../ui/page-layuot/page-layuot'; */
import HomePage from '../Home';
/* import { TitleSection } from 'pages/Home/components/titleSection'; */
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { InstructionPopup } from 'pages/Home/components/InstructionPopup';
import { ValidErrorPopup } from 'pages/Home/components/ValidErrorPopup';
/* import { DatePicker } from 'pages/Home/components/date-picker'; */
import { Header } from 'pages/Home/components/header';
import { subtitle, title } from '@ui/constants';

export function Layout() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectDate, setSelectDate] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      localStorage.setItem('user', JSON.stringify({ popupSeen: true }));
      setIsOpenPopup(true);
    }
  }, []);

  const handleDateChane = (newDate: string) => {
    setSelectDate(newDate);
  };

  const hadleClosePopup = (state: Dispatch<SetStateAction<boolean>>): void => {
    state(false);
  };

  return (
    <MainWrapper>
      {/* <header className={styles.header}>
         <div className={styles.logoBlock}>
          <Logo />
        </div>
        <div className={styles.titleBlock}>
          <TitleSection title={title} subtitle={subtitle} />
        </div>
        <div className={styles.dateBlock}>
          <DatePicker
            value={selectDate}
            onChange={handleDateChane}
            label={'Дата заполнения'}
            required={true}
          />
        </div> 
        <Header isBlockDate={true} title={title} subtitle={subtitle} />
      </header> */}
      <Header isBlockDate={true} title={title} subtitle={subtitle} />
      <main className={styles.main}>
        <HomePage />
      </main>
      <InstructionPopup
        isOpen={isOpenPopup}
        doClose={() => hadleClosePopup(setIsOpenPopup)}
      />
      <ValidErrorPopup
        isOpen={isError}
        doClose={() => hadleClosePopup(setIsError)}
        errors={errorMessage ?? ''}
      />
    </MainWrapper>
  );
}

{
  /* <MainWrapper>
      <header className={styles.header}>
        <Logo />
        <div>
          <h1>Калькулятор динамики</h1>
          <h6>
            Мы не храним данные, а только предоставляем инструмент для расчёта
          </h6>
        </div>
        <div className="fill-date">Дата заполнения</div>
      </header>

      <main className={styles.main}>{<PageLayout content={<Outlet />} />}</main> 
      <main className={styles.main}>
        <HomePage />
      </main>
    </MainWrapper> */
}
