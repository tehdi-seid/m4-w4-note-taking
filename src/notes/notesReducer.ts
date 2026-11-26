import type { Note, NotePatch } from "./types";

export type NotesAction =
  | { type: "added"; note: Note }
  | { type: "updated"; id: string; patch: NotePatch }
  | { type: "removed"; id: string }
  | { type: "pinToggled"; id: string }
  | { type: "archiveToggled"; id: string };

function withStamp(note: Note, patch: Partial<Note>): Note {
  return { ...note, ...patch, updatedAt: new Date().toISOString() };
}

export function notesReducer(notes: Note[], action: NotesAction): Note[] {
  switch (action.type) {
    case "added":
      return [action.note, ...notes];
    case "updated": {
      const nextTitle = action.patch.title?.trim();
      return notes.map((note) =>
        note.id === action.id
          ? withStamp(note, {
              ...action.patch,
              title:
                action.patch.title === undefined
                  ? note.title
                  : nextTitle || "Untitled",
            })
          : note,
      );
    }
    case "removed":
      return notes.filter((note) => note.id !== action.id);
    case "pinToggled":
      return notes.map((note) =>
        note.id === action.id ? withStamp(note, { pinned: !note.pinned }) : note,
      );
    case "archiveToggled":
      return notes.map((note) =>
        note.id === action.id
          ? withStamp(note, { archived: !note.archived })
          : note,
      );
    default: {
      const unexpected: never = action;
      throw new Error(`Unknown notes action: ${JSON.stringify(unexpected)}`);
    }
  }
}
