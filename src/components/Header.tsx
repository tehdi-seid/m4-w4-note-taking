import React from "react";
import ToogleBtn from "./ToogleBtn";
import { useView } from "../hook/useView";

function Header() {
  const [view, setView] = useView();
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
