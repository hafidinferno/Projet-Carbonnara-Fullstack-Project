import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressionBar from "../components/Progression Bar/ProgressionBar";
import data from "../Controleur/data";
import CarbonFootprintQuiz2 from "../components/Quiz/CarbonFootprintQuiz2";
import CarbonFootprintBoisson from "../components/Quiz/CarbonFootprintBoisson";

function TestII() {
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

      <CarbonFootprintBoisson />
    </div>
  );
}

export default TestII;
