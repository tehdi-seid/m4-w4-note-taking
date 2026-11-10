import React from "react";
import Header from "./components/Header";
import NoteCard from "./components/NoteCard";
import AddNote from "./components/AddNote";
import { useNotes } from "./hook/useNotes";

function App() {
  const [notes, setNotes] = useNotes();
  return (
    <div>
      <Header />

      <div className="mt-20 flex flex-col  md:flex-row md:gap-5">
        <AddNote />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 mt-5 md:ml-85">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
