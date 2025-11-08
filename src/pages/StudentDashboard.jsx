import React, { useEffect, useState, useContext } from "react";
import ActivityCard from "../components/ActivityCard";
import ReminderList from "../components/ReminderList";
import { mockApi } from "../services/mockApi";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [activities, setActivities] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const { user } = useContext(AuthContext);

  async function load() {
    const list = await mockApi.listActivities();
    setActivities(list);
    const anns = await mockApi.listAnnouncements();
    setAnnouncements(anns);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  async function requestJoin(activityId) {
    if (!user) return;
    await mockApi.requestJoin({ activityId, student: { id: user.id, username: user.username } });
    alert("Requested to join — waiting for teacher approval.");
    await load();
  }

  // collect upcoming reminders relevant to student (for now: all reminders from activities where student is participant)
  function collectReminders() {
    const items = [];
    activities.forEach((a) => {
      const participant = a.participants?.find((p) => p.id === user.id);
      if (participant && a.reminders) {
        a.reminders.forEach((r) => items.push({ ...r, activityTitle: a.title }));
      }
    });
    // sort by datetime
    items.sort((x, y) => new Date(x.datetime) - new Date(y.datetime));
    return items;
  }

  const myReminders = collectReminders();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <div>
          <Link to="/activity" className="btn-ghost small">Browse all</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Available Activities</h2>
          {activities.length === 0 ? <div className="empty card">No activities available</div> : activities.map((a) => (
            <ActivityCard key={a.id} activity={a} onRequest={requestJoin} isStudent={true} />
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Reminders</h2>
          {myReminders.length === 0 ? <div className="empty card">No upcoming reminders</div> : (
            <div className="card">
              {myReminders.map((r) => (
                <div key={r.id} className="mb-3">
                  <div className="font-medium">{new Date(r.datetime).toLocaleString()}</div>
                  <div className="small">{r.message}</div>
                </div>
              ))}
            </div>
          )}

          <h2 className="text-lg font-semibold mt-4 mb-2">Announcements</h2>
          {announcements.length === 0 ? <div className="empty card">No announcements</div> : (
            <div className="card">
              {announcements.map((a) => (
                <div key={a.id} className="mb-3">
                  <div className="small">{new Date(a.createdAt).toLocaleString()}</div>
                  <div>{a.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}