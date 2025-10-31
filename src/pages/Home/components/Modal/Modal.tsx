import styles from './Modal.module.css';
import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import closeIcon from './icon/close.svg';

interface ModalUIProps {
  isOpen: boolean;
  doClose: () => void;
  children?: ReactNode;
}

export const ModalUI: FC<ModalUIProps> = ({ isOpen, doClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') doClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, doClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={doClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.content}>{children}</div>
        <button className={styles.closeButton} onClick={doClose}>
          <img src={closeIcon} alt="close" />
        </button>
      </div>
    </div>
  );
};
