import React, { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e.preventDefault();
    onAdd(value);
    setValue("");
  }

  return (
    <form className="input" onSubmit={submit}>
      <input
        placeholder="Add a new todo…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn" type="submit">Add</button>
    </form>
  );
}
