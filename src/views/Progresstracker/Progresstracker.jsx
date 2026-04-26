import React, { useState, useEffect } from "react";
import "./progresstracker.css";

const Progresstracker = () => {
  const [overallProgress, setOverallProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const [items, setItems] = useState([
    { id: 1, name: "Resume Upload", progress: 100, date: "2024-03-15", color: "#10b981", icon: "📄", status: "Completed" },
    { id: 2, name: "Profile Setup", progress: 85, date: "2024-03-20", color: "#3b82f6", icon: "👤", status: "In Progress" },
    { id: 3, name: "Mock Interviews", progress: 50, date: "2024-03-25", color: "#f59e0b", icon: "🎤", status: "In Progress" },
    { id: 4, name: "Skill Assessment", progress: 30, date: "2024-04-01", color: "#ec4899", icon: "🎯", status: "Pending" },
    { id: 5, name: "Job Applications", progress: 15, date: "Pending", color: "#8b5cf6", icon: "📧", status: "Not Started" },
  ]);
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + item.progress, 0);
    const target = Math.round(total / items.length);
    setOverallProgress(target);

    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayProgress(target);
        clearInterval(timer);
      } else {
        setDisplayProgress(Math.round(current));
      }
    }, 20);
      return () => clearInterval(timer);
  }, [items]);

  const completedCount = items.filter(item => item.progress === 100).length;
  const inProgressCount = items.filter(item => item.progress > 0 && item.progress < 100).length;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
 return (
    <div className="proper-tracker-container">
      <main className="proper-main">
        {/* Header */}
        <div className="page-header">
          <div className="breadcrumb">
            Dashboard / <span className="active">Progress Tracker</span>
          </div>
          <h1>🚀 My Placement Journey</h1>
          <p>Monitor your preparation status and upcoming milestones with ease.</p>
        </div>
        <div className="stats-container">
          <div className="stat-card stat-card-primary">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <span className="stat-label">Overall Progress</span>
              <span className="stat-value">{displayProgress}%</span>
            </div>
          </div>
          <div className="stat-card stat-card-success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <span className="stat-label">Completed</span>
              <span className="stat-value">{completedCount}/{items.length}</span>
            </div>
            </div>
          <div className="stat-card stat-card-warning">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <span className="stat-label">In Progress</span>
              <span className="stat-value">{inProgressCount}</span>
            </div>
          </div>
        </div>
        <div className="dashboard-grid">
          {/* Overall Progress Card */}
          <section className="card summary-card gradient-bg-blue">
            <div className="card-header">
              <h2>📊 Overall Status</h2>
              <span className="badge badge-success">✓ Updated today</span>
            </div>