import { FC, ReactElement } from "react";
import "./ErrorValidation.scss";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type props = {
  message: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
};

const ErrorValidation: FC<props> = ({ message }): ReactElement => {
  return <div className="text-start text-danger py-1 fs-14">{message?.toString()}</div>;
};

export default ErrorValidation;
