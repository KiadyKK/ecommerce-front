import { FC, ReactElement, useEffect, useState } from "react";
import { Theme, ToastContainer } from "react-toastify";

const Toast: FC = (): ReactElement => {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    const themeStorage: string | null = localStorage.getItem("theme");
    themeStorage === "dark" ? setTheme("dark") : setTheme("light");
  }, []);

  return <ToastContainer position="top-right" autoClose={5000} theme={theme} />;
};

export default Toast;
