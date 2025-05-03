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
    <div className="max-w-xl mx-auto my-8 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
      <div className="mb-4">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-right text-sm m-0">{progressPercent}% done</p>
      </div>

      <Progress current={currentQ} total={quizData.length} />

      <h3 className="text-lg font-semibold mt-4 mb-2">{quizData[currentQ].question}</h3>
      <ul className="list-none p-0">
        {quizData[currentQ].options.map((option, idx) => {
          let bgColor = "bg-gray-100";

          if (isAnswered) {
            const isCorrect = option === quizData[currentQ].answer;
            const isSelectedWrong = option === selected && option !== quizData[currentQ].answer;

            if (isCorrect) bgColor = "bg-green-100";
            if (isSelectedWrong) bgColor = "bg-red-100";
          } else if (selected === option) {
            bgColor = "bg-blue-100";
          }

          return (
            <li
              key={idx}
              onClick={() => handleOptionClick(option)}
              className={`p-3 my-2 rounded-md border border-gray-300 cursor-pointer transition-colors duration-200 ${bgColor} ${
                isAnswered ? "cursor-default" : "hover:bg-blue-200"
              }`}>
              {option}
            </li>
          );
        })}
      </ul>

      {feedback && (
        <p className="mt-4 font-semibold">{feedback}</p>
      )}

      <button
        onClick={handleNext}
        disabled={!isAnswered}
        className={`mt-4 px-5 py-2 rounded-md text-white ${
          isAnswered ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
        }`}>
        Next
      </button>
    </div>
  );
};

export default Quiz;