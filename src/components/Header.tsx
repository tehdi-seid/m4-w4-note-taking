<<<<<<< HEAD
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
=======
import React from "react";
import ToogleBtn from "./ToogleBtn";
import { useView } from "../hook/useView";

function Header() {
  const [_, setView] = useView();
  return (
    <header className="flex justify-between bg-bg-lighter py-3 px-6 fixed w-[95%] left-1/2 -translate-x-1/2 mt-2 rounded-4xl items-center top-0 dark:bg-gray-200 z-999">
      <section className="text-2xl font-bold">NOTE</section>
      <nav className="flex gap-5">
        <ToogleBtn />
        <ul className="flex gap-4">
          <li>
            <button onClick={() => setView("all")}>all</button>
          </li>
          <li>
            <button onClick={() => setView("pinned")}>pinned</button>
          </li>
          <li>
            <button onClick={() => setView("archived")}>archived</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
>>>>>>> 79543b21c5bafea05eea1fd6eebc5e1120e4d367
