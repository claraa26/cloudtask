import React, { useEffect, useState } from "react";
import API from "../api";

export default function TaskPage({ workspaceName, onLogout }) {
  // ===== TASK STATE =====
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [deadline, setDeadline] = useState("");
  const [err, setErr] = useState("");

  // ===== LOAD TASKS =====
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (e) {
      console.error(e);
      setErr("Failed load tasks");
    }
  }

  // ===== ADD TASK =====
  async function addTask() {
    if (!title.trim()) return;

    try {
      await API.post("/tasks", {
        title,
        notes,
        priority,
        deadline,
      });

      setTitle("");
      setNotes("");
      setDeadline("");
      loadTasks();
    } catch (e) {
      console.error(e);
      setErr("Add task failed");
    }
  }

  // ===== TOGGLE DONE =====
  async function toggleDone(task) {
    try {
      await API.patch(`/tasks/${task.id}`, {
        is_done: !task.is_done,
      });
      loadTasks();
    } catch (e) {
      console.error(e);
      setErr("Update task failed");
    }
  }

  // ===== DELETE TASK =====
  async function deleteTask(task) {
    try {
      await API.delete(`/tasks/${task.id}`);
      loadTasks();
    } catch (e) {
      console.error(e);
      setErr("Delete task failed");
    }
  }

  return (
    <div className="container">
      <h2>CloudTask</h2>

      {err && <div className="error">{err}</div>}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>
          Workspace: <b>{workspaceName}</b>
        </p>
        <button className="secondary" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="form-group">
        <input
          placeholder="New task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Add note (optional)..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "14px",
            fontFamily: "inherit",
            resize: "vertical"
          }}
        />
      </div>

      <div className="actions">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <button type="button" className="primary" onClick={addTask}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div style={{ flex: 1 }}>
              <strong
                style={{
                  textDecoration: task.is_done ? "line-through" : "none",
                }}
              >
                {task.title}
              </strong>
              {task.notes && (
                <div style={{ fontSize: 13, color: "#4b5563", marginTop: 4 }}>
                  {task.notes}
                </div>
              )}
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
                Priority: {task.priority}
                {task.deadline
                  ? ` | Deadline: ${new Date(
                      task.deadline
                    ).toLocaleDateString()}`
                  : ""}
              </div>
            </div>

            <div className="actions">
              {!task.is_done && (
                <button
                  className="secondary"
                  onClick={() => toggleDone(task)}
                >
                  Toggle
                </button>
              )}
              <button
                className="secondary"
                onClick={() => deleteTask(task)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}