import { createContext } from "react";
import type { Dispatch } from "react";
import type { NotesAction } from "./notesReducer";
import type { Note } from "./types";

export const NotesStateContext = createContext<Note[] | null>(null);
export const NotesDispatchContext = createContext<Dispatch<NotesAction> | null>(
  null,
);
