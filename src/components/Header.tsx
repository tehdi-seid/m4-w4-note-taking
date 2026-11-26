import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const probe = window as Window & { __renders?: Record<string, number> };
  probe.__renders ??= {};
  probe.__renders.header = (probe.__renders.header ?? 0) + 1;

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Notes
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Saved in this browser
          </p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
