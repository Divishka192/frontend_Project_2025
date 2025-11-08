import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("student");
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const u = await login({ username: username || undefined, role });
    if (u.role === "teacher") nav("/teacher");
    else nav("/student");
  }

  return (
    <div className="container max-w-xl">
      <div className="card">
        <h2 className="text-2xl font-bold mb-2">Login</h2>
        <p className="small mb-4">Choose a role to simulate Teacher or Student session.</p>
        <form onSubmit={submit} className="space-y-3">
          <input className="input" placeholder="Display name (optional)" value={username} onChange={(e) => setUsername(e.target.value)} />
          <div className="flex gap-3 items-center">
            <label className="small">Role</label>
            <select className="input w-48" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="btn" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}