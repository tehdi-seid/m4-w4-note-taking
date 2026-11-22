import { use } from "react";
import { NotesDispatchContext } from "./notesContext";

export function useNotesDispatch() {
  const dispatch = use(NotesDispatchContext);
  if (dispatch === null) {
    throw new Error("useNotesDispatch must be used inside <NotesProvider>");
  }
  return dispatch;
}
