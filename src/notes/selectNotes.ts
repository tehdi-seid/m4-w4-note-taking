import type { Note, View } from "./types";

export function selectNotes(notes: Note[], view: View): Note[] {
  const visible =
    view === "archived"
      ? notes.filter((note) => note.archived)
      : view === "pinned"
        ? notes.filter((note) => note.pinned && !note.archived)
        : notes.filter((note) => !note.archived);

  return visible.toSorted(
    (a, b) =>
      Number(b.pinned) - Number(a.pinned) ||
      b.updatedAt.localeCompare(a.updatedAt),
  );
}
