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
        { text: "Bouilloire", key: "bouilloire" },
        { text: "Cafetière (dosettes)", key: "cafetieredosettes" },
        { text: "Cafetière (filtre)", key: "cafetierefiltre" },
        { text: "Cafetière (expresso)", key: "cafetiereexpresso" },
        { text: "Four", key: "fourelectrique" },
        { text: "Lave-vaisselle", key: "lavevaisselle" },
        { text: "Lave-linge", key: "lavelinge" },
        { text: "Réfrigérateur", key: "refrigerateur" },
        { text: "Aspirateur", key: "aspirateur" },
        { text: "Climatiseur", key: "climatiseur" },
      ],
    },
  ];

  // Initialiser l'état des réponses avec celles stockées dans localStorage ou les valeurs par défaut
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(localStorageKey);
    return savedAnswers
      ? JSON.parse(savedAnswers)
      : questions[0].answerOptions.reduce((acc, option) => {
          acc[option.key] = 0;
          return acc;
        }, {});
  });

  // Effet pour sauvegarder les réponses dans le localStorage lorsqu'elles changent
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  // Gestionnaire pour les réponses aux questions
  const handleAnswerChange = (optionKey, isChecked) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [optionKey]: isChecked ? 1 : 0,
    }));
  };

  return (
    <div className="quiz-container">
      <h2>Catégorie 1: Électroménager et Empreinte Carbone</h2>
      {questions.map((question, questionIndex) => (
        <div
          key={questionIndex}
          className="question-section"
          id={`question${index}`}
        >
          <p>{question.questionText}</p>
          {question.type === "checkbox" && (
            <div className="answers-section">
              {question.answerOptions.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input
                    type="checkbox"
                    checked={selectedAnswers[option.key] === 1}
                    onChange={(e) =>
                      handleAnswerChange(option.key, e.target.checked)
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
