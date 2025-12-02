import { Delta } from '../delta/Delta';
import styles from './FinalTable.module.css';

export type FinalTableProps = {
  className?: string;
  languageDevelopmentLevels: string;
  communicationInitiative: string;
  communicativeFunctionsProgress: string;
  vocabularyLevel: string;
  spokenWordsCount: string;
};

export const FinalTable: React.FC<FinalTableProps> = ({
  className,
  languageDevelopmentLevels,
  communicationInitiative,
  communicativeFunctionsProgress,
  vocabularyLevel,
  spokenWordsCount,
}) => {
  //TODO: const showWarning = () => {} для отображения придупреждения когда нужно;
  return (
    <section
      className={
        className ? `${styles.finalTable} ${className}` : styles.finalTable
      }
    >
      <h3 className={styles.caption}>Итоговая таблица</h3>
      <div className={styles.gridContainer}>
        {/* Заголовок */}
        <div className={`${styles.gridHeader} ${styles.gridHeaderParameters}`}>
          Параметры:
        </div>
        <div className={`${styles.gridHeader} ${styles.gridHeaderValue}`}>
          %/кол-во:
        </div>

        {/* Строки данных */}
        <div className={styles.gridParameter}>Уровни языкового развития</div>
        <div className={styles.gridValue}>
          <div className={styles.boxDelta}>
            {/* <span className={styles.wrapperWarning}></span> */}
            <Delta text={languageDevelopmentLevels} up={true} />
          </div>
        </div>

        <div className={styles.gridParameter}>Инициатива</div>
        <div className={styles.gridValue}>
          <div className={styles.boxDelta}>
            {/* <span className={styles.wrapperWarning}></span> */}
            <Delta text={communicationInitiative} up={true} />
          </div>
        </div>

        <div className={styles.gridParameter}>
          Развитие коммуникативных функций
        </div>
        <div className={styles.gridValue}>
          <div className={styles.boxDelta}>
            <span className={styles.wrapperWarning}></span>
            <Delta text={communicativeFunctionsProgress} up={false} />
          </div>
        </div>

        <div className={styles.gridParameter}>Словарный запас</div>
        <div className={styles.gridValue}>
          <div className={styles.boxDelta}>
            {/* <span className={styles.wrapperWarning}></span> */}
            <Delta text={vocabularyLevel} up={true} />
          </div>
        </div>

        <div className={styles.gridParameter}>Устные слова</div>
        <div className={styles.gridValue}>
          <div className={styles.boxDelta}>
            {/* <span className={styles.wrapperWarning}></span> */}
            <Delta text={spokenWordsCount} up={false} />
          </div>
        </div>
      </div>
    </section>
  );
};
