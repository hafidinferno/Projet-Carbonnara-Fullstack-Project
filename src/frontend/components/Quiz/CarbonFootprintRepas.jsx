import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const CarbonFootprintRepas = () => {
  const localStorageKey = "carbonFootprintQuizAnswers";

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const questions = [
    {
      category: "repas",
      questionText:
        "Combien de repas (déjeuner et dîner) faites-vous avec les aliments suivants par semaine en moyenne ?",
      type: "valueInput",
      foods: [
        { name: "Repas avec du boeuf", key: "repasavecduboeuf" },
        { name: "Poulet", key: "repasavecdupoulet" },
        { name: "Poisson blanc", key: "repasavecdupoissonblanc" },
        { name: "Poisson gras", key: "repasavecdupoissongras" },
        { name: "Végétarien", key: "repasvegetarien" },
        { name: "Végétalien", key: "repasvegetalien" },
      ],
    },
    {
      category: "fruits-légumes",
      questionText:
        "Quelle est la proportion de fruits et légumes dans votre alimentation ?",
      type: "slider",
      min: 0,
      max: 100,
      defaultValue: 50,
    },
  ];

  // Initialiser l'état des réponses avec celles stockées dans localStorage ou des valeurs par défaut appropriées
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(localStorageKey);
    if (savedAnswers) {
      return JSON.parse(savedAnswers);
    } else {
      return questions.map((question) => {
        if (question.type === "valueInput") {
          // Créez un objet avec toutes les clés des aliments initialisées à 0
          const initialFoods = question.foods.reduce((acc, food) => {
            acc[food.key] = 0;
            return acc;
          }, {});
          return initialFoods;
        } else {
          return { value: question.defaultValue };
        }
      });
    }
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  const handleFoodInput = (questionIndex, foodIndex, value) => {
    const newAnswers = [...selectedAnswers];
    const foodKey = questions[questionIndex].foods[foodIndex].key;
    const numericValue = value ? parseInt(value, 10) : 0; // Convert input to integer, default to 0 if empty

    newAnswers[questionIndex][foodKey] = numericValue;

    setSelectedAnswers(newAnswers);
  };

  const handleSliderChange = (questionIndex, value) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = { value: parseInt(value, 10) }; // Ensure value is stored as integer
    setSelectedAnswers(newAnswers);
  };

  return (
    <div className="quiz-container">
      <h2>Catégorie 3 : Bilan Carbone de Vos Habitudes Alimentaires</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-section" id={`question${index}`}>
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
                      value={selectedAnswers[index][food.key]}
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
                value={selectedAnswers[index].value}
                className="slider"
                onChange={(e) => handleSliderChange(index, e.target.value)}
                id={`question${index}`}
              />
              <div>Valeur: {selectedAnswers[index].value}%</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarbonFootprintRepas;
