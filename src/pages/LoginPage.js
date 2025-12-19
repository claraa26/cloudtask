import React from "react";

export default function LoginPage({
  workspaceName,
  setWorkspaceName,
  email,
  setEmail,
  password,
  setPassword,
  onLogin,
  onRegister,
  error,
}) {
  return (
    <div className="container">
      <h2>CloudTask</h2>

      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label>Workspace Name</label>
        <input
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          placeholder="e.g. team-a"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@mail.com"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />
      </div>

      <div className="actions">
        <button className="primary" onClick={onRegister}>
          Register
        </button>
        <button className="secondary" onClick={onLogin}>
          Login
        </button>
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: "#6b7280" }}>
        Register akan membuat workspace baru dan user admin.
      </p>
    </div>
  );
}
