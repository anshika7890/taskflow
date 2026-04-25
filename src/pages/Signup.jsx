import { useState } from "react";
import { supabase } from "../supabase";
import { CheckCircle, Mail, Lock, ArrowRight } from "lucide-react";

export default function Signup({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setSuccess(true);
    setLoading(false);
  };

  if (success) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8faff 0%, #f1f5f9 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", padding: 48, borderRadius: 20, border: "1px solid #e2e8f0", maxWidth: 420, textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <div style={{ width: 64, height: 64, background: "#ecfdf5", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Mail size={28} color="#059669" />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 10 }}>Check your inbox!</h2>
        <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.6 }}>We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
        <button onClick={() => setPage("login")} style={{ marginTop: 28, background: "linear-gradient(135deg, #2563eb, #7c3aed)", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15 }}>Go to Login →</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8faff 0%, #f1f5f9 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <CheckCircle size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>Create your account</h1>
          <p style={{ color: "#64748b", fontSize: 14, marginTop: 6 }}>Free forever. No credit card needed.</p>
        </div>

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
                onKeyDown={e => e.key === "Enter" && handleSignup()}
                style={{ width: "100%", padding: "11px 12px 11px 38px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="#94a3b8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input type="password" placeholder="Min 6 characters" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSignup()}
                style={{ width: "100%", padding: "11px 12px 11px 38px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, boxSizing: "border-box" }} />
            </div>
          </div>

          <button onClick={handleSignup} disabled={loading} style={{
            width: "100%", background: loading ? "#93c5fd" : "linear-gradient(135deg, #2563eb, #7c3aed)",
            color: "#fff", border: "none", padding: "13px", borderRadius: 10,
            fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8
          }}>
            {loading ? "Creating account..." : <><span>Create account</span><ArrowRight size={17} /></>}
          </button>

          <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 16 }}>
            By signing up you agree to our Terms of Service.
          </p>
        </div>

        <p style={{ textAlign: "center", fontSize: 14, color: "#64748b", marginTop: 20 }}>
          Already have an account?{" "}
          <span onClick={() => setPage("login")} style={{ color: "#2563eb", fontWeight: 700, cursor: "pointer" }}>Log in</span>
        </p>
      </div>
    </div>
  );
}