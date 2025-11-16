import styles from './styles.module.css';
import { MainWrapper } from '../main-wrapper';
import { Logo } from '@/ui/logo';
import { TitleSection } from '../titleSection';
import { DatePicker } from '../date-picker';

export function Layout() {
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
            value={'selectDate'}
            onChange={() => {}}
            label={'Дата заполнения'}
            required={true}
          />
        </div>
      </header>
      <main className={styles.main}>{'Main'}</main>
    </MainWrapper>
  );
}
