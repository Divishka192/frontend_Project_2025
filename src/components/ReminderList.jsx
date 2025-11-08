import React from "react";

export default function ReminderList({ reminders = [] }) {
  if (!reminders || reminders.length === 0) return <div className="empty">No reminders scheduled</div>;
  return (
    <div className="card">
      <h4 className="font-semibold mb-2">Reminders</h4>
      <ul className="space-y-2">
        {reminders.map((r) => (
          <li key={r.id} className="flex justify-between items-center">
            <div>
              <div className="font-medium">{new Date(r.datetime).toLocaleString()}</div>
              <div className="small">{r.message}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}