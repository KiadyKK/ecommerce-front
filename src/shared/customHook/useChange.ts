import { ChangeEventHandler, useState } from "react";

const useChangeInput = (init: any) => {
  const [value, setValue] = useState<any>(init);

  const resetValue = (): void => {
    setValue("");
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e: any) => {
    setValue(e.target.value);
  };

  return [value, onChange, resetValue];
};

export default useChangeInput;
