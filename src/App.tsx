// src/App.tsx
import { useState } from "react";
import { useNotes } from "./notes/useNotesState";
import type { View } from "./notes/types";
import ThemeToggle from "./components/ThemeToggle";
import ViewTabs from "./components/ViewTabs";
import NoteEditor from "./components/NoteEditor";
import NoteList from "./components/NoteList";

export default function App() {
  const notesApi = useNotes();
  const [view, setView] = useState<View>("all");
  const [editingId, setEditingId] = useState<string | null>(null);

  const editing = editingId
    ? (notesApi.notes.find((n) => n.id === editingId) ?? null)
    : null;

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h1 className="text-xl font-bold">Notes</h1>
        <ThemeToggle />
      </header>
      <main className="mx-auto grid max-w-5xl gap-8 p-6 md:grid-cols-[1fr_2fr]">
        <NoteEditor
          key={editing?.id ?? "new"} // changing the key resets the editor's draft (M4W2 §8)
          note={editing}
          onSave={(title: string, body: string) => {
            if (editing) notesApi.updateNote(editing.id, { title, body });
            else notesApi.addNotes(title, body);
            setEditingId(null);
          }}
          onCancel={() => setEditingId(null)}
        />

        <section>
          <ViewTabs
            value={view}
            onChange={setView}
            counts={{
              all: notesApi.notesFor("all").length,
              pinned: notesApi.notesFor("pinned").length,
              archived: notesApi.notesFor("archived").length,
            }}
          />
          <NoteList
            notes={notesApi.notesFor(view)}
            onEdit={setEditingId}
            onTogglePin={notesApi.togglePin}
            onToggleArchive={notesApi.toggleArchive}
            onDelete={notesApi.removeNote}
          />
        </section>
      </main>
    </div>
  );
}
