import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import API, { setAuthToken } from "./api";
import "./style.css";

import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";

export default function App() {
  // ===== AUTH STATE =====
  const [workspaceName, setWorkspaceName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [error, setError] = useState("");

  const isAuth = !!token;

  // ===== SET TOKEN ON LOAD =====
  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  // ===== REGISTER =====
  async function register() {
    setError("");
    try {
      await API.post("/auth/register", {
        workspaceName,
        email,
        password,
      });
      setError("Register success, please login");
    } catch (e) {
      setError(e?.response?.data?.error || "Register failed");
    }
  }

  // ===== LOGIN =====
  async function login() {
    setError("");
    try {
      const res = await API.post("/auth/login", {
        workspaceName,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (e) {
      setError(e?.response?.data?.error || "Login failed");
    }
  }

  // ===== LOGOUT =====
  function logout() {
    localStorage.removeItem("token");
    setAuthToken(null);
    setToken("");
  }

  return (
    <BrowserRouter>
      <Navbar isAuth={isAuth} onLogout={logout} />

      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            isAuth ? (
              <Navigate to="/tasks" />
            ) : (
              <LoginPage
                workspaceName={workspaceName}
                setWorkspaceName={setWorkspaceName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onLogin={login}
                onRegister={register}
                error={error}
              />
            )
          }
        />

        {/* TASKS (PROTECTED) */}
        <Route
          path="/tasks"
          element={
            isAuth ? (
              <TaskPage
                workspaceName={workspaceName}
                onLogout={logout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ABOUT */}
        <Route path="/about" element={<AboutPage />} />

        {/* DEFAULT */}
        <Route
          path="*"
          element={<Navigate to={isAuth ? "/tasks" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
