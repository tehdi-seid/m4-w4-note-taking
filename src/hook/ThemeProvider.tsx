import React, { createContext, type ReactNode } from "react";
import useLocalStorage from "./useLocalstorage";
export type Theme = "dark" | "light";
export type ThemeContext = [theme: Theme, setTheme: (theme: Theme) => void];
export const themeContex = createContext<ThemeContext | null>(null);
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "dark");

  function toogle() {
    setTheme((prev: Theme) => (prev === "dark" ? "light" : "dark"));
  }
  return (
    <themeContex.Provider value={[theme, toogle]}>
      {children}
    </themeContex.Provider>
  );
}

export default ThemeProvider;
