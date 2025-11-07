import React, { type ReactNode } from 'react';
import styles from './Button.module.css';

type TButton = {
  className?: string;
  label: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  secondary?: boolean;
  tertiary?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
};

export const Button: React.FC<TButton> = ({
  className,
  label,
  onClick,
  type = 'button',
  secondary = false,
  tertiary = false,
  disabled = false,
  icon,
}: TButton) => (
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
