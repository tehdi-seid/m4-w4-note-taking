import React from "react";
import Header from "./components/Header";
import NoteCard from "./components/NoteCard";
import AddNote from "./components/AddNote";

import { useNotesState } from "./hook/NoteProvider";
import type { Note } from "./hook/types";
import { useView } from "./hook/useView";

function App() {
  const notes = useNotesState();
  const [view, _] = useView();
  const archived_notes = notes.filter((note) => note.archived);
  const pinned_notes = notes.filter((note) => note.pinned);

  return (
    <div>
      <Header />

      <div className="mt-20 flex flex-col md:flex-row gap-5">
        <AddNote />

        <div className="mt-5 md:ml-85 grid flex-1 min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
          {notes.length === 0 && (
            <h2 className="text-center text-lg">No notes found....</h2>
          )}
          {view === "all" &&
            notes.map((note) => <NoteCard key={note.id} note={note} />)}
          {view === "archived" &&
            archived_notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          {view === "pinned" &&
            pinned_notes.map((note) => <NoteCard key={note.id} note={note} />)}
          {view === "all" &&
            notes.map((note) => <NoteCard key={note.id} note={note} />)}
        </div>
      </div>
    </div>
  );
}
export default App;
