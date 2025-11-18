import styles from './loader.module.css';
import { useEffect } from 'react';

export type LoaderProps = {
  openLoader: boolean;
  doClose: () => void;
};

const Loader = (props: LoaderProps) => {
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
    <div className={styles.conteiner}>
      <div className={styles.loader}> </div>
      <span className={styles.text}>Обработка данных</span>
    </div>
  );
};

export default Loader;
