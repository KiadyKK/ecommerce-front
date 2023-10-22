import { Theme } from "react-toastify";

export const getTheme = (): Theme | undefined => {
  const themeStorage: string | null = localStorage.getItem("theme");
  return themeStorage === "dark" ? "dark" : "light";
};

export const floatNumberWithSpaces = (x: number): string => {
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

export const numberWithSpaces = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
