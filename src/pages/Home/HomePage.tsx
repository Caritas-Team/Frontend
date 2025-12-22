import styles from './styles.module.css';
import { MainWrapper } from '../Home/components/main-wrapper';
import { Logo } from '@/ui/logo';
import { TitleSection } from '../Home/components/titleSection';
import { DatePicker } from '../Home/components/date-picker';
import { useEffect, useState } from 'react';
import { InstructionPopup } from '../Home/components/InstructionPopup';
import { MainBlockForm } from '../Home/components/MainBlockForm';

function HomePage() {
  const [selectDate, setSelectDate] = useState('');
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleDate = (newDate: string) => {
    setSelectDate(newDate);
  };

  const handleTargetPopup = () => {
    setIsOpenPopup(prev => !prev);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      localStorage.setItem('user', JSON.stringify({ popupSeen: true }));
      setIsOpenPopup(true);
    }
  }, []);

  return (
    <MainWrapper>
      <header className={styles.header}>
        <div className={styles.logoBlock}>
          <Logo />
        </div>
        <div className={styles.titleBlock}>
          <TitleSection />
        </div>
        <div className={styles.dateBlock}>
          <DatePicker
            value={selectDate}
            onChange={handleDate}
            label={'Дата заполнения'}
            required={true}
          />
        </div>
      </header>
      <main className={styles.main}>
        <MainBlockForm openPopup={handleTargetPopup} />
      </main>
      <InstructionPopup isOpen={isOpenPopup} doClose={handleTargetPopup} />
    </MainWrapper>
  );
}

export default HomePage;
