import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { mockApi } from "../services/mockApi";
import { AuthContext } from "../context/AuthContext";
import ParticipantList from "../components/ParticipantList";
import ReminderList from "../components/ReminderList";

export default function ActivityDetails() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const { user } = useContext(AuthContext);

  async function load() {
    const a = await mockApi.getActivity(id);
    setActivity(a);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [id]);

  if (!activity) return <div className="empty card">Activity not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">{activity.title}</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="card mb-3">
            <div className="small">{activity.date} · {activity.time}</div>
            <p className="mt-2">{activity.description}</p>
          </div>

          <ReminderList reminders={activity.reminders} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Participation</h3>
          <ParticipantList participants={activity.participants} requests={activity.requests} onApprove={() => {}} onRemove={() => {}} />
        </div>
      </div>
    </div>
  );
}