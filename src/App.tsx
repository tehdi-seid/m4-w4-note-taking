import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import { useNotesDispatch } from "./notes/useNotesDispatch";
import NotesWorkspace from "./components/NotesWorkspace";
import StorageScratch from "./components/StorageScratch";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { reviveView, type View } from "./notes/types";

function DispatchProbe() {
  useNotesDispatch();
  const probe = window as Window & { __renders?: Record<string, number> };
  probe.__renders ??= {};
  probe.__renders.dispatch = (probe.__renders.dispatch ?? 0) + 1;
  return null;
}

function focusTitle() {
  document.querySelector<HTMLInputElement>('#note-editor input[name="title"]')?.focus();
}

export default function App() {
  const [view, setView] = useLocalStorage<View>("view", "all", 1, reviveView);
  const [editingId, setEditingId] = useState<string | null>(null);
  const onEdit = useCallback((id: string) => setEditingId(id), []);
  const onStopEditing = useCallback(() => setEditingId(null), []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target;
      const typing =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        document.querySelector<HTMLFormElement>("#note-editor")?.requestSubmit();
        return;
      }

      if (event.key === "Escape") {
        onStopEditing();
        return;
      }

      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === "n" || event.key === "N") {
        event.preventDefault();
        onStopEditing();
        focusTitle();
        return;
      }

      if (event.key === "1") setView("all");
      if (event.key === "2") setView("pinned");
      if (event.key === "3") setView("archived");
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onStopEditing, setView]);

  return (
    <div className="min-h-dvh bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50">
      <a
        href="#note-editor"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-3 focus-visible:left-3 focus-visible:z-20 focus-visible:inline-flex focus-visible:h-11 focus-visible:items-center focus-visible:rounded-full focus-visible:bg-zinc-900 focus-visible:px-4 focus-visible:text-sm focus-visible:font-medium focus-visible:text-white dark:focus-visible:bg-zinc-100 dark:focus-visible:text-zinc-900"
      >
        Skip to editor
      </a>
      <Header />
      <DispatchProbe />
      <NotesWorkspace
        view={view}
        onViewChange={setView}
        editingId={editingId}
        onEdit={onEdit}
        onStopEditing={onStopEditing}
      />
      {new URLSearchParams(window.location.search).has("scratch") ? <StorageScratch /> : null}
    </div>
  );
}
