import { memo, useEffect, useId, useRef, useState } from "react";
import type { Note } from "../notes/types";
import { useNotesDispatch } from "../notes/useNotesDispatch";
import {
  confirmButton,
  dangerButton,
  pressedButton,
  quietButton,
} from "./styles";

type Props = {
  note: Note;
  onEdit: (id: string) => void;
};

function formatUpdated(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function excerpt(body: string): string {
  const flat = body.replace(/\s+/g, " ").trim();
  if (!flat) return "No body yet.";
  return flat.length > 140 ? `${flat.slice(0, 140).trimEnd()}…` : flat;
}

function NoteCard({ note, onEdit }: Props) {
  const dispatch = useNotesDispatch();
  const probe = window as Window & { __cardRenders?: Record<string, number> };
  probe.__cardRenders ??= {};
  probe.__cardRenders[note.id] = (probe.__cardRenders[note.id] ?? 0) + 1;
  const confirmId = useId();
  const confirmRef = useRef<HTMLButtonElement>(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    confirmRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.stopImmediatePropagation();
      setConfirming(false);
    }

    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [confirming]);

  return (
    <article
      data-note-id={note.id}
      className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="min-w-0 flex-1 break-words text-base font-semibold text-zinc-900 dark:text-zinc-50">
          {note.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {note.pinned ? (
            <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-950 dark:bg-amber-200 dark:text-amber-950">
              Pinned
            </span>
          ) : null}
          {note.archived ? (
            <span className="rounded-full bg-zinc-200 px-2 py-1 text-xs font-medium text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100">
              Archived
            </span>
          ) : null}
        </div>
      </div>
      <p className="mt-2 break-words text-sm leading-6 text-zinc-700 dark:text-zinc-200">
        {excerpt(note.body)}
      </p>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
        Updated{" "}
        <time dateTime={note.updatedAt}>{formatUpdated(note.updatedAt)}</time>
      </p>
      {confirming ? (
        <div
          className="mt-4 flex flex-wrap items-center gap-2"
          role="group"
          aria-labelledby={confirmId}
        >
          <p
            id={confirmId}
            className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Delete this note?
          </p>
          <button
            ref={confirmRef}
            type="button"
            className={confirmButton}
            onClick={() => dispatch({ type: "removed", id: note.id })}
          >
            Confirm delete
          </button>
          <button
            type="button"
            className={quietButton}
            onClick={() => setConfirming(false)}
          >
            Keep
          </button>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className={note.pinned ? pressedButton : quietButton}
            aria-pressed={note.pinned}
            onClick={() => dispatch({ type: "pinToggled", id: note.id })}
          >
            {note.pinned ? "Unpin" : "Pin"}
          </button>
          <button
            type="button"
            className={note.archived ? pressedButton : quietButton}
            aria-pressed={note.archived}
            onClick={() => dispatch({ type: "archiveToggled", id: note.id })}
          >
            {note.archived ? "Unarchive" : "Archive"}
          </button>
          <button
            type="button"
            className={quietButton}
            onClick={() => onEdit(note.id)}
          >
            Edit
          </button>
          <button
            type="button"
            className={dangerButton}
            onClick={() => setConfirming(true)}
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
}

export default memo(NoteCard);
