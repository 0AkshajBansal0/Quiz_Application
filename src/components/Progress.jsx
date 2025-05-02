import React from "react";

const Progress = ({ current, total }) => {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <strong className="text-gray-700">
          Question {current + 1} of {total}
        </strong>
        <span className="text-sm text-gray-500">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 h-3 rounded">
        <div
          className="bg-blue-500 h-3 rounded transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
