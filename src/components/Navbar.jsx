import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  function doLogout() {
    logout();
    nav("/login");
  }

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-bold">
            Extracurricular
          </Link>
          <div className="small">Maintainer</div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="small">Hi, {user.username} ({user.role})</div>
              {user.role === "teacher" ? (
                <Link to="/teacher" className="btn-ghost">Teacher</Link>
              ) : (
                <Link to="/student" className="btn-ghost">Student</Link>
              )}
              <button onClick={doLogout} className="btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}