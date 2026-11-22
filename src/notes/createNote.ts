import type { Note } from "./types";

export function createNote(title: string, body: string): Note {
  const now = new Date().toISOString();
  const trimmed = title.trim();
  return {
    id: crypto.randomUUID(),
    title: trimmed || "Untitled",
    body,
    pinned: false,
    archived: false,
    createdAt: now,
    updatedAt: now,
  };
}
