import { useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome back 👋</h1>

      {/* Cards */}
      <div className="flex gap-6 flex-wrap">
        <Card title="Resume Score" value={`${score}%`} />
        <Card title="Progress" value={`${score}%`} />
        <Card title="Status" value={getStatus()} status={getStatus()} />
      </div>

      {/* Buttons */}
      <div className="mt-8 space-x-4">
        <button
          onClick={() => navigate("/upload")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Upload Resume
        </button>

        <button
          onClick={updateScore}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg"
        >
          Refresh Score
        </button>
      </div>
    </div>
  );
};


export default Dashboard;

