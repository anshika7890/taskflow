import { useState } from "react";
import { CheckCircle, Zap, Shield, BarChart3, ArrowRight, Star } from "lucide-react";

export default function LandingPage({ setPage }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ fontFamily: "inherit", background: "#fff", minHeight: "100vh" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 60px", height: 68, borderBottom: "1px solid #f1f5f9", background: "rgba(255,255,255,0.95)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #2563eb, #7c3aed)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircle size={18} color="#fff" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>TaskFlow</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setPage("login")} style={{ background: "transparent", color: "#64748b", border: "none", padding: "8px 18px", borderRadius: 8, fontSize: 14, fontWeight: 500 }}>Log in</button>
          <button onClick={() => setPage("signup")} style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", color: "#fff", border: "none", padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600 }}>Get started free →</button>
        </div>
      </nav>
      <div style={{ textAlign: "center", padding: "90px 20px 80px", background: "linear-gradient(180deg, #f8faff 0%, #fff 100%)" }}>
        <h1 style={{ fontSize: 58, fontWeight: 900, color: "#0f172a", margin: "0 0 20px", lineHeight: 1.05, letterSpacing: "-2px", maxWidth: 700, marginLeft: "auto", marginRight: "auto" }}>
          Manage tasks.<br />
          <span style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ship faster.</span>
        </h1>
        <p style={{ fontSize: 19, color: "#64748b", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.6 }}>The modern task manager built for developers and teams who want to move fast and stay organised.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => setPage("signup")} style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>Start for free <ArrowRight size={18} /></button>
          <button onClick={() => setPage("login")} style={{ background: "#fff", color: "#0f172a", border: "1.5px solid #e2e8f0", padding: "14px 32px", borderRadius: 10, fontSize: 16, fontWeight: 600 }}>Log in</button>
        </div>
        <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 16 }}>No credit card required • Free forever</p>
      </div>
      <div style={{ background: "#0f172a", padding: "28px 60px", display: "flex", justifyContent: "center", gap: 80 }}>
        {[["10,000+", "Active users"], ["99.9%", "Uptime"], ["4.9/5", "User rating"], ["Free", "Forever plan"]].map(([val, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>{val}</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "80px 60px", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Features</div>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: "#0f172a", letterSpacing: "-1px" }}>Everything you need to stay productive</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 960, margin: "0 auto" }}>
          {[
            { icon: <CheckCircle size={24} color="#2563eb" />, title: "Smart Task Tracking", desc: "Create, complete and organise tasks with a single click. Real-time updates keep your team in sync.", bg: "#eff6ff" },
            { icon: <BarChart3 size={24} color="#7c3aed" />, title: "Progress Analytics", desc: "Visualise your productivity with beautiful stats. Know exactly how much you have accomplished.", bg: "#f5f3ff" },
            { icon: <Shield size={24} color="#059669" />, title: "Secure and Private", desc: "Row-level security ensures each user only sees their own data. Your work stays yours.", bg: "#ecfdf5" },
            { icon: <Zap size={24} color="#d97706" />, title: "Lightning Fast", desc: "Built on Supabase and React. Instant updates with no page reloads, ever.", bg: "#fffbeb" },
            { icon: <Star size={24} color="#db2777" />, title: "Beautiful UI", desc: "Designed with care. A clean, modern interface that is a joy to use every single day.", bg: "#fdf2f8" },
            { icon: <ArrowRight size={24} color="#0891b2" />, title: "Always Improving", desc: "New features shipped regularly. We listen to users and build what matters most.", bg: "#ecfeff" },
          ].map((f, i) => (
            <div key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ padding: 28, borderRadius: 16, border: "1px solid #f1f5f9", background: hovered === i ? f.bg : "#fafafa", transition: "all 0.2s", transform: hovered === i ? "translateY(-2px)" : "none" }}>
              <div style={{ width: 44, height: 44, background: f.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #1e3a8a 100%)", padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: 38, fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-1px" }}>Ready to get organised?</h2>
        <p style={{ fontSize: 17, color: "#94a3b8", marginBottom: 32 }}>Join thousands of productive people using TaskFlow today.</p>
        <button onClick={() => setPage("signup")} style={{ background: "#fff", color: "#1e3a8a", border: "none", padding: "15px 40px", borderRadius: 10, fontSize: 16, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 8 }}>
          Get started for free <ArrowRight size={18} />
        </button>
      </div>
      <div style={{ background: "#0f172a", padding: "24px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#64748b", fontSize: 14, fontWeight: 600 }}>TaskFlow</span>
        <span style={{ color: "#334155", fontSize: 13 }}>2025 TaskFlow. Built with React and Supabase.</span>
      </div>
    </div>
  );
}
