import { FC, ReactElement, useEffect } from "react";
import { FieldError, UseFormSetValue } from "react-hook-form";
import "./InputModifyValidation.scss";

type props = {
  error: FieldError | undefined;
  setValue: UseFormSetValue<any>;
  defaultValue: string | number;
  modify: () => void;
  name: string;
};

const InputModifyValidation: FC<props> = ({
  error,
  setValue,
  defaultValue,
  modify,
  name,
}): ReactElement => {

  const onChange = (e: any) => {
    setValue(`${name}`, e.target.value, { shouldValidate: true });
    modify();
  };

  return (
    <input
      type="text"
      className={`input-modify-validation form-control ${error ? "is-invalid" : ""}`}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

export default InputModifyValidation;
