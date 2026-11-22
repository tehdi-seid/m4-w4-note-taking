export type Note = {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NotePatch = Partial<Pick<Note, "title" | "body">>;

export type View = "all" | "pinned" | "archived";

export function isView(value: unknown): value is View {
  return value === "all" || value === "pinned" || value === "archived";
}

export function reviveView(value: unknown): View | undefined {
  return isView(value) ? value : undefined;
}

export function isNote(value: unknown): value is Note {
  if (typeof value !== "object" || value === null) return false;
  const note = value as Record<string, unknown>;
  return (
    typeof note.id === "string" &&
    typeof note.title === "string" &&
    typeof note.body === "string" &&
    typeof note.pinned === "boolean" &&
    typeof note.archived === "boolean" &&
    typeof note.createdAt === "string" &&
    typeof note.updatedAt === "string"
  );
}

export function reviveNotes(value: unknown): Note[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.filter(isNote);
}
