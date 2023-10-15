import { FC, PropsWithChildren, ReactElement } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormSetValue,
} from "react-hook-form";
import Select from "react-select";

type props = PropsWithChildren<{
  register: any;
  placeholder: string;
  options: any;
  getOptionLabel: (option: any) => string;
  setValue: UseFormSetValue<any>;
  error: Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}>;

const ReactSelectValidation: FC<props> = (props): ReactElement => {
  const onChange = (e: any) => {
    props.setValue(`${props.children}`, e, { shouldValidate: true });
  };

  return (
    <Select
      {...props}
      className={`basic-single auto-complete w-100 ${
        props.error ? "is-invalid" : ""
      }`}
      classNamePrefix="select"
      onChange={onChange}
      isClearable
      isSearchable
    />
  );
};

export default ReactSelectValidation;
