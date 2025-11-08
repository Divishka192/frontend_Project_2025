import React, { createContext, useEffect, useState } from "react";
import { mockApi } from "../services/mockApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // try to load session from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("ea_session");
    if (raw) {
      setUser(JSON.parse(raw));
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("ea_session", JSON.stringify(user));
    else localStorage.removeItem("ea_session");
  }, [user]);

  async function login({ username, role }) {
    // mock validation
    const u = await mockApi.login({ username, role });
    setUser(u);
    return u;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}