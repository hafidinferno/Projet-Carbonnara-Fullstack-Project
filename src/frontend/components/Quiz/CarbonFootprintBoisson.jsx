import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const CarbonFootprintBoisson = () => {
  const localStorageKey = "CarbonFootprintBoisson";

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Questions pour le quiz
  const questions = [
    {
      category: "eau",
      questionText: "Buvez-vous de l'eau plate ou en bouteille ?",
      type: "radio",
      answerOptions: [
        {
          text: "100 % eau plate",
          Pourcentage_eau_plate: 1.0,
          Pourcentage_eau_bouteille: 0.0,
        },
        {
          text: "75 % eau plate et 25 % eau en bouteille",
          Pourcentage_eau_plate: 0.75,
          Pourcentage_eau_bouteille: 0.25,
        },
        {
          text: "50 % eau plate et 50 % eau en bouteille",
          Pourcentage_eau_plate: 0.5,
          Pourcentage_eau_bouteille: 0.5,
        },
        {
          text: "25 % eau plate et 75 % eau en bouteille",
          Pourcentage_eau_plate: 0.25,
          Pourcentage_eau_bouteille: 0.75,
        },
        {
          text: "100 % eau en bouteille",
          Pourcentage_eau_plate: 0.0,
          Pourcentage_eau_bouteille: 1.0,
        },
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

  // Initialiser l'état des réponses avec celles stockées dans localStorage ou une structure adaptée
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(localStorageKey);
    if (savedAnswers) {
      return JSON.parse(savedAnswers);
    } else {
      return questions.map((question) => {
        if (question.type === "valueInput") {
          // Initialiser chaque boisson à 0 pour les questions de type valueInput
          const beveragesInitial = {};
          question.beverages.forEach((beverage) => {
            beveragesInitial[beverage.name] = 0;
          });
          return beveragesInitial;
        }
        return 0; // Pour les autres types de questions
      });
    }
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
        <div key={index} className="question-section" id={`question${index}`}>
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
