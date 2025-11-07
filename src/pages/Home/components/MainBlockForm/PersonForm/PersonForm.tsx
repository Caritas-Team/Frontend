import { useEffect, useRef, useMemo } from 'react';
import clossButtom from '../../../../../assets/closeButton.svg';
import { InputFullName } from '../InputFullName/InputFullName';
import type { PersonFormData } from '../MainBlockForm';
import { InputFile } from '../InputFile/InputFile';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonCloseRef = useRef<HTMLButtonElement>(null);

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
    buttonCloseRef.current?.classList[method]('button-closs-form-activ');
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
      {onRemove && (
        <button
          ref={buttonCloseRef}
          className="button-closs-form"
          onClick={onRemove}
          type="button"
        >
          <img src={clossButtom} alt="удалить форму" />
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
