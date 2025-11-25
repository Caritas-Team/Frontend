import { Delta } from '../delta/Delta';
import styles from './FinalTable.module.css';

export type FinalTableProps = {
  languageDevelopmentLevels: string;
  communicationInitiative: string;
  communicativeFunctionsProgress: string;
  vocabularyLevel: string;
  spokenWordsCount: string;
};

export const FinalTable: React.FC<FinalTableProps> = ({
  languageDevelopmentLevels,
  communicationInitiative,
  communicativeFunctionsProgress,
  vocabularyLevel,
  spokenWordsCount,
}) => {
  //TODO: const showWarning = () => {} для отображения придупреждения когда нужно;
  return (
    <section className={styles.finalTable}>
      <h3 className={styles.caption}>Итоговая таблица</h3>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr className={styles.headerRow}>
            <td
              className={`${styles.headerCell} ${styles.headerCellParameters}`}
            >
              Параметры:
            </td>
            <td className={styles.headerCell}>%/кол-во:</td>
          </tr>
        </thead>
        <tbody className={styles.body}>
          <tr className={styles.row}>
            <td className={styles.parameterCell}>Уровни языкового развития</td>
            <td className={styles.valueCell}>
              <div className={styles.boxDelta}>
                <Delta text={languageDevelopmentLevels} up={true} />
              </div>
            </td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.parameterCell}>Инициатива</td>
            <td className={styles.valueCell}>
              <div className={styles.boxDelta}>
                <Delta text={communicationInitiative} up={true} />
              </div>
            </td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.parameterCell}>
              Развитие коммуникативных функций
            </td>
            <td className={styles.valueCell}>
              <div className={styles.boxDelta}>
                <span className={styles.wrapperWarning}></span>
                <Delta text={communicativeFunctionsProgress} up={false} />
              </div>
            </td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.parameterCell}>Словарный запас</td>
            <td className={styles.valueCell}>
              <div className={styles.boxDelta}>
                <Delta text={vocabularyLevel} up={true} />
              </div>
            </td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.parameterCell}>Устные слова</td>
            <td className={styles.valueCell}>
              <div className={styles.boxDelta}>
                <Delta text={spokenWordsCount} up={false} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
