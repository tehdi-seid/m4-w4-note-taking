import React from "react";
import Header from "./components/Header";
import NoteCard from "./components/NoteCard";
import AddNote from "./components/AddNote";

import { useNotesState } from "./hook/NoteProvider";
import type { Note } from "./hook/types";

function App() {
  const notes = useNotesState();

  return (
    <div>
      <Header />

      <div className="mt-20 flex flex-col md:flex-row md:gap-5">
        <AddNote />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mt-5 md:ml-85">
          {notes.length === 0 ? (
            <h2 className="text-center text-lg">No notes found....</h2>
          ) : (
            notes.map((note: Note) => <NoteCard key={note.id} note={note} />)
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
