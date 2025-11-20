import styles from './customLoader.module.css';
import { useEffect } from 'react';

export type LoaderProps = {
  openLoader: boolean;
  doClose: () => void;
};

const CustomLoader = (props: LoaderProps) => {
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
        {/* Внешний куб */}
        <div className={styles.cube}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.face}></div>
          ))}
        </div>

        {/* 20 внутренних кубов */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.innerCube}>
            {[...Array(6)].map((_, j) => (
              <div key={j} className={styles.innerFace}></div>
            ))}
          </div>
        ))}
      </div>
      <span className={styles.text}>Обработка данных</span>
    </div>
  );
};

export default CustomLoader;
