import styles from './loader_3.module.css';
import { useEffect } from 'react';

export type LoaderProps = {
  openLoader: boolean;
  doClose: () => void;
};

const Loader_3 = (props: LoaderProps) => {
  const { openLoader, doClose } = props;

  useEffect(() => {
    if (openLoader) {
      const timer = setTimeout(() => {
        console.log('20 seconds passed, closing loader');
        doClose();
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [openLoader, doClose]);

  if (!openLoader) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
      </div>
      <span className={styles.text}>
        Обработка данных<span className={styles.dots}></span>
      </span>
    </div>
  );
};

export default Loader_3;
