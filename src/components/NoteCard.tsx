import { MdOutlineDateRange } from "react-icons/md";
import { IoArchive } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

import { TbPinnedFilled } from "react-icons/tb";
import type { Note } from "../hook/types";
import { useNotesDispatch } from "../hook/NoteProvider";

function NoteCard({ note }: { note: Note }) {
  const dispatch = useNotesDispatch();
  function handleEdit() {}
  return (
    <div className="flex flex-col border border-teal-500 p-5 rounded-3xl gap-6 relative overflow-hidden shadow-teal-700 shadow-md">
      <div className="flex justify-between items-center border-b pb-2">
        <button
          onClick={() => handleEdit}
          className="cursor-pointer transition-colors duration-100 ease-in text-2xl"
        >
          <FaEdit />
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => dispatch({ type: "archiveToggled", id: note.id })}
            className={`cursor-pointer text-xl ${note.archived ? " text-amber-800" : "text-gray-700"}`}
          >
            <IoArchive />
          </button>
          <button
            className={`cursor-pointer text-xl ${note.pinned ? " text-amber-800" : "text-gray-700"}`}
            type="button"
            onClick={() => dispatch({ type: "pinToggled", id: note.id })}
            aria-pressed={note.pinned}
          >
            <TbPinnedFilled />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">{note.title} </h2>
        <p>{note.body}</p>
      </div>
      <div className="w-15 h-15 bg-bg-lighter absolute top-0 left-0 rotate-45 -translate-y-1/2 -translate-x-1/2"></div>

      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <MdOutlineDateRange />
          <div>{note.createdAt}</div>
        </div>
        <button
          onClick={() => dispatch({ type: "removed", id: note.id })}
          className="cursor-pointer hover:text-[red] transition-colors duration-100 ease-in text-red-800"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
