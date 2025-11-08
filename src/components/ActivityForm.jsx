import React, { useState } from "react";

export default function ActivityForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title) return;
    onCreate({ title, description, date, time });
    setTitle(""); setDescription(""); setDate(""); setTime("");
  }

  return (
    <form onSubmit={submit} className="card mb-4">
      <h3 className="text-lg font-semibold mb-2">Create Activity</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="input" placeholder="Date (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className="input" placeholder="Time (e.g. 15:00)" value={time} onChange={(e) => setTime(e.target.value)} />
        <input className="input" placeholder="Short description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="mt-3 flex gap-2">
        <button className="btn" type="submit">Create</button>
      </div>
    </form>
  );
}