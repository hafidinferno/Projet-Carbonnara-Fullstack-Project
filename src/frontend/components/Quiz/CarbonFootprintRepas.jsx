import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const CarbonFootprintRepas = () => {
  const localStorageKey = "carbonFootprintQuizAnswers";

  // Questions pour le quiz
  const questions = [
    {
      category: "repas",
      questionText:
        "Combien de repas (déjeuner et dîner) faites-vous avec les aliments suivants par semaine en moyenne ?",
      type: "valueInput",
      foods: [
        { name: "Bœuf", carbonMultiplier: 2.5 },
        { name: "Poulet", carbonMultiplier: 0.5 },
        { name: "Poisson blanc", carbonMultiplier: 0.8 },
        { name: "Poisson gras", carbonMultiplier: 1.2 },
        { name: "Végétarien", carbonMultiplier: 0.2 },
        { name: "Végétalien", carbonMultiplier: 0.1 },
      ],
    },
    {
      category: "fruits-légumes",
      questionText:
        "Quelle est la proportion de fruits et légumes dans votre alimentation ?",
      type: "slider",
      min: 0,
      max: 100,
      defaultValue: 50, // valeur par défaut représentative d'une alimentation équilibrée
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
  const handleFoodInput = (questionIndex, foodIndex, value) => {
    const newAnswers = [...selectedAnswers];
    if (!newAnswers[questionIndex]) {
      newAnswers[questionIndex] = {};
    }
    newAnswers[questionIndex][questions[questionIndex].foods[foodIndex].name] =
      value;
    setSelectedAnswers(newAnswers);
  };

  const handleSliderChange = (questionIndex, value) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = { value };
    setSelectedAnswers(newAnswers);
  };

  return (
    <div className="quiz-container">
      <h2>Catégorie 3 : Bilan Carbone de Vos Habitudes Alimentaires</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-section">
          <h3>
            {question.category === "repas"
              ? "Sub_catégorie: Repas"
              : "Sub_catégorie: Fruits et Légumes"}
          </h3>
          <p>{question.questionText}</p>
          {question.type === "valueInput" && (
            <div className="answers-section">
              {question.foods.map((food, foodIndex) => (
                <div key={foodIndex}>
                  <label>
                    {food.name}:
                    <input
                      type="number"
                      value={selectedAnswers[index]?.[food.name] || ""}
                      onChange={(e) =>
                        handleFoodInput(index, foodIndex, e.target.value)
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.type === "slider" && (
            <>
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={selectedAnswers[index]?.value || question.defaultValue}
                className="slider"
                onChange={(e) => handleSliderChange(index, e.target.value)}
              />
              <div>
                Valeur: {selectedAnswers[index]?.value || question.defaultValue}
                %
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarbonFootprintRepas;
