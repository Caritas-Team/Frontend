import reportError from '../../../../../assets/report_error.svg';
import { useState, useId } from 'react';
import styles from '../MainBlockForm.module.css';

type InputFileProps = {
  label: string;
  onValidityChange: (isValid: boolean, file?: File | null) => void;
};

const MAX_SIZE_FILE = 2 * 1024 * 1024; //TODO согласовать с бэком

export const InputFile = ({ label, onValidityChange }: InputFileProps) => {
  const uniqueId = useId();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');

  const validateInput = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFileError('Загрузите файл');
      onValidityChange(false);
    }

    if (selectedFile) {
      if (selectedFile.size > MAX_SIZE_FILE) {
        setFileError('Файл слишком большой. Максимальный размер: 2MB');
        onValidityChange(false);
      } else {
        setFileError('');
        onValidityChange(true, selectedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      validateInput(selectedFile);
    } else {
      setFile(null);
      setFileError('Загрузите файл');
    }
  };

  return (
    <div className={styles.formSpeakerCalculatorGroup}>
      <label className={`${styles.groupRequired} ${styles.groupRequiredFile}`}>
        {label}
        {!file || fileError !== '' ? (
          <span className={styles.groupRequiredMark}>*</span>
        ) : null}
      </label>

      <div
        className={`${styles.fieldFile} ${fileError ? styles.fieldFileError : ''}`}
      >
        <input
          className={styles.inputFile}
          id={uniqueId}
          type="file"
          hidden
          accept=".pdf"
          required
          onChange={handleFileChange}
        />
        <label
          htmlFor={uniqueId}
          className={`${styles.fieldText} ${styles.fieldTextFile} ${fileError ? styles.fieldTextError : ''}`}
        >
          {file !== null ? (
            <p className={styles.inputFileInfo}>{file.name}</p>
          ) : (
            <p className={styles.inputFileInfo}>Выберите файл</p>
          )}
        </label>
      </div>
      {fileError && (
        <span
          className={styles.inputTextError}
          id={uniqueId}
          aria-live="polite"
        >
          <img
            className={styles.inputIconError}
            src={reportError}
            alt="значек ошибки"
            width={'24'}
          />
          <p>{fileError}</p>
        </span>
      )}
    </div>
  );
};
