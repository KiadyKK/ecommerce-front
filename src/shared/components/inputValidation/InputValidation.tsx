import { FC, ReactElement, useEffect } from "react";
import "./InputValidation.scss";
import { FieldError } from "react-hook-form";

type props = {
  register: any;
  error: FieldError | undefined;
  placeholder?: string;
  type?: string;
  resetError?: () => void;
};

const InputValidation: FC<props> = ({
  register,
  error,
  placeholder,
  type = "text",
  resetError,
}): ReactElement => {
  return (
    <input
      type={type}
      {...register}
      className={`input-validation form-control ${error ? "is-invalid" : ""}`}
      placeholder={placeholder}
      onKeyDown={resetError}
    />
  );
};

export default InputValidation;
