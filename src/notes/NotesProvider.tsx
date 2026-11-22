import type { ReactNode } from "react";
import { NotesDispatchContext, NotesStateContext } from "./notesContext";
import { useNotes } from "./useNotes";

export function NotesProvider({ children }: { children: ReactNode }) {
  const { notes, dispatch } = useNotes();

  return (
    <NotesStateContext value={notes}>
      <NotesDispatchContext value={dispatch}>{children}</NotesDispatchContext>
    </NotesStateContext>
  );
}
