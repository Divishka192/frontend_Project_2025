import React from "react";

export default function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <div className={`todo ${todo.done ? "completed" : ""}`}>
      <div className="checkbox" onClick={onToggle}>
        {todo.done ? "✓" : ""}
      </div>
      <div className="text">{todo.text}</div>
      <button className="btn" onClick={onRemove}>Remove</button>
    </div>
  );
}