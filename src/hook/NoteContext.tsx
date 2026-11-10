import { createContext, useState, type ReactNode } from "react";
import type { Note } from "./types";
import useLocalStorage from "./useLocalstorage";
export type NoteContextType = [
  notes: Note[],
  addNote: (note: { title: string; body: string }) => void,
];
export const noteContex = createContext<NoteContextType | null>(null);

function NoteContextProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes:v1", []);
  function now() {
    return new Date().toLocaleDateString();
  }
  function addNote({ title, body }: { title: string; body: string }) {
    const note: Note = {
      id: crypto.randomUUID(),
      title,
      body,
      archived: false,
      pinned: false,
      createdAt: now(),
      updatedAt: now(),
    };
    setNotes((prev: Note[]) => [...prev, note]);
    console.log(notes);
  }
  return (
    <noteContex.Provider value={[notes, addNote]}>
      {children}
    </noteContex.Provider>
  );
}

export default NoteContextProvider;
