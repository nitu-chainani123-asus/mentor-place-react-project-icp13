import React, { useState, useEffect } from "react";
import "../styles/Mockinterview.css";

const questions = [
  "Tell me about yourself.",
  "What are your strengths and weaknesses?",
  "Why should we hire you?",
  "Describe a challenging project.",
  "Where do you see yourself in 5 years?"
];

const MockInterview = () => {
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answer, setAnswer] = useState("");

  // Reset to question 1 on component mount
  useEffect(() => {
    setIndex(0);
    setTimeLeft(30);
    setAnswer("");
  }, []);

  // Timer Logic with auto-next
  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = () => {
    setAnswer("");

    if (index < questions.length - 1) {
      setIndex(index + 1);
      setTimeLeft(30);
    } else {
      alert("Interview Completed!");
      setIndex(0);
      setTimeLeft(30);
    }
  };

  const progress = ((index + 1) / questions.length) * 100;

  return (
    <div className="mock-container">
      <h2>Mock Interview</h2>

      {/* Progress */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <p className="question-count">
        Question {index + 1} / {questions.length}
      </p>

      {/* Question */}
      <div className="question-box">
        {questions[index]}
      </div>

      {/* Timer */}
      <div className="timer">⏱ {timeLeft}s</div>

      {/* Answer Box */}
      <textarea
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      ></textarea>

      {/* Buttons */}
      <div className="btn-group">
        <button onClick={handleNext} className="next-btn">Next</button>
        <button onClick={handleNext} className="skip-btn">Skip</button>
      </div>

      <button className="submit-btn">Submit Interview</button>
    </div>
  );
};

export default MockInterview;