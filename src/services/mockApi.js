// A small mock service that stores activities and requests in localStorage.
// This simulates backend behavior: create activity, join requests, approvals, reminders.

const STORAGE_KEY = "ea_data_v1";

// default seed
const DEFAULT = {
  activities: [
    // sample
  ],
  announcements: []
};

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT));
      return JSON.parse(JSON.stringify(DEFAULT));
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error(e);
    return JSON.parse(JSON.stringify(DEFAULT));
  }
}

function writeStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function ensure() {
  const s = readStore();
  if (!s.activities) s.activities = [];
  if (!s.announcements) s.announcements = [];
  writeStore(s);
  return s;
}

function generateId() {
  return String(Date.now()) + Math.random().toString(36).slice(2, 7);
}

export const mockApi = {
  login: async ({ username, role }) => {
    // simple
    return { id: generateId(), username: username || (role === "teacher" ? "teacher" : "student"), role };
  },

  listActivities: async () => {
    const s = ensure();
    return s.activities;
  },

  getActivity: async (id) => {
    const s = ensure();
    return s.activities.find((a) => a.id === id) || null;
  },

  createActivity: async ({ title, description, date, time }) => {
    const s = ensure();
    const activity = {
      id: generateId(),
      title,
      description,
      date,
      time,
      participants: [], // approved participants: array of {id, username}
      requests: [], // pending join requests: array of {id, username}
      reminders: [], // {id, datetime, message}
      createdAt: new Date().toISOString()
    };
    s.activities.unshift(activity);
    writeStore(s);
    return activity;
  },

  requestJoin: async ({ activityId, student }) => {
    const s = ensure();
    const a = s.activities.find((x) => x.id === activityId);
    if (!a) throw new Error("Activity not found");
    // if already participant or requested, ignore
    if (a.participants.find((p) => p.id === student.id)) return a;
    if (a.requests.find((r) => r.id === student.id)) return a;
    a.requests.push({ id: student.id, username: student.username, requestedAt: new Date().toISOString() });
    writeStore(s);
    return a;
  },

  approveParticipant: async ({ activityId, studentId }) => {
    const s = ensure();
    const a = s.activities.find((x) => x.id === activityId);
    if (!a) throw new Error("Activity not found");
    const reqIndex = a.requests.findIndex((r) => r.id === studentId);
    if (reqIndex >= 0) {
      const [r] = a.requests.splice(reqIndex, 1);
      a.participants.push({ id: r.id, username: r.username, joinedAt: new Date().toISOString() });
      writeStore(s);
    }
    return a;
  },

  removeParticipant: async ({ activityId, studentId }) => {
    const s = ensure();
    const a = s.activities.find((x) => x.id === activityId);
    if (!a) throw new Error("Activity not found");
    a.participants = a.participants.filter((p) => p.id !== studentId);
    writeStore(s);
    return a;
  },

  scheduleReminder: async ({ activityId, datetime, message }) => {
    const s = ensure();
    const a = s.activities.find((x) => x.id === activityId);
    if (!a) throw new Error("Activity not found");
    const rem = { id: generateId(), datetime, message };
    a.reminders.push(rem);
    writeStore(s);
    return rem;
  },

  sendAnnouncement: async ({ activityId, message }) => {
    const s = ensure();
    const a = s.activities.find((x) => x.id === activityId);
    if (!a) throw new Error("Activity not found");
    const ann = { id: generateId(), activityId, message, createdAt: new Date().toISOString() };
    s.announcements.unshift(ann);
    writeStore(s);
    return ann;
  },

  listAnnouncements: async () => {
    const s = ensure();
    return s.announcements;
  }
};