import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Note } from "../notes/types";
import { fieldClass, primaryButton, quietButton } from "./styles";

type Props = {
  note: Note | null;
  onSave: (title: string, body: string) => void;
  onCancel: () => void;
};

export default function NoteEditor({ note, onSave, onCancel }: Props) {
  const titleId = useId();
  const bodyId = useId();
  const titleRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(note?.title ?? "");
  const [body, setBody] = useState(note?.body ?? "");
  const canSave = title.trim().length > 0 || body.trim().length > 0;
  const noteId = note?.id;

  useEffect(() => {
    if (!noteId) return;
    titleRef.current?.focus();
  }, [noteId]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSave) return;
    onSave(title.trim() || "Untitled", body);
    if (!note) {
      setTitle("");
      setBody("");
    }
  }

  function handleCancel() {
    if (note) {
      onCancel();
      return;
    }
    setTitle("");
    setBody("");
  }

  return (
    <form
      id="note-editor"
      tabIndex={-1}
      autoComplete="off"
      onSubmit={handleSubmit}
      aria-keyshortcuts="Control+Enter"
      className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 sm:p-5 dark:border-zinc-800 dark:bg-zinc-900 dark:focus-visible:outline-amber-200"
    >
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {note ? "Edit note" : "New note"}
      </h2>
      <div className="mt-4">
        <label htmlFor={titleId} className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
          Title
        </label>
        <input
          id={titleId}
          name="title"
          ref={titleRef}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className={fieldClass}
        />
      </div>
      <div className="mt-4">
        <label htmlFor={bodyId} className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
          Body
        </label>
        <textarea
          id={bodyId}
          name="body"
          rows={8}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className={`${fieldClass} min-h-40 resize-y`}
        />
      </div>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
        Ctrl or Command + Enter saves. Escape cancels. N starts a new note. 1, 2, and 3 switch views.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="submit" className={primaryButton} disabled={!canSave}>
          Save
        </button>
        <button type="button" className={quietButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
