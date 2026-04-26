import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const FEATURES = [
  { key: "resume",    title: "Resume Upload",     desc: "AI-powered resume analysis & tips",        icon: "📄", path: "/upload",    color: "#58a6ff" },
  { key: "prep",      title: "Placement Prep",    desc: "Topic-wise study plans for placements",    icon: "📚", path: "/prep",      color: "#bc8cff" },
  { key: "mock",      title: "Mock Interview",    desc: "Practice with real interview questions",   icon: "🎤", path: "/mock",      color: "#f78166" },
  { key: "progress",  title: "Progress Tracker",  desc: "Visualize your preparation journey",       icon: "📊", path: "/progress",  color: "#ffa657" },
  { key: "career",    title: "Career Guidance",   desc: "Personalized advice from mentors",         icon: "🚀", path: "/career",    color: "#3fb950" },
  { key: "community", title: "Student Community", desc: "Connect with 500+ placement aspirants",    icon: "👥", path: "/community", color: "#58a6ff" },
];

const QUICK_LINKS = [
  { label: "DSA Roadmap",      icon: "🧠", path: "/resources/dsa" },
  { label: "Interview Tips",   icon: "📝", path: "/resources/interview-tips" },
  { label: "Company Guides",   icon: "🏢", path: "/resources/companies" },
  { label: "Aptitude Quiz",    icon: "💡", path: "/resources/aptitude" },
  { label: "Placement FAQs",   icon: "❓", path: "/resources/faqs" },
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

  const done       = Object.values(completed).filter(Boolean).length;
  const total      = FEATURES.length;
  const taskPct    = Math.round((done / total) * 100);
  const profilePct = Math.round((!!form.name + !!form.branch + !!form.year + !!form.skills) * 25);
  const overallPct = Math.min(100, Math.round(profilePct * 0.3 + taskPct * 0.7));
  const initials   = form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const tip        = TIPS[new Date().getDay() % TIPS.length];

  const level =
    overallPct >= 80 ? { label: "Placement Ready 🏆", color: "var(--accent-green)"  } :
    overallPct >= 50 ? { label: "On Track 🚀",         color: "var(--accent)"        } :
    overallPct >= 25 ? { label: "In Progress ⚡",       color: "var(--accent-orange)" } :
                       { label: "Just Started 🌱",     color: "var(--text-muted)"    };

  const STATS = [
    { icon: "✅", val: `${done}/${total}`, label: "Tasks Done",       color: "var(--accent-green)"  },
    { icon: "📊", val: `${taskPct}%`,      label: "Task Progress",    color: "var(--accent)"        },
    { icon: "👤", val: `${profilePct}%`,   label: "Profile Complete", color: "var(--accent-purple)" },
    { icon: "🎯", val: `${total - done}`,  label: "Remaining",        color: "var(--accent-orange)" },
  ];

  return (
    <div className="db-page">
      <Navbar form={form} onLogout={onLogout} onProfileClick={() => navigate("/profile")} />

      <div className="db-wrap">

        {/* ── Sidebar ── */}
        <aside className="db-sidebar">

          {/* Profile card */}
          <div className="db-card db-profile-card">
            <div className="db-avatar">{initials}</div>
            <h3 className="db-name">{form.name}</h3>
            <p className="db-meta">{form.branch} · {form.year}</p>
            <span className="db-level" style={{ color: level.color }}>{level.label}</span>

            <div className="db-score-wrap">
              <div className="db-score-row">
                <span>Overall Score</span>
                <span style={{ color: level.color, fontWeight: 700 }}>{overallPct}%</span>
              </div>
              <div className="db-bar-track">
                <div className="db-bar-fill" style={{ width: `${overallPct}%`, background: level.color }} />
              </div>
            </div>

            {form.skills && (
              <div className="db-skills">
                {form.skills.split(",").map((s, i) => (
                  <span key={i} className="db-skill">{s.trim()}</span>
                ))}
              </div>
            )}

            <button className="db-profile-btn" onClick={() => navigate("/profile")}>
              View Full Profile →
            </button>
          </div>

          {/* Quick links */}
          <div className="db-card">
            <p className="db-card-label">⚡ Quick Access</p>
            {QUICK_LINKS.map((q) => (
              <button key={q.path} className="db-quick-btn" onClick={() => navigate(q.path)}>
                <span>{q.icon}</span>
                <span>{q.label}</span>
                <span className="db-quick-arrow">›</span>
              </button>
            ))}
          </div>

          {/* Daily tip */}
          <div className="db-card db-tip-card">
            <p className="db-card-label">💡 Tip of the Day</p>
            <p className="db-tip-text">"{tip}"</p>
          </div>

        </aside>

        {/* ── Main ── */}
        <main className="db-main">

          {/* Header */}
          <div className="db-header">
            <div>
              <h1 className="db-welcome">Good day, {form.name.split(" ")[0]} 👋</h1>
              <p className="db-sub">Here's your placement preparation overview.</p>
            </div>
            <button className="db-cta-btn" onClick={() => navigate("/community")}>
              👥 Join Community
            </button>
          </div>

          {/* Stats */}
          <div className="db-stats">
            {STATS.map((s, i) => (
              <div key={i} className="db-stat">
                <span className="db-stat-icon" style={{ color: s.color }}>{s.icon}</span>
                <span className="db-stat-val"  style={{ color: s.color }}>{s.val}</span>
                <span className="db-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="db-card db-progress-card">
            <div className="db-progress-header">
              <span className="db-progress-title">📋 Placement Checklist</span>
              <span className="db-progress-count">{done} of {total} completed · {taskPct}%</span>
            </div>
            <div className="db-progress-track">
              <div className="db-progress-fill" style={{ width: `${taskPct}%` }} />
            </div>
          </div>

          {/* Feature cards */}
          <div className="db-cards">
            {FEATURES.map((f) => {
              const isDone = !!completed[f.key];
              return (
                <div
                  key={f.key}
                  className={`db-feature-card ${isDone ? "db-feature-done" : ""}`}
                  onClick={() => navigate(f.path)}
                >
                  <div className="db-fc-top">
                    <div className="db-fc-icon" style={{ background: f.color + "18", color: f.color }}>
                      {f.icon}
                    </div>
                    <span className={`db-fc-badge ${isDone ? "db-badge-done" : "db-badge-todo"}`}>
                      {isDone ? "✓ Done" : "To Do"}
                    </span>
                  </div>
                  <h3 className="db-fc-title">{f.title}</h3>
                  <p className="db-fc-desc">{f.desc}</p>
                  <div className="db-fc-bar-track">
                    <div className="db-fc-bar-fill" style={{ width: isDone ? "100%" : "0%", background: f.color }} />
                  </div>
                  <button
                    className="db-fc-btn"
                    style={isDone
                      ? { borderColor: "var(--accent-green)", color: "var(--accent-green)" }
                      : { borderColor: f.color, color: f.color }
                    }
                    onClick={(e) => { e.stopPropagation(); toggle(f.key); }}
                  >
                    {isDone ? "✓ Completed" : "Mark Done"}
                  </button>
                </div>
              );
            })}
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
