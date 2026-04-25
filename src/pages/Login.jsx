import { useState } from "react";
import { supabase } from "../supabase";
import { CheckCircle, Mail, Lock, ArrowRight } from "lucide-react";

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else setPage("dashboard");
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8faff 0%, #f1f5f9 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <CheckCircle size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>Welcome back</h1>
          <p style={{ color: "#64748b", fontSize: 14, marginTop: 6 }}>Log in to your TaskFlow account</p>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e2e8f0", padding: 36, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 20 }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Email address</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} color="#94a3b8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                style={{ width: "100%", padding: "11px 12px 11px 38px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, boxSizing: "border-box", transition: "border-color 0.2s" }} />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="#94a3b8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                style={{ width: "100%", padding: "11px 12px 11px 38px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, boxSizing: "border-box" }} />
            </div>
          </div>

          <button onClick={handleLogin} disabled={loading} style={{
            width: "100%", background: loading ? "#93c5fd" : "linear-gradient(135deg, #2563eb, #7c3aed)",
            color: "#fff", border: "none", padding: "13px", borderRadius: 10,
            fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
            {loading ? "Logging in..." : <><span>Log in</span><ArrowRight size={17} /></>}
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 14, color: "#64748b", marginTop: 20 }}>
          Don't have an account?{" "}
          <span onClick={() => setPage("signup")} style={{ color: "#2563eb", fontWeight: 700, cursor: "pointer" }}>Sign up free</span>
        </p>
        <p style={{ textAlign: "center", fontSize: 14, color: "#64748b", marginTop: 8 }}>
          <span onClick={() => setPage("landing")} style={{ color: "#94a3b8", cursor: "pointer" }}>← Back to home</span>
        </p>
      </div>
    </div>
  );
}