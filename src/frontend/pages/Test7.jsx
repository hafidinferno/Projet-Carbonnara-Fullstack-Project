import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressionBar from "../components/Progression Bar/ProgressionBar";
import Header from "../components/header/Header";
import data from "../Controleur/data";
import MeubleQuiz from "../components/Quiz/MeubleQuiz.jsx";

function Test6() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const levelFromUrl = parseInt(searchParams.get("level"), 10);
  const [currentLevel, setCurrentLevel] = useState(
    isNaN(levelFromUrl) ? 0 : levelFromUrl
  );

  return (
    <div className="App">
      <ProgressionBar
        categories={data}
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
      />

      <MeubleQuiz />
    </div>
  );
}

export default Test6;
