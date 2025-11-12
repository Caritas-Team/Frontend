// src\pages\Result\components\legendItem\LegendItem.tsx
import styles from './LegendItem.module.css';

import { useIsMobile } from '@/hooks/useIsMobile';
import { Delta } from '../delta/Delta';

type LegendProps = {
  label: string;
  color: string;
  digitsText: string; // например "25%"
  positive: boolean;
};

export const LegendItem = ({
  label,
  color,
  digitsText,
  positive,
}: LegendProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className={styles.legendItem}>
        <span className={styles.labelText}>{label}</span>
        <div className={styles.oneRow}>
          <Delta text={digitsText} up={positive} />
          <span className={styles.dot} style={{ backgroundColor: color }} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.legendItem}>
      <div className={styles.oneRow}>
        <span className={styles.dot} style={{ backgroundColor: color }} />
        <span className={styles.labelText}>{label}</span>
      </div>
      <Delta text={digitsText} up={positive} />
    </div>
  );
};
