import type { Note } from "../notes/NotesProvider";

import { useNotes } from "../notes/useNotesState";
// import { themContext } from "../theme/ThemeProvider";
import { useTheme } from "../theme/useTheme";

function NoteCard() {
  const { theme, toggle } = useTheme();

  console.log(theme);
  const notee: Note = {
    id: "thed",
    name: "my note",
    description: "here is what here is ",
  };

  const { note, setNote } = useNotes();

  console.log(note);
  return <button onClick={() => setNote(notee)}>click me</button>;
}

export default NoteCard;
