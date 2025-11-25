/* как использовать компонент:
import { Loader } from './components/loader/';
import styles from './home.module.css';

const [openLoader, setOpenLoader] = useState<boolean>(false);
...
return (
    <section style={{ padding: '2rem' }}>
      <div
        className={
          openLoader
            ? `${styles.pageContent} ${styles.pageContentWithLoader}`
            : styles.pageContent
        }
      >
        ... секция с компонентами на странице
      </div>
      {openLoader && <Loader />}
    </section>
  );
*/

import styles from './loader.module.css';

const Loader = () => {
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
        Формируется отчёт<span className={styles.dots}></span>
      </span>
    </div>
  );
};

export default Loader;
