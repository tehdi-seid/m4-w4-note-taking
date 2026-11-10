import { useContext } from "react";
import { noteContex, type NoteContextType } from "./NoteContext";

export function useNotes() {
  const context = useContext(noteContex);
  if (context === null) {
    throw new Error("usenotes must be used within Notes provider");
  }
  return context;
}
