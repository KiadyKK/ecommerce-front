import { FC, ReactElement, useEffect } from "react";
import { FieldError, UseFormSetValue } from "react-hook-form";
import "./InputModifyValidation.scss";

type props = {
  error: FieldError | undefined;
  setValue: UseFormSetValue<any>;
  defaultValue: string | number;
  modify: () => void;
  name: string;
  type?: string;
};

const InputModifyValidation: FC<props> = ({
  error,
  setValue,
  defaultValue,
  modify,
  name,
  type = "text",
}): ReactElement => {
  const onChange = (e: any) => {
    setValue(`${name}`, e.target.value, { shouldValidate: true });
    modify();
  };

  return (
    <input
      type={type}
      className={`input-modify-validation form-control ${error ? "is-invalid" : ""}`}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  );
};

export default InputModifyValidation;
