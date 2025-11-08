import React, { useEffect, useState, useContext } from "react";
import ActivityForm from "../components/ActivityForm";
import ParticipantList from "../components/ParticipantList";
import ReminderList from "../components/ReminderList";
import { mockApi } from "../services/mockApi";
import { AuthContext } from "../context/AuthContext";
import ActivityCard from "../components/ActivityCard";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const [activities, setActivities] = useState([]);
  const [selected, setSelected] = useState(null);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  async function load() {
    const list = await mockApi.listActivities();
    setActivities(list);
  }

  useEffect(() => {
    load();
  }, []);

  async function createActivity(payload) {
    await mockApi.createActivity(payload);
    await load();
  }

  async function approve(activityId, studentId) {
    await mockApi.approveParticipant({ activityId, studentId });
    await load();
  }

  async function remove(activityId, studentId) {
    await mockApi.removeParticipant({ activityId, studentId });
    await load();
  }

  async function scheduleReminder(activityId) {
    const datetime = prompt("Enter date & time (ISO or YYYY-MM-DDTHH:MM):", new Date().toISOString().slice(0, 16));
    if (!datetime) return;
    const message = prompt("Reminder message:", "Don't forget!");
    if (!message) return;
    await mockApi.scheduleReminder({ activityId, datetime, message });
    await load();
  }

  async function announce(activityId) {
    const message = prompt("Announcement message:");
    if (!message) return;
    await mockApi.sendAnnouncement({ activityId, message });
    alert("Announcement scheduled");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

      <ActivityForm onCreate={createActivity} />

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">All Activities</h2>
          {activities.length === 0 ? <div className="empty card">No activities yet</div> : activities.map((a) => (
            <div key={a.id} className="card mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <div className="small">{a.date} · {a.time}</div>
                  <p className="mt-2 text-slate-200">{a.description}</p>
                  <div className="mt-2 small">Participants: {a.participants.length} | Requests: {a.requests.length}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="btn" onClick={() => { setSelected(a); }}>Manage</button>
                  <button className="btn-ghost" onClick={() => nav(`/activity/${a.id}`)}>Details</button>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn-ghost" onClick={() => scheduleReminder(a.id)}>Schedule Reminder</button>
                <button className="btn-ghost" onClick={() => announce(a.id)}>Send Announcement</button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Selected Activity</h2>
          {selected ? (
            <div>
              <div className="card mb-3">
                <h3 className="text-lg font-semibold">{selected.title}</h3>
                <p className="small">{selected.date} · {selected.time}</p>
                <p className="mt-2">{selected.description}</p>
              </div>

              <ParticipantList
                participants={selected.participants}
                requests={selected.requests}
                onApprove={(id) => approve(selected.id, id)}
                onRemove={(id) => remove(selected.id, id)}
              />

              <div className="mt-3">
                <ReminderList reminders={selected.reminders} />
              </div>
            </div>
          ) : (
            <div className="empty card">Select an activity to manage participants & reminders</div>
          )}
        </div>
      </div>
    </div>
  );
}