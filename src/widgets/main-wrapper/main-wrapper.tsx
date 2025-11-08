import { type FC, type ReactNode } from 'react';
import styles from './styles.module.css';

interface MainWrapperProps {
  children?: ReactNode;
}
export const MainWrapper: FC<MainWrapperProps> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
