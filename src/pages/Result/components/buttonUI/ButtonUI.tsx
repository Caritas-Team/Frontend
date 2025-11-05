import React, { type ReactNode } from 'react';
import styles from './ButtonUI.module.css';

type TButtonUI = {
  className?: string;
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  secondary?: boolean;
  tertiary?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
};

export const ButtonUI: React.FC<TButtonUI> = ({
  className,
  label,
  onClick,
  type = 'button',
  secondary = false,
  tertiary = false,
  disabled = false,
  icon,
}: TButtonUI) => (
  <button
    type={type}
    disabled={disabled}
    className={`${styles.button} ${className ?? ''} ${secondary ? styles.secondary : ''} ${tertiary ? styles.tertiary : ''}`}
    onClick={onClick}
  >
    {icon}
    {label}
  </button>
);
