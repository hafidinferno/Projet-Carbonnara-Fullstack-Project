import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const CarbonFootprintQuiz = () => {
  const localStorageKey = "carbonFootprintQuizAnswers";

  // Questions pour le quiz
  const questions = [
    {
      type: "multipleChoice",
      questionText:
        "Quel est votre moyen de transport le plus fréquemment utilisé pour aller au travail ou à l'école ?",
      answerOptions: [
        { text: "Voiture personnelle", carbonMultiplier: 1.2 },
        { text: "Transports en commun", carbonMultiplier: 0.3 },
        { text: "Vélo ou marche", carbonMultiplier: 0 },
        { text: "Télétravail / Je ne me déplace pas", carbonMultiplier: 0 },
      ],
    },
    {
      type: "valueInput",
      questionText:
        "Combien de kilomètres parcourez-vous en moyenne chaque jour en voiture ?",
      inputType: "number",
      carbonMultiplierPerUnit: 0.2, // Coefficient par km
    },
    {
      type: "slider",
      questionText:
        "Sur une échelle de 1 à 10, à quel point considérez-vous l'utilisation des transports en commun comme une alternative viable à la voiture personnelle ?",
      min: 1,
      max: 10,
      defaultValue: 5,
      carbonMultiplierPerUnit: 0.05, // Coefficient basé sur la préférence
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

  return (
    <div className="quiz-container">
      <h2>Catégorie 1: Transport et Empreinte Carbone</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-section" id={`question${index}`}>
          <p>{question.questionText}</p>
          {question.type === "multipleChoice" && (
            <div className="answers-section">
              {question.answerOptions.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className={`answer-button ${
                    selectedAnswers[index]?.text === option.text
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleAnswerClick(index, option)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
          {question.type === "valueInput" && (
            <input
              type="number"
              className="input-value"
              value={selectedAnswers[index]?.value || ""}
              onChange={(e) =>
                handleAnswerClick(index, {
                  ...question,
                  value: e.target.value,
                })
              }
            />
          )}
          {question.type === "slider" && (
            <>
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={selectedAnswers[index]?.value || question.defaultValue}
                className="slider"
                onChange={(e) =>
                  handleAnswerClick(index, {
                    ...question,
                    value: e.target.value,
                  })
                }
              />
              <div>
                Value: {selectedAnswers[index]?.value || question.defaultValue}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarbonFootprintQuiz;
