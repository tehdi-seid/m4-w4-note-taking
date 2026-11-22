// src/theme/useTheme.ts
import { use } from "react";
import { ThemeContext } from "./ThemeContext";

export function useTheme() {
  const ctx = use(ThemeContext);
  if (ctx === null) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
}
