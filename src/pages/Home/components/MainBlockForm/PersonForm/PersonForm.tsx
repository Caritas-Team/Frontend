import { InputFile } from '../InputFile/index';
import { InputFullName } from '../InputFullName/index';
import type { PersonFormData } from '../MainBlockForm';

import { useMemo } from 'react'; // Убрали useEffect, useRef

import clossButtom from '../../../../../assets/closeButton.svg';
import styles from '../MainBlockForm.module.css';

type PersonFormProps = {
  id: string;
  onRemove?: () => void;
  onUpdate: (id: string, updates: Partial<PersonFormData>) => void;
  formData: PersonFormData;
};

export const PersonForm = ({
  id,
  onRemove,
  onUpdate,
  formData,
}: PersonFormProps) => {
  // Определяем активна ли форма
  const activForm = useMemo(() => {
    return (
      formData.nameValid &&
      formData.previousFileValid &&
      formData.currentFileValid
    );
  }, [
    formData.nameValid,
    formData.previousFileValid,
    formData.currentFileValid,
  ]);

  const handleNameChange = (isValid: boolean, name?: string) => {
    onUpdate(id, { name, nameValid: isValid });
  };

  const handlePreviousFileChange = (
    isValid: boolean,
    previouFile?: File | null
  ) => {
    onUpdate(id, { previousFileValid: isValid, previouFile });
  };

  const handleCurrentFileChange = (
    isValid: boolean,
    currentFile?: File | null
  ) => {
    onUpdate(id, { currentFileValid: isValid, currentFile });
  };

  const containerClassName = `${styles.formSpeakerCalculatorGroupsContainer} ${activForm ? styles.groupContainerActiv : ''}`;
  const buttonClassName = `${styles.buttonClossForm} ${activForm ? styles.buttonClossFormActiv : ''}`;

  return (
    <div className={styles.speakerCalculatorGroupContainer}>
      {onRemove && (
        <button className={buttonClassName} onClick={onRemove} type="button">
          <img
            className={styles.buttonClossFormIcon}
            src={clossButtom}
            alt="удалить форму"
          />
        </button>
      )}
      <div className={containerClassName}>
        <InputFullName
          initialName={formData.name}
          onValidityChange={handleNameChange}
        />
        <InputFile
          label="Предыдущий результат"
          onValidityChange={handlePreviousFileChange}
        />
        <InputFile
          label="Текущий результат"
          onValidityChange={handleCurrentFileChange}
        />
      </div>
    </div>
  );
};
