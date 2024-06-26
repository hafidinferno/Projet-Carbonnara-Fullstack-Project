import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProgressionBar from "../components/Progression Bar/ProgressionBar";
import CarbonFootprintQuiz from "../components/Quiz/CarbonFootprintQuiz";
import CarbonQuizElectro from "../components/Quiz/CarbonQuizElectro";
import data from "../Controleur/data";
import NavigationButtons from "../components/Progression Bar/NavigationsButtons";

function TestI() {
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

      <CarbonQuizElectro />
    </div>
  );
}

export default TestI;
