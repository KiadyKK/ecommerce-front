import { useState } from "react";

const useSelect = () => {
  const [value, setValue] = useState("");

  const handleSelect = async (option) => {
    option === null ? setValue("") : setValue(Object.values(option)[0]);
  };

  return [value, handleSelect];
};

export default useSelect;
