import React from "react";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Navbar />
      <div className="flex-grow px-5 py-24">
        <Quiz />
      </div>
      <Footer />
    </div>
  );
};

export default App;
