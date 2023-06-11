import { useState } from "react";

const useChange = (init) => {
  const [value, setValue] = useState(init);

  const resetValue = () => {
    setValue("");
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return [value, onChange, resetValue];
};

export default useChange;
