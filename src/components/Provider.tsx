import { type ReactNode } from "react";
import { NotesProvider } from "../notes/NotesProvider";
import { ThemeProvider } from "../theme/ThemeProvider";

function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <NotesProvider>{children}</NotesProvider>
    </ThemeProvider>
  );
}

export default Provider;
