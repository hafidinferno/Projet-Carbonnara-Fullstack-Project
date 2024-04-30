import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const CarbonQuizElectro = () => {
  const localStorageKey = "CarbonQuizElectro";

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
      type: "checkbox",
      questionText:
        "Parmi ces appareils électroménagers, lesquels avez-vous acheté dans l'année ?",
      answerOptions: [
        { text: "Bouilloire", carbonMultiplier: 0.1 },
        { text: "Cafetière (dosettes)", carbonMultiplier: 0.2 },
        { text: "Cafetière (filtre)", carbonMultiplier: 0.15 },
        { text: "Cafetière (expresso)", carbonMultiplier: 0.25 },
        { text: "Four", carbonMultiplier: 0.3 },
        { text: "Lave-vaisselle", carbonMultiplier: 0.4 },
        { text: "Lave-linge", carbonMultiplier: 0.35 },
        { text: "Réfrigérateur", carbonMultiplier: 0.5 },
        { text: "Aspirateur", carbonMultiplier: 0.2 },
        { text: "Climatiseur", carbonMultiplier: 0.45 },
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
  const handleAnswerChange = (questionIndex, optionIndex, isChecked) => {
    const newAnswers = [...selectedAnswers];
    if (!newAnswers[questionIndex]) {
      newAnswers[questionIndex] = [];
    }

    if (isChecked) {
      newAnswers[questionIndex].push(
        questions[questionIndex].answerOptions[optionIndex]
      );
    } else {
      newAnswers[questionIndex] = newAnswers[questionIndex].filter(
        (selected) =>
          selected.text !==
          questions[questionIndex].answerOptions[optionIndex].text
      );
    }

    setSelectedAnswers(newAnswers);
  };

  return (
    <div className="quiz-container">
      <h2>Catégorie 1: Électroménager et Empreinte Carbone</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-section" id={`question${index}`}>
          <p>{question.questionText}</p>
          {question.type === "checkbox" && (
            <div className="answers-section">
              {question.answerOptions.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input
                    type="checkbox"
                    checked={
                      selectedAnswers[index]?.some(
                        (answer) => answer.text === option.text
                      ) || false
                    }
                    onChange={(e) =>
                      handleAnswerChange(index, optionIndex, e.target.checked)
                    }
                  />
                  {option.text}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarbonQuizElectro;
