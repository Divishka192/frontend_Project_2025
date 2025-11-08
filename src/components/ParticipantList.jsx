import React from "react";

export default function ParticipantList({ participants = [], requests = [], onApprove, onRemove }) {
  return (
    <div className="card">
      <h4 className="font-semibold mb-2">Approved Participants</h4>
      {participants.length === 0 ? <div className="empty">No participants yet</div> : (
        <ul className="space-y-2">
          {participants.map((p) => (
            <li key={p.id} className="flex justify-between items-center">
              <div>{p.username}</div>
              <button className="btn-ghost" onClick={() => onRemove(p.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <h4 className="font-semibold mt-4 mb-2">Pending Requests</h4>
      {requests.length === 0 ? <div className="empty">No pending requests</div> : (
        <ul className="space-y-2">
          {requests.map((r) => (
            <li key={r.id} className="flex justify-between items-center">
              <div>{r.username}</div>
              <button className="btn" onClick={() => onApprove(r.id)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}