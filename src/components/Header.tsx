import React from "react";
import ToogleBtn from "./ToogleBtn";

function Header() {
  return (
    <header className="flex justify-between bg-bg-lighter py-3 px-6 fixed w-[95%] left-1/2 -translate-x-1/2 mt-2 rounded-4xl items-center top-0 z-999">
      <section className="text-2xl font-bold">NOTE</section>
      <nav className="flex gap-5">
        <ToogleBtn />
        <ul className="flex gap-4">
          <li>
            <a href="">all</a>
          </li>
          <li>
            <a href="">pinned</a>
          </li>
          <li>
            <a href="">archived</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
