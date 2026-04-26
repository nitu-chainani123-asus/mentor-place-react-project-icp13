import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const allFeatures = [
  { title: "Resume Upload",         desc: "Upload & get AI-powered resume analysis",  icon: "📄", path: "/upload",    key: "resume",    color: "#6366f1" },
  { title: "Placement Prep",        desc: "Topic-wise study plans for placements",     icon: "📚", path: "/prep",      key: "prep",      color: "#8b5cf6" },
  { title: "Mock Interview",        desc: "Practice with real interview questions",    icon: "🎤", path: "/mock",      key: "mock",      color: "#ec4899" },
  { title: "Progress Tracker",      desc: "Visualize your preparation journey",        icon: "📊", path: "/progress",  key: "progress",  color: "#f59e0b" },
  { title: "Career Guidance",       desc: "Personalized advice from mentors",          icon: "🚀", path: "/career",    key: "career",    color: "#10b981" },
  { title: "Student Community",     desc: "Connect with 500+ placement aspirants",     icon: "👨‍🎓", path: "/community", key: "community", color: "#3b82f6" },
];

const quickLinks = [
  { label: "DSA Roadmap",      icon: "🧠", path: "/resources/dsa" },
  { label: "Interview Tips",   icon: "📝", path: "/resources/interview-tips" },
  { label: "Company Guides",   icon: "📖", path: "/resources/companies" },
  { label: "Aptitude Quiz",    icon: "💡", path: "/resources/aptitude" },
  { label: "Placement FAQs",   icon: "🎯", path: "/resources/faqs" },
];

const tips = [
  "Solve at least 2 DSA problems daily to build consistency.",
  "Practice mock interviews out loud — it builds confidence.",
  "Research the company before every interview round.",
  "Keep your resume to 1 page with quantified achievements.",
  "Join the community to get referrals and insider tips.",
];

const Dashboard = ({ form, completed, setCompleted, onLogout }) => {
  const navigate = useNavigate();

  const toggleDone = (key) =>
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));

  if (!form) return null;

  const doneCount    = Object.values(completed).filter(Boolean).length;
  const totalTasks   = allFeatures.length;
  const taskPct      = Math.round((doneCount / totalTasks) * 100);
  const profileScore = Math.round((!!form.name + !!form.branch + !!form.year + !!form.skills) * 25);
  const overallScore = Math.round(profileScore * 0.3 + taskPct * 0.7);
  const initials     = form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const getLevel = () => {
    if (overallScore >= 80) return { label: "Placement Ready 🏆", color: "#22c55e" };
    if (overallScore >= 50) return { label: "On Track 🚀",        color: "#8b5cf6" };
    if (overallScore >= 25) return { label: "In Progress ⚡",     color: "#f59e0b" };
    return                         { label: "Just Started 🌱",    color: "#94a3b8" };
  };

  const level = getLevel();
  const circumference = 2 * Math.PI * 36;
  const dashOffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="db">
      <Navbar form={form} onLogout={onLogout} onProfileClick={() => navigate("/profile")} />

      {/* ── Hero Banner ── */}
      <div className="db-hero">
        <div className="db-hero-glow" />
        <div className="db-hero-left">
          <div className="db-avatar">{initials}</div>
          <div>
            <h1 className="db-welcome">Welcome back, {form.name.split(" ")[0]} 👋</h1>
            <p className="db-meta">{form.branch} &nbsp;·&nbsp; {form.year} &nbsp;·&nbsp; {form.skills || "Add your skills"}</p>
            <span className="db-level-badge" style={{ color: level.color, borderColor: level.color }}>
              {level.label}
            </span>
          </div>
        </div>
        <div className="db-hero-right">
          <div className="db-ring-wrap">
            <svg className="db-ring" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" />
              <circle
                cx="40" cy="40" r="36" fill="none"
                stroke="url(#ringGrad)" strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 40 40)"
              />
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="db-ring-text">
              <span className="db-ring-val">{overallScore}%</span>
              <span className="db-ring-label">Overall</span>
            </div>
          </div>
        </div>
      </div>

      <div className="db-body">

        {/* ── Stats Row ── */}
        <div className="db-stats">
          {[
            { icon: "✅", val: `${doneCount}/${totalTasks}`, label: "Tasks Done",       color: "#22c55e" },
            { icon: "📊", val: `${taskPct}%`,                label: "Task Progress",    color: "#8b5cf6" },
            { icon: "👤", val: `${profileScore}%`,           label: "Profile Complete", color: "#3b82f6" },
            { icon: "🎯", val: `${totalTasks - doneCount}`,  label: "Remaining",        color: "#f59e0b" },
          ].map((s, i) => (
            <div key={i} className="db-stat-card">
              <div className="db-stat-icon" style={{ background: s.color + "20", color: s.color }}>{s.icon}</div>
              <div>
                <div className="db-stat-val">{s.val}</div>
                <div className="db-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Main Grid ── */}
        <div className="db-main-grid">

          {/* Left: Feature Cards */}
          <div className="db-left">
            <div className="db-section-header">
              <h2 className="db-section-title">🗂️ Placement Checklist</h2>
              <span className="db-section-sub">{doneCount} of {totalTasks} completed</span>
            </div>

            {/* Overall progress bar */}
            <div className="db-overall-bar">
              <div className="db-overall-fill" style={{ width: `${taskPct}%` }} />
            </div>

            <div className="db-cards-grid">
              {allFeatures.map((item) => (
                <div
                  key={item.key}
                  className={`db-card ${completed[item.key] ? "db-card-done" : ""}`}
                  onClick={() => navigate(item.path)}
                >
                  <div className="db-card-top">
                    <div className="db-card-icon-wrap" style={{ background: item.color + "18" }}>
                      <span className="db-card-icon">{item.icon}</span>
                    </div>
                    <div className={`db-card-status ${completed[item.key] ? "db-status-done" : "db-status-pending"}`}>
                      {completed[item.key] ? "✓ Done" : "Pending"}
                    </div>
                  </div>
                  <h3 className="db-card-title">{item.title}</h3>
                  <p className="db-card-desc">{item.desc}</p>
                  <div className="db-card-bar">
                    <div className="db-card-bar-fill" style={{ width: completed[item.key] ? "100%" : "0%", background: item.color }} />
                  </div>
                  <button
                    className="db-card-btn"
                    style={completed[item.key]
                      ? { background: "#dcfce7", color: "#16a34a" }
                      : { background: item.color + "18", color: item.color }
                    }
                    onClick={(e) => { e.stopPropagation(); toggleDone(item.key); }}
                  >
                    {completed[item.key] ? "✓ Mark Undone" : "Mark as Done"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="db-right">

            {/* Quick Links */}
            <div className="db-sidebar-card">
              <h3 className="db-sidebar-title">⚡ Quick Access</h3>
              <div className="db-quick-links">
                {quickLinks.map((q, i) => (
                  <button key={i} className="db-quick-btn" onClick={() => navigate(q.path)}>
                    <span>{q.icon}</span>
                    <span>{q.label}</span>
                    <span className="db-quick-arrow">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Tip */}
            <div className="db-sidebar-card db-tip-card">
              <h3 className="db-sidebar-title">💡 Daily Tip</h3>
              <p className="db-tip-text">
                {tips[new Date().getDay() % tips.length]}
              </p>
            </div>

            {/* Profile Summary */}
            <div className="db-sidebar-card">
              <h3 className="db-sidebar-title">👤 Profile Summary</h3>
              <div className="db-profile-rows">
                {[
                  { label: "Name",   val: form.name },
                  { label: "Branch", val: form.branch },
                  { label: "Year",   val: form.year },
                  { label: "Skills", val: form.skills || "—" },
                ].map((r, i) => (
                  <div key={i} className="db-profile-row">
                    <span className="db-profile-label">{r.label}</span>
                    <span className="db-profile-val">{r.val}</span>
                  </div>
                ))}
              </div>
              <button className="db-edit-btn" onClick={() => navigate("/profile")}>
                Edit Profile →
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
