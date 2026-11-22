import { useContext, type TextareaHTMLAttributes } from "react";
import { themeContex, type ThemeContext } from "./ThemeProvider";

export function useTheme() {
  const context = useContext(themeContex);
  if (context === null) {
    throw new Error("theme context must be used in theme provider");
  }

  return context;
}
