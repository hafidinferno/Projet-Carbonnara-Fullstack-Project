import React from "react";
import Header from "../components/header/Header";
import ProgressionBar from "../components/Progression Bar/ProgressionBar";
import NavigationPanel from "../components/Navigation/Navigation";
import CategoryPanel from "../components/Categorie/Categorie";

function Test() {
  // Your questions and answers data
  const questionsData = [
    {
      question: "How is carbon generated in industrial processes?",
      answers: ["Combustion", "Respiration", "Photosynthesis", "Fermentation"],
    },
    {
      question: "What is a major source of carbon emissions?",
      answers: [
        "Renewable energy",
        "Electric vehicles",
        "Deforestation",
        "Recycling",
      ],
    },
    {
      question: "Which activity is carbon-negative?",
      answers: [
        "Coal mining",
        "Reforestation",
        "Gasoline usage",
        "Plastic production",
      ],
    },
  ];

  return (
    <>
      <Header />
      <ProgressionBar />
      <div className="panels-container">
        <NavigationPanel />
        <CategoryPanel category="Carbon Generation" questions={questionsData} />
      </div>
    </>
  );
}

export default Test;
