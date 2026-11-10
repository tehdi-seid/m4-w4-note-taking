import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { TiEdit } from "react-icons/ti";
import { useNotes } from "../hook/useNotes";

function AddNote() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notes, addNote] = useNotes();

  function titleHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
    console.log(title);
  }

  function bodyHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.currentTarget.value);
    console.log(body);
  }

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    addNote({ title, body });
    console.log(notes);
  }

  return (
    <form
      className="border p-5 rounded-2xl flex flex-col gap-5 h-max md:fixed md:w-80 top-25"
      onSubmit={(e) => submitHandler(e)}
    >
      <h1 className="text-3xl capitalize text-center">add notes here</h1>

      <label className="flex flex-col capitalize">
        title:
        <input
          value={title}
          type="text"
          onChange={(e) => titleHandler(e)}
          className="border-0 outline-0 px-4 capitalize bg-bg-lighter py-2 rounded-lg"
        />
      </label>
      <label className="flex flex-col capitalize">
        title:
        <textarea
          value={body}
          onChange={(e) => bodyHandler(e)}
          className="border-0 outline-0 px-4 capitalize bg-bg-lighter py-2 rounded-lg max-w-full h-60 resize-none scrollbar-thumb-text-lighter"
        ></textarea>
      </label>
      <button
        type="submit"
        className="bg-[hsl(226,100%,20%)] py-2 cursor-pointer self-cente"
      >
        Add
      </button>
    </form>
  );
}

export default AddNote;
