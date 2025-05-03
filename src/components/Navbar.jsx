import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/images/logo_quiz.png" alt="Quiz Logo" className="h-10 w-10" />
          <h2 className="text-2xl font-semibold">Quiz App</h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;