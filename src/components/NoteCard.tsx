import { MdOutlineDateRange } from "react-icons/md";
import { IoArchive } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

import { GiPin } from "react-icons/gi";
import type { Note } from "../hook/types";

function NoteCard({ note }: { note: Note }) {
  function handleEdit(id: string) {}
  return (
    <div className="flex flex-col border border-teal-500 p-5 rounded-3xl gap-6 relative overflow-hidden">
      <div className="flex justify-between items-center border-b pb-2">
        <div className="flex gap-2 items-center">
          <MdOutlineDateRange />
          <div>{note.createdAt}</div>
        </div>
        <div className="flex gap-4">
          <button className="cursor-pointer hover:text-text-lighter transition-colors duration-300 ease-in">
            <IoArchive />
          </button>

          <button className="cursor-pointer hover:text-text-lighter transition-colors duration-300 ease-in">
            <GiPin />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">{note.title} </h2>
        <p>{note.body}</p>
      </div>
      <div className="w-15 h-15 bg-bg-lighter absolute top-0 left-0 rotate-45 -translate-y-1/2 -translate-x-1/2"></div>

      <div className="flex justify-between">
        <button
          onClick={() => handleEdit(note.id)}
          className="cursor-pointer hover:text-text-lighter transition-colors duration-100 ease-in"
        >
          <FaEdit />
        </button>
        <button className="cursor-pointer hover:text-[red] transition-colors duration-100 ease-in text-red-800">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
