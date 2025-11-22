/* как использовать компонент:
const [openLoader, setOpenLoader] = useState<boolean>(false);
...
{openLoader && <Loader />}
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
