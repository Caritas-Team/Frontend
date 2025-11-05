import { useEffect, useRef, useMemo } from 'react';
import clossButtom from '../closeButton.svg';
import { InputFullName } from '../InputFullName/InputFullName';
import type { PersonFormData } from '../MainBlockForm';
import { InputFile } from '../InputFile/InputFile';

type PersonFormProps = {
  id: string;
  isMainForm?: boolean;
  onRemove?: () => void;
  onUpdate: (id: string, updates: Partial<PersonFormData>) => void;
  formData: PersonFormData;
};

export const PersonForm = ({
  id,
  isMainForm,
  onRemove,
  onUpdate,
  formData,
}: PersonFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  //для выделения полей формы синим когда заполнено все верно
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

  useEffect(() => {
    if (!containerRef.current) return;

    const method = activForm ? 'add' : 'remove';
    containerRef.current.classList[method]('group__container-activ');
  }, [activForm]);

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

  return (
    <div className="speaker-calculator__group__container">
      {!isMainForm && (
        <button
          className="button-closs-form component-reset-button"
          onClick={onRemove}
        >
          <img src={clossButtom} alt="" />
        </button>
      )}
      <div
        ref={containerRef}
        className="form-speaker-calculator__groups__container"
      >
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
