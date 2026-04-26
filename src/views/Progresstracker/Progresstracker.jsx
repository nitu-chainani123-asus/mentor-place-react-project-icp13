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
