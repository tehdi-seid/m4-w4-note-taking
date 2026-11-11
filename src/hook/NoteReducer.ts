import type { Note } from "./types";

export type NotesAction =
  | { type: "added"; note: Note }
  | { type: "updated"; id: string; patch: Partial<Note> }
  | { type: "removed"; id: string }
  | { type: "pinToggled"; id: string }
  | { type: "archiveToggled"; id: string };

export function notesReducer(notes: Note[], action: NotesAction): Note[] {
  const stamp = new Date().toISOString();

  switch (action.type) {
    case "added":
      return [action.note, ...notes];

    case "updated":
      return notes.map((n) =>
        n.id === action.id ? { ...n, ...action.patch, updatedAt: stamp } : n,
      );

    case "removed":
      return notes.filter((n) => n.id !== action.id);

    case "pinToggled":
      return notes.map((note) =>
        note.id === action.id
          ? { ...note, pinned: !note.pinned, updatedAt: stamp }
          : note,
      );

    case "archiveToggled":
      return notes.map((n) =>
        n.id === action.id
          ? { ...n, archived: !n.archived, updatedAt: stamp }
          : n,
      );
  }
}
