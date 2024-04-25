import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const CarbonFootprintBoisson = () => {
  const localStorageKey = "CarbonFootprintBoisson";

  // Questions pour le quiz
  const questions = [
    {
      category: "eau",
      questionText: "Buvez-vous de l'eau plate ou en bouteille ?",
      type: "radio",
      answerOptions: [
        { text: "100 % eau plate", carbonMultiplier: 0.1 },
        {
          text: "75 % eau plate et 25 % eau en bouteille",
          carbonMultiplier: 0.25,
        },
        {
          text: "50 % eau plate et 50 % eau en bouteille",
          carbonMultiplier: 0.5,
        },
        {
          text: "25 % eau plate et 75 % eau en bouteille",
          carbonMultiplier: 0.75,
        },
        { text: "100 % eau en bouteille", carbonMultiplier: 1.0 },
      ],
    },
    {
      category: "boissons",
      questionText:
        "Combien de boissons suivantes consommez-vous en moyenne par semaine ?",
      type: "valueInput",
      beverages: [
        { name: "Soda", carbonMultiplier: 0.3 },
        { name: "Vin", carbonMultiplier: 0.2 },
        { name: "Bière", carbonMultiplier: 0.25 },
        { name: "Lait (animal)", carbonMultiplier: 0.15 },
        { name: "Lait de soja", carbonMultiplier: 0.1 },
        { name: "Thé", carbonMultiplier: 0.05 },
        { name: "Café", carbonMultiplier: 0.1 },
      ],
    },
  ];

  // Initialiser l'état des réponses avec celles stockées dans localStorage ou un tableau vide
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(localStorageKey);
    return savedAnswers
      ? JSON.parse(savedAnswers)
      : Array(questions.length).fill(null);
  });

  // Effet pour sauvegarder les réponses dans le localStorage lorsqu'elles changent
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  // Gestionnaire pour les réponses aux questions
  const handleAnswerClick = (questionIndex, answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleBeverageInput = (questionIndex, beverageIndex, value) => {
    const newAnswers = [...selectedAnswers];
    if (!newAnswers[questionIndex]) {
      newAnswers[questionIndex] = {};
    }
    newAnswers[questionIndex][
      questions[questionIndex].beverages[beverageIndex].name
    ] = value;
    setSelectedAnswers(newAnswers);
  };

  return (
    <div className="quiz-container">
      <h2>Catégorie 2: Les boissons et Empreinte Carbone</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-section">
          <h3>
            {question.category === "eau"
              ? "Sub_catégorie: Eau"
              : "Sub_catégorie: Boissons"}
          </h3>
          <p>{question.questionText}</p>
          {question.type === "radio" && (
            <div className="answers-section">
              {question.answerOptions.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option.text}
                    checked={selectedAnswers[index]?.text === option.text}
                    onChange={() => handleAnswerClick(index, option)}
                  />
                  {option.text}
                </label>
              ))}
            </div>
          )}
          {question.type === "valueInput" && (
            <div className="answers-section">
              {question.beverages.map((beverage, beverageIndex) => (
                <div key={beverageIndex}>
                  <label>
                    {beverage.name}:
                    <input
                      type="number"
                      value={selectedAnswers[index]?.[beverage.name] || ""}
                      onChange={(e) =>
                        handleBeverageInput(
                          index,
                          beverageIndex,
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarbonFootprintBoisson;
