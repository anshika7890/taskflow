import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { CheckCircle, Circle, Trash2, Plus, LogOut, LayoutDashboard, BarChart3, Settings, Star } from "lucide-react";

export default function Dashboard({ setPage }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("medium");
  const [activeNav, setActiveNav] = useState("tasks");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { setPage("login"); return; }
      setUser(data.user);
      fetchTasks(data.user.id);
    });
  }, []);

  const fetchTasks = async (userId) => {
    const { data } = await supabase.from("tasks").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    setTasks(data || []); setLoading(false);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    const { data } = await supabase.from("tasks").insert([{ title: newTask, status: "todo", user_id: user.id, priority }]).select();
    setTasks([data[0], ...tasks]); setNewTask("");
  };

  const toggleTask = async (task) => {
    const newStatus = task.status === "done" ? "todo" : "done";
    await supabase.from("tasks").update({ status: newStatus }).eq("id", task.id);
    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = async (id) => {
    await supabase.from("tasks").delete().eq("id", id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleLogout = async () => { await supabase.auth.signOut(); setPage("landing"); };

  const done = tasks.filter(t => t.status === "done").length;
  const todo = tasks.filter(t => t.status === "todo").length;
  const percent = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0;

  const filtered = tasks.filter(t => {
    if (filter === "todo") return t.status === "todo";
    if (filter === "done") return t.status === "done";
    return true;
  });

  const priorityColor = { high: "#ef4444", medium: "#f59e0b", low: "#10b981" };
  const priorityBg = { high: "#fef2f2", medium: "#fffbeb", low: "#ecfdf5" };

  const initials = user?.email?.slice(0, 2).toUpperCase();

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f8fafc" }}>

      {/* ── SIDEBAR ── */}
      <div style={{ width: 260, background: "#0f172a", display: "flex", flexDirection: "column", flexShrink: 0 }}>

        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>TaskFlow</div>
              <div style={{ fontSize: 11, color: "#475569" }}>Workspace</div>
            </div>
          </div>
        </div>

        {/* Progress card */}
        <div style={{ margin: 16, background: "linear-gradient(135deg, #1e3a8a, #312e81)", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, color: "#93c5fd", fontWeight: 600, marginBottom: 8 }}>Today's Progress</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>{percent}%</div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 4, height: 6 }}>
            <div style={{ width: `${percent}%`, background: "linear-gradient(90deg, #60a5fa, #a78bfa)", borderRadius: 4, height: 6, transition: "width 0.5s" }} />
          </div>
          <div style={{ fontSize: 11, color: "#93c5fd", marginTop: 8 }}>{done} of {tasks.length} tasks completed</div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "8px 12px", flex: 1 }}>
          {[
            { id: "tasks", icon: <LayoutDashboard size={17} />, label: "My Tasks" },
            { id: "stats", icon: <BarChart3 size={17} />, label: "Analytics" },
            { id: "settings", icon: <Settings size={17} />, label: "Settings" },
          ].map(item => (
            <div key={item.id} onClick={() => setActiveNav(item.id)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
              borderRadius: 8, marginBottom: 2, cursor: "pointer", transition: "all 0.15s",
              background: activeNav === item.id ? "rgba(37,99,235,0.2)" : "transparent",
              color: activeNav === item.id ? "#60a5fa" : "#64748b",
              border: activeNav === item.id ? "1px solid rgba(37,99,235,0.3)" : "1px solid transparent"
            }}>
              {item.icon}
              <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: 16, borderTop: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 34, height: 34, background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
              {initials}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email}</div>
              <div style={{ fontSize: 11, color: "#475569" }}>Free plan</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ width: "100%", background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", padding: "8px", borderRadius: 8, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <LogOut size={14} /> Log out
          </button>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Topbar */}
        <div style={{ height: 68, background: "#fff", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", flexShrink: 0 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.3px" }}>
              {activeNav === "tasks" ? "My Tasks" : activeNav === "stats" ? "Analytics" : "Settings"}
            </h1>
            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              <Star size={11} fill="#15803d" /> Pro features enabled
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: 28 }}>

          {activeNav === "tasks" && (
            <>
              {/* Stat cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                {[
                  { label: "Total Tasks", value: tasks.length, color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
                  { label: "To Do", value: todo, color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
                  { label: "Completed", value: done, color: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
                  { label: "Completion", value: percent + "%", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
                ].map(card => (
                  <div key={card.label} style={{ background: card.bg, border: `1px solid ${card.border}`, borderRadius: 14, padding: "18px 20px" }}>
                    <div style={{ fontSize: 12, color: card.color, fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{card.label}</div>
                    <div style={{ fontSize: 30, fontWeight: 900, color: card.color }}>{card.value}</div>
                  </div>
                ))}
              </div>

              {/* Add task */}
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 14 }}>Add New Task</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()}
                    placeholder="What needs to be done?"
                    style={{ flex: 1, padding: "11px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14 }} />
                  <select value={priority} onChange={e => setPriority(e.target.value)}
                    style={{ padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 13, fontWeight: 600, background: "#fff", color: priorityColor[priority] }}>
                    <option value="high">🔴 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                  </select>
                  <button onClick={addTask} style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", color: "#fff", border: "none", padding: "11px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                    <Plus size={17} /> Add
                  </button>
                </div>
              </div>

              {/* Filter tabs */}
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {[["all", "All Tasks"], ["todo", "To Do"], ["done", "Completed"]].map(([val, label]) => (
                  <button key={val} onClick={() => setFilter(val)} style={{
                    padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none",
                    background: filter === val ? "#2563eb" : "#f1f5f9",
                    color: filter === val ? "#fff" : "#64748b"
                  }}>{label}</button>
                ))}
              </div>

              {/* Task list */}
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", overflow: "hidden" }}>
                {loading ? (
                  <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Loading your tasks...</div>
                ) : filtered.length === 0 ? (
                  <div style={{ padding: 60, textAlign: "center" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>
                      {filter === "done" ? "No completed tasks yet" : "No tasks yet"}
                    </div>
                    <div style={{ fontSize: 14, color: "#94a3b8" }}>
                      {filter === "all" ? "Add your first task above to get started!" : "Switch filters to see other tasks."}
                    </div>
                  </div>
                ) : filtered.map((task, i) => (
                  <div key={task.id} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "14px 20px",
                    borderBottom: i < filtered.length - 1 ? "1px solid #f8fafc" : "none",
                    background: task.status === "done" ? "#fafafa" : "#fff",
                    transition: "background 0.15s"
                  }}>
                    <button onClick={() => toggleTask(task)} style={{ background: "none", border: "none", padding: 0, display: "flex", flexShrink: 0 }}>
                      {task.status === "done"
                        ? <CheckCircle size={22} color="#2563eb" fill="#eff6ff" />
                        : <Circle size={22} color="#cbd5e1" />}
                    </button>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: task.status === "done" ? "#94a3b8" : "#0f172a", textDecoration: task.status === "done" ? "line-through" : "none" }}>
                      {task.title}
                    </span>
                    {task.priority && (
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: priorityBg[task.priority] || "#f1f5f9", color: priorityColor[task.priority] || "#64748b", textTransform: "capitalize" }}>
                        {task.priority}
                      </span>
                    )}
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: task.status === "done" ? "#ecfdf5" : "#fffbeb", color: task.status === "done" ? "#059669" : "#d97706" }}>
                      {task.status === "done" ? "Done" : "To Do"}
                    </span>
                    <button onClick={() => deleteTask(task.id)} style={{ background: "none", border: "none", color: "#cbd5e1", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex" }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeNav === "stats" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: 28 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>Task Breakdown</div>
                {[{ label: "Completed", value: done, color: "#059669", total: tasks.length }, { label: "Pending", value: todo, color: "#d97706", total: tasks.length }].map(item => (
                  <div key={item.label} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, color: "#0f172a" }}>{item.label}</span>
                      <span style={{ color: item.color, fontWeight: 700 }}>{item.value}</span>
                    </div>
                    <div style={{ background: "#f1f5f9", borderRadius: 4, height: 8 }}>
                      <div style={{ width: item.total > 0 ? `${(item.value / item.total) * 100}%` : "0%", background: item.color, borderRadius: 4, height: 8, transition: "width 0.5s" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: 28 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>Summary</div>
                {[{ label: "Total created", val: tasks.length }, { label: "Completed", val: done }, { label: "Completion rate", val: percent + "%" }, { label: "Pending", val: todo }].map(item => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f8fafc" }}>
                    <span style={{ fontSize: 13, color: "#64748b" }}>{item.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === "settings" && (
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f1f5f9", padding: 32, maxWidth: 500 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>Account Settings</div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 20, background: "#f8fafc", borderRadius: 12, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fff" }}>{initials}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{user?.email}</div>
                  <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Free plan • Member since today</div>
                </div>
              </div>
              <button onClick={handleLogout} style={{ width: "100%", background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <LogOut size={16} /> Sign out of TaskFlow
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}