// src/notes/NotesProvider.tsx
import { createContext, use, useEffect, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import { notesReducer, type NotesAction } from "./NoteReducer";
import type { Note } from "./types";

const NotesStateContext = createContext<Note[] | null>(null);
const NotesDispatchContext = createContext<Dispatch<NotesAction> | null>(null);

function loadNotes(): Note[] {
  try {
    return JSON.parse(localStorage.getItem("notes:v1") ?? "[]") as Note[];
  } catch {
    return [];
  }
}

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, dispatch] = useReducer(notesReducer, undefined, loadNotes);

  useEffect(() => {
    try {
      localStorage.setItem("notes:v1", JSON.stringify(notes));
    } catch {
      /* ignore quota / disabled storage */
    }
  }, [notes]);

  return (
    <NotesStateContext value={notes}>
      <NotesDispatchContext value={dispatch}>{children}</NotesDispatchContext>
    </NotesStateContext>
  );
}

export function useNotesState() {
  const ctx = use(NotesStateContext);
  if (ctx === null)
    throw new Error("useNotesState must be used inside <NotesProvider>");
  return ctx;
}

export function useNotesDispatch() {
  const ctx = use(NotesDispatchContext);
  if (ctx === null)
    throw new Error("useNotesDispatch must be used inside <NotesProvider>");
  return ctx;
}
