import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const FEATURES = [
  { key: "resume",    title: "Resume Upload",        desc: "AI-powered resume analysis & improvement tips",    icon: "📄", path: "/upload",    color: "#58a6ff" },
  { key: "prep",      title: "Placement Prep",       desc: "Topic-wise structured study plans for campus",     icon: "📚", path: "/prep",      color: "#c084fc" },
  { key: "mock",      title: "Mock Interview",       desc: "Practice with real questions, instant feedback",   icon: "🎤", path: "/mock",      color: "#ff6b6b" },
  { key: "progress",  title: "Progress Tracker",     desc: "Visualize your preparation with analytics",        icon: "📊", path: "/progress",  color: "#ff9f43" },
  { key: "career",    title: "Career Guidance",      desc: "Personalized career advice from industry mentors", icon: "🚀", path: "/career",    color: "#00d68f" },
  { key: "community", title: "Student Community",    desc: "Connect & grow with 500+ placement aspirants",     icon: "👥", path: "/community", color: "#00d4ff" },
];

const TIPS = [
  "Solve 2 DSA problems daily — consistency beats intensity.",
  "Practice mock interviews out loud to build real confidence.",
  "Research the company thoroughly before every interview.",
  "Keep your resume to 1 page with quantified achievements.",
  "Join the community to get referrals and insider tips.",
  "Review your wrong answers immediately after every quiz.",
  "Focus on understanding patterns, not memorizing solutions.",
];

export default function Dashboard({ form, completed, setCompleted, onLogout }) {
  const navigate = useNavigate();

  if (!form) return null;

  const toggle = (key) => setCompleted((p) => ({ ...p, [key]: !p[key] }));

  const done        = Object.values(completed).filter(Boolean).length;
  const total       = FEATURES.length;
  const taskPct     = Math.round((done / total) * 100);
  const profilePct  = Math.round((!!form.name + !!form.branch + !!form.year + !!form.skills) * 25);
  const overallPct  = Math.min(100, Math.round(profilePct * 0.3 + taskPct * 0.7));
  const initials    = form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const tip         = TIPS[new Date().getDay() % TIPS.length];

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const level =
    overallPct >= 80 ? { label: "Placement Ready 🏆", color: "var(--accent-green)",  bg: "rgba(0,214,143,0.12)",  border: "rgba(0,214,143,0.3)"  } :
    overallPct >= 50 ? { label: "On Track 🚀",         color: "var(--accent)",        bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)" } :
    overallPct >= 25 ? { label: "In Progress ⚡",       color: "var(--accent-orange)", bg: "rgba(255,159,67,0.12)", border: "rgba(255,159,67,0.3)"  } :
                       { label: "Just Started 🌱",     color: "var(--text-muted)",    bg: "var(--bg-hover)",       border: "var(--border)"         };

  const STATS = [
    { icon: "✅", val: `${done}/${total}`, label: "Tasks Done",       color: "var(--accent-green)"  },
    { icon: "📊", val: `${taskPct}%`,      label: "Task Progress",    color: "var(--accent)"        },
    { icon: "👤", val: `${profilePct}%`,   label: "Profile Complete", color: "var(--accent-purple)" },
    { icon: "🎯", val: `${total - done}`,  label: "Remaining",        color: "var(--accent-orange)" },
  ];

  return (
    <div className="db-page">
      <Navbar form={form} onLogout={onLogout} onProfileClick={() => navigate("/profile")} />

      {/* Hero */}
      <div className="db-hero">
        <div className="db-hero-glow" />
        <div className="db-hero-inner">
          <div className="db-hero-left">
            <div className="db-avatar">{initials}</div>
            <div>
              <h1 className="db-hero-title">
                {getGreeting()}, <span className="text-gradient">{form.name.split(" ")[0]}</span> 👋
              </h1>
              <div className="db-hero-meta">
                <span>{form.branch} · {form.year}</span>
                <span className="db-level-badge" style={{ color: level.color, background: level.bg, borderColor: level.border }}>
                  {level.label}
                </span>
              </div>
            </div>
          </div>
          <div className="db-hero-right">
            <button className="btn-ghost" onClick={() => navigate("/profile")}>👤 My Profile</button>
            <button className="btn-primary" onClick={() => navigate("/community")}>👥 Community</button>
          </div>
        </div>
      </div>

      <div className="db-body">

        {/* Stats */}
        <div className="db-stats">
          {STATS.map((s, i) => (
            <div key={i} className="db-stat-card">
              <span className="db-stat-icon" style={{ color: s.color }}>{s.icon}</span>
              <span className="db-stat-val"   style={{ color: s.color }}>{s.val}</span>
              <span className="db-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="db-progress-card">
          <div className="db-progress-header">
            <span>📋 Placement Checklist</span>
            <span>{done} of {total} completed · {taskPct}%</span>
          </div>
          <div className="db-progress-track">
            <div className="db-progress-fill" style={{ width: `${taskPct}%` }} />
          </div>
        </div>

        {/* Tip */}
        <div className="db-tip-bar">
          <span className="db-tip-icon">💡</span>
          <span>{tip}</span>
        </div>

        {/* Cards */}
        <div className="db-section-header">
          <span className="db-section-title">🗂️ Your Placement Toolkit</span>
          <span className="db-section-sub">{done} of {total} completed</span>
        </div>

        <div className="db-cards">
          {FEATURES.map((f) => {
            const isDone = !!completed[f.key];
            return (
              <div
                key={f.key}
                className={`db-card ${isDone ? "db-card-done" : ""}`}
                onClick={() => navigate(f.path)}
              >
                {/* top accent */}
                <div className="db-card-accent" style={{ background: isDone ? "var(--accent-green)" : f.color }} />

                <div className="db-card-top">
                  <div className="db-card-icon" style={{ background: f.color + "20", color: f.color }}>{f.icon}</div>
                  <span className={`db-card-badge ${isDone ? "db-badge-done" : "db-badge-todo"}`}>
                    {isDone ? "✓ Done" : "To Do"}
                  </span>
                </div>

                <h3 className="db-card-title">{f.title}</h3>
                <p className="db-card-desc">{f.desc}</p>

                <div className="db-card-bar-track">
                  <div className="db-card-bar-fill" style={{ width: isDone ? "100%" : "0%", background: f.color }} />
                </div>

                <button
                  className="db-card-btn"
                  style={isDone
                    ? { borderColor: "var(--accent-green)", color: "var(--accent-green)", background: "rgba(0,214,143,0.08)" }
                    : { borderColor: f.color, color: f.color, background: f.color + "12" }
                  }
                  onClick={(e) => { e.stopPropagation(); toggle(f.key); }}
                >
                  {isDone ? "✓ Completed" : "Mark as Done"}
                </button>
              </div>
            );
          })}
        </div>

      </div>
      <Footer />
    </div>
  );
}
