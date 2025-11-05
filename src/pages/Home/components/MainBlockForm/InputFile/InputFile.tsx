import reportError from '../report_error.svg';
import { useState, useId } from 'react';

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
    <div className="form-speaker-calculator__group">
      <label className="group__required group__required__file">
        {label}
        {!file || fileError !== '' ? (
          <span className="group__required-mark">*</span>
        ) : null}
      </label>

      <div className={`field__file ${fileError ? 'field__file-error' : ''}`}>
        {' '}
        <input
          className="component-reset-input input__file"
          id={uniqueId}
          type="file"
          hidden
          accept=".pdf"
          required
          onChange={handleFileChange}
        />
        <label
          htmlFor={uniqueId}
          className={`field-text field-text__file ${fileError ? 'field-text-error' : ''}`}
        >
          {file !== null ? (
            <p className="input-file-info">{file.name}</p>
          ) : (
            <p className="input-file-info">Выберите файл</p>
          )}
        </label>
      </div>
      {fileError && (
        <span className="input__text-error" id={uniqueId} aria-live="polite">
          <img
            className="input__icon-error"
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
