import { FC, ReactElement } from "react";
import "./InputValidation.scss";
import { FieldError } from "react-hook-form";

type props = {
  register: any;
  error: FieldError | undefined;
  placeholder: string;
  resetError: () => void;
};

const InputValidation: FC<props> = ({
  register,
  error,
  placeholder,
  resetError
}): ReactElement => {
  return (
    <input
      type="text"
      {...register}
      className={`input-validation form-control ${error ? "is-invalid" : ""}`}
      placeholder={placeholder}
      onKeyDown={resetError}
    />
  );
};

export default InputValidation;
