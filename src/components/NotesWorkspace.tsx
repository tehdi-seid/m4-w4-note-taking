import { createNote } from "../notes/createNote";
import { selectNotes } from "../notes/selectNotes";
import type { View } from "../notes/types";
import { useNotesDispatch } from "../notes/useNotesDispatch";
import { useNotesState } from "../notes/useNotesState";
import NoteEditor from "./NoteEditor";
import NoteList from "./NoteList";
import ViewTabs from "./ViewTabs";

type Props = {
  view: View;
  onViewChange: (view: View) => void;
  editingId: string | null;
  onEdit: (id: string) => void;
  onStopEditing: () => void;
};

export default function NotesWorkspace({
  view,
  onViewChange,
  editingId,
  onEdit,
  onStopEditing,
}: Props) {
  const notes = useNotesState();
  const dispatch = useNotesDispatch();
  const editing = notes.find((note) => note.id === editingId) ?? null;
  const visible = selectNotes(notes, view);

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-6 sm:px-6 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:items-start md:gap-10 md:py-10">
      <NoteEditor
        key={editing?.id ?? "new"}
        note={editing}
        onSave={(title, body) => {
          if (editing) {
            dispatch({ type: "updated", id: editing.id, patch: { title, body } });
          } else {
            dispatch({ type: "added", note: createNote(title, body) });
          }
          onStopEditing();
        }}
        onCancel={onStopEditing}
      />
      <section aria-labelledby="library-heading" className="min-w-0">
        <h2 id="library-heading" className="sr-only">
          Note library
        </h2>
        <ViewTabs
          value={view}
          onChange={onViewChange}
          counts={{
            all: selectNotes(notes, "all").length,
            pinned: selectNotes(notes, "pinned").length,
            archived: selectNotes(notes, "archived").length,
          }}
        />
        <div
          role="tabpanel"
          id={`panel-${view}`}
          aria-labelledby={`tab-${view}`}
          tabIndex={0}
          data-view={view}
          className="outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 dark:focus-visible:outline-amber-200"
        >
          <NoteList notes={visible} view={view} onEdit={onEdit} />
        </div>
      </section>
    </main>
  );
}
