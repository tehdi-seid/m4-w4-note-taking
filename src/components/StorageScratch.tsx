import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function StorageScratch() {
  const [value, setValue] = useLocalStorage("scratch", "persisted-default");
  const [draft, setDraft] = useState(value);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6" aria-labelledby="scratch-heading">
      <h2 id="scratch-heading" className="text-lg font-semibold">
        Storage scratch
      </h2>
      <form
        className="mt-3 flex flex-wrap items-end gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          setValue(draft);
        }}
      >
        <div>
          <label htmlFor="scratch-value" className="text-sm font-medium">
            Scratch value
          </label>
          <input
            id="scratch-value"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="mt-1 block rounded-xl border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-50"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Save scratch
        </button>
      </form>
      <p className="mt-3 text-sm" data-testid="scratch-value">
        Stored: {value}
      </p>
    </section>
  );
}
