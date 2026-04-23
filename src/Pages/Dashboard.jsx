import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    { title: "Resume Upload", path: "/upload", icon: "📄" },
    { title: "Placement Preparation", path: "/prep", icon: "📚" },
    { title: "Mock Interview", path: "/mock", icon: "🎤" },
    { title: "Progress Tracker", path: "/progress", icon: "📊" },
    { title: "Career Guidance", path: "/career", icon: "🚀" },
  ];

  return (
    <div className="dashboard">

      <h1 className="heading">PlaceMentor Dashboard</h1>

      <div className="cards">
        {features.map((item, index) => (
          <div
            key={index}
            className="card"
            onClick={() => navigate(item.path)}
          >
            <div className="icon">{item.icon}</div>
            <h2>{item.title}</h2>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;