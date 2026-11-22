import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Note, View } from "./types";

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes:v1", []);
  function now() {
    return new Date().toISOString();
  }
  const addNotes = (title: string, body: string) => {
    const note: Note = {
      id: crypto.randomUUID(),
      title: title.trim() || "untitled",
      body,
      pinned: false,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [...prev, note]);
    return note.id;
  };
  function updateNote(
    id: string,
    patch: Partial<Pick<Note, "title" | "body" | "pinned" | "archived">>,
  ) {
    setNotes((prev: Note[]) =>
      prev.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: now() } : n)),
    );
  }

  function removeNote(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  const togglePin = (id: string) =>
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned, updatedAt: now() } : n,
      ),
    );

  const toggleArchive = (id: string) =>
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, archived: !n.archived, updatedAt: now() } : n,
      ),
    );

  function notesFor(view: View): Note[] {
    const visible =
      view === "archived"
        ? notes.filter((n) => n.archived)
        : view === "pinned"
          ? notes.filter((n) => n.pinned && !n.archived)
          : notes.filter((n) => !n.archived);
    // toSorted needs "lib": ["ES2023", ...] in tsconfig.app.json (see M4W2 §7)
    return visible.toSorted(
      (a, b) =>
        Number(b.pinned) - Number(a.pinned) ||
        b.updatedAt.localeCompare(a.updatedAt),
    );
  }

  return {
    notes,
    addNotes,
    updateNote,
    removeNote,
    togglePin,
    toggleArchive,
    notesFor,
  };
}
