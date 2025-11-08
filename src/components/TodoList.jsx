import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onRemove }) {
  if (!todos || todos.length === 0) {
    return <div className="empty card">No todos yet — add something to get started.</div>;
  }

  return (
    <div className="list">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={() => onToggle(t.id)} onRemove={() => onRemove(t.id)} />
      ))}
    </div>
  );
}