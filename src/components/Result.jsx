import React from "react";

const Result = ({ score, total, onRestart }) => {
  const percentage = ((score / total) * 100).toFixed(0);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md p-8 text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Quiz Completed! 🎉</h2>
      <p className="text-lg text-gray-800">
        Your Score: <span className="font-semibold">{score}</span> / {total}
      </p>
      <p className="text-gray-600 mt-1">Accuracy: <span className="font-medium">{percentage}%</span></p>
      <button
        onClick={onRestart}
        className="mt-6 px-6 py-2 border-2 border-green-600 text-green-600 font-semibold rounded-md bg-white hover:bg-green-600 hover:text-white active:scale-95 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out">
        Restart Quiz
      </button>

    </div>
  );
};

export default Result;