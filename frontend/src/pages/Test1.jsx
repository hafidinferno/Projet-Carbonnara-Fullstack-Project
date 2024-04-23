import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressionBar from "../components/Progression Bar/ProgressionBar";
import CarbonFootprintQuiz from "../components/Quiz/CarbonFootprintQuiz";
import Header from "../components/header/Header";
import data from "../Controleur/data";

function TestI() {
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

      <CarbonFootprintQuiz />
    </div>
  );
}

export default TestI;