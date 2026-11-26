import type { Note, View } from "../notes/types";
import NoteCard from "./NoteCard";

const EMPTY: Record<View, { title: string; body: string }> = {
  all: {
    title: "No notes yet",
    body: "Write a title and a body, then save. Notes stay in this browser.",
  },
  pinned: {
    title: "No pinned notes",
    body: "Pin a note from All to keep it here and at the top of that list.",
  },
  archived: {
    title: "Archive is empty",
    body: "Archived notes stay out of All and Pinned until you unarchive them.",
  },
};

type Props = {
  notes: Note[];
  view: View;
  onEdit: (id: string) => void;
};

export default function NoteList({ notes, view, onEdit }: Props) {
  if (notes.length === 0) {
    const empty = EMPTY[view];
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-white px-4 py-8 dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{empty.title}</h3>
        <p className="mt-2 max-w-prose text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {empty.body}
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-4 flex list-none flex-col gap-3 p-0">
      {notes.map((note) => (
        <li key={note.id}>
          <NoteCard note={note} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  );
}
