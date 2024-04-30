import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressionBar from "../components/Progression Bar/ProgressionBar";
import Header from "../components/header/Header";
import data from "../Controleur/data";
import ChauffageQuiz from "../components/Quiz/ChauffageQuiz.jsx";

function Test6() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const levelFromUrl = parseInt(searchParams.get("level"), 10);
  const [currentLevel, setCurrentLevel] = useState(
    isNaN(levelFromUrl) ? 0 : levelFromUrl
  );

  return (
    <div className="App">
      <Header />

      <ProgressionBar
        categories={data}
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
      />

      <ChauffageQuiz />
    </div>
  );
}

export default Test6;
