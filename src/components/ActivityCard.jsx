import React from "react";
import { Link } from "react-router-dom";

export default function ActivityCard({ activity, onRequest, isStudent }) {
  return (
    <div className="card mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{activity.title}</h3>
          <div className="small">{activity.date} · {activity.time}</div>
          <p className="mt-2 text-slate-200">{activity.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link to={`/activity/${activity.id}`} className="btn-ghost">Details</Link>
          {isStudent && (
            <button onClick={() => onRequest(activity.id)} className="btn">Request Join</button>
          )}
        </div>
      </div>
      <div className="mt-3 small">Participants: {activity.participants?.length || 0} | Requests: {activity.requests?.length || 0}</div>
    </div>
  );
}