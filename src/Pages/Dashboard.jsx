import { useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(65);

  const updateScore = () => {
    const newScore = Math.floor(Math.random() * 40) + 60;
    setScore(newScore);
  };

  const getStatus = () => {
    return score >= 75 ? "Good" : "Improve";
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Welcome back 👋</h1>

      {/* Cards Section */}
      <div className="card-container">
        <Card title="Resume Score" value={`${score}%`} type="score" />
        <Card title="Progress" value={`${score}%`} type="progress" />
        <Card title="Status" value={getStatus()} type="status" />
      </div>

      {/* Buttons */}
      <div className="dashboard-buttons">
        <button
          className="btn btn-blue"
          onClick={() => navigate("/upload")}
        >
          Upload Resume
        </button>

        <button
          className="btn btn-purple"
          onClick={updateScore}
        >
          Refresh Score
        </button>
      </div>
    </div>
  );
};

export default Dashboard;