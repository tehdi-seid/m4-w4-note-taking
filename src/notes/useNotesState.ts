import { use } from "react";
import { NotesStateContext } from "./notesContext";

export function useNotesState() {
  const notes = use(NotesStateContext);
  if (notes === null) {
    throw new Error("useNotesState must be used inside <NotesProvider>");
  }
  return notes;
}
