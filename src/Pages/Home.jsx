import "../style/Home.css";
import { useNavigate } from "react-router-dom";

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
