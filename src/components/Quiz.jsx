import React, { useState } from "react";
import quizData from "../constants/index.js";
import Progress from "./Progress";
import Result from "./Result";

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionClick = (option) => {
    if (isAnswered) return;
    setSelected(option);
    const correct = quizData[currentQ].answer;

    if (option === correct) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! Correct Answer: ${correct}`);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (!isAnswered) return;
    if (currentQ + 1 < quizData.length) {
      setCurrentQ(currentQ + 1);
      setSelected("");
      setFeedback("");
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected("");
    setScore(0);
    setFeedback("");
    setIsAnswered(false);
    setShowResult(false);
  };

  const progressPercent = Math.round(((currentQ + (isAnswered ? 1 : 0)) / quizData.length) * 100);

  if (showResult) {
    return <Result score={score} total={quizData.length} onRestart={handleRestart} />;
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "2rem auto",
      padding: "1.5rem",
      border: "1px solid #ccc",
      borderRadius: "10px",
      background: "#ffffff",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)"
    }}>
      <div style={{ marginBottom: "1rem" }}>
        <div style={{
          height: "10px",
          width: "100%",
          backgroundColor: "#eee",
          borderRadius: "5px",
          overflow: "hidden",
          marginBottom: "0.5rem"
        }}>
          <div
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              backgroundColor: "#4caf50",
              transition: "width 0.3s ease"
            }}
          />
        </div>
        <p style={{ textAlign: "right", margin: 0 }}>{progressPercent}% done</p>
      </div>

      <Progress current={currentQ} total={quizData.length} />

      <h3>{quizData[currentQ].question}</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {quizData[currentQ].options.map((option, idx) => {
          let bgColor = "#f4f4f4";

          if (isAnswered) {
            const isCorrect = option === quizData[currentQ].answer;
            const isSelectedWrong = option === selected && option !== quizData[currentQ].answer;

            if (isCorrect) bgColor = "#d4edda"; // green
            if (isSelectedWrong) bgColor = "#f8d7da"; // red
          } else if (selected === option) {
            bgColor = "#cce5ff"; // light blue
          }

          return (
            <li
              key={idx}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: "0.75rem",
                margin: "0.5rem 0",
                backgroundColor: bgColor,
                borderRadius: "6px",
                cursor: isAnswered ? "default" : "pointer",
                border: "1px solid #ccc",
                transition: "background-color 0.2s"
              }}
            >
              {option}
            </li>
          );
        })}
      </ul>

      {feedback && <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{feedback}</p>}

      <button
        onClick={handleNext}
        disabled={!isAnswered}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.2rem",
          backgroundColor: isAnswered ? "#007bff" : "#aaa",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: isAnswered ? "pointer" : "not-allowed"
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;
