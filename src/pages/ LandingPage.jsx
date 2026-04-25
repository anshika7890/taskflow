export default function LandingPage({ setPage }) {
  return (
    <div style={{ fontFamily: "sans-serif", margin: 0, padding: 0 }}>

      {/* Navbar */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 40px", borderBottom: "1px solid #eee", background: "#fff"
      }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: "#2563eb" }}>TaskFlow</span>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => setPage("login")} style={outlineBtn}>Log in</button>
          <button onClick={() => setPage("signup")} style={primaryBtn}>Get Started Free</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        textAlign: "center", padding: "80px 20px 60px",
        background: "linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)"
      }}>
        <div style={{
          display: "inline-block", background: "#dbeafe", color: "#1d4ed8",
          fontSize: 13, fontWeight: 600, padding: "4px 14px",
          borderRadius: 20, marginBottom: 20
        }}>
          Free to use — no credit card required
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: "#0f172a", margin: "0 0 20px", lineHeight: 1.1 }}>
          Manage your tasks<br />
          <span style={{ color: "#2563eb" }}>like a pro</span>
        </h1>
        <p style={{ fontSize: 18, color: "#64748b", maxWidth: 500, margin: "0 auto 36px" }}>
          TaskFlow helps you organize work, track progress, and get more done every single day.
        </p>
        <button onClick={() => setPage("signup")} style={{
          ...primaryBtn, fontSize: 17, padding: "14px 36px", borderRadius: 10
        }}>
          Start for free →
        </button>
      </div>

      {/* Features */}
      <div style={{ padding: "60px 40px", background: "#fff" }}>
        <h2 style={{ textAlign: "center", fontSize: 30, fontWeight: 700, marginBottom: 40, color: "#0f172a" }}>
          Everything you need
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 860, margin: "0 auto" }}>
          {[
            { icon: "✅", title: "Track Tasks", desc: "Create and complete tasks with one click. Stay on top of everything." },
            { icon: "📊", title: "See Progress", desc: "Watch your productivity grow with clear stats and indicators." },
            { icon: "🔒", title: "Private & Secure", desc: "Your data is yours only. Each user sees only their own tasks." },
          ].map(f => (
            <div key={f.title} style={{
              padding: 28, borderRadius: 12,
              border: "1px solid #e2e8f0", background: "#fafafa"
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#2563eb", color: "#fff", textAlign: "center", padding: "60px 20px" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 16px" }}>Ready to get organised?</h2>
        <p style={{ fontSize: 16, opacity: 0.85, marginBottom: 28 }}>Join thousands who trust TaskFlow daily.</p>
        <button onClick={() => setPage("signup")} style={{
          background: "#fff", color: "#2563eb", border: "none",
          padding: "14px 36px", borderRadius: 10, fontSize: 16, fontWeight: 700, cursor: "pointer"
        }}>
          Get started — it's free
        </button>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "24px", color: "#94a3b8", fontSize: 13 }}>
        © 2025 TaskFlow. Built with React & Supabase.
      </div>
    </div>
  );
}

const primaryBtn = {
  background: "#2563eb", color: "#fff", border: "none",
  padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer"
};
const outlineBtn = {
  background: "transparent", color: "#2563eb", border: "1px solid #2563eb",
  padding: "10px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer"
};