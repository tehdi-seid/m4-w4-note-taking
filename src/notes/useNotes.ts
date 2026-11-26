import { useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { createNote } from "./createNote";
import { notesReducer, type NotesAction } from "./notesReducer";
import { selectNotes } from "./selectNotes";
import { reviveNotes, type Note, type NotePatch, type View } from "./types";

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", [], 1, reviveNotes);

  const dispatch = useCallback(
    (action: NotesAction) => {
      setNotes((current) => notesReducer(Array.isArray(current) ? current : [], action));
    },
    [setNotes],
  );

  const addNote = useCallback(
    (title: string, body: string) => {
      const note = createNote(title, body);
      dispatch({ type: "added", note });
      return note.id;
    },
    [dispatch],
  );

  const updateNote = useCallback(
    (id: string, patch: NotePatch) => {
      dispatch({ type: "updated", id, patch });
    },
    [dispatch],
  );

  const removeNote = useCallback(
    (id: string) => {
      dispatch({ type: "removed", id });
    },
    [dispatch],
  );

  const togglePin = useCallback(
    (id: string) => {
      dispatch({ type: "pinToggled", id });
    },
    [dispatch],
  );

  const toggleArchive = useCallback(
    (id: string) => {
      dispatch({ type: "archiveToggled", id });
    },
    [dispatch],
  );

  const notesFor = useCallback(
    (view: View) => selectNotes(notes, view),
    [notes],
  );

  return {
    notes,
    addNote,
    updateNote,
    removeNote,
    togglePin,
    toggleArchive,
    notesFor,
    dispatch,
  };
}
