import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/Carboon.css";

const CarbonFootprintQuiz3 = () => {
  const navigate = useNavigate();
  const localStorageKey = "carbonFootprintQuiz3Answers";

  // Questions pour la catégorie Alimentation
  const questions = [
    {
      type: "multipleChoice",
      questionText: "À quelle fréquence consommez-vous de la viande ?",
      answerOptions: [
        { text: "Tous les jours", carbonImpact: "high" },
        { text: "Quelques fois par semaine", carbonImpact: "medium" },
        { text: "Rarement ou jamais", carbonImpact: "low" },
      ],
    },
    {
      type: "yesNo",
      questionText: "Privilégiez-vous les produits locaux et de saison ?",
      answerOptions: [
        { text: "Oui", value: true },
        { text: "Non", value: false },
      ],
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(localStorageKey);
    return savedAnswers
      ? JSON.parse(savedAnswers)
      : Array(questions.length).fill(null);
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  // Fonction pour calculer et sauvegarder les résultats
  const calculateAndSaveResults = () => {
    const results = questions.map((question, index) => {
      // Exemple simplifié de calcul du score
      return { score: selectedAnswers[index]?.value || 0 };
    });

    localStorage.setItem("quizResults", JSON.stringify(results));
    navigate("/Results"); // Redirige vers la page de résultats
  };

  const handleAnswerClick = (questionIndex, answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  return (
    <div className="quiz-container">
      <h2>Catégorie 3: Alimentation et Empreinte Carbone</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-section">
          <p>{question.questionText}</p>
          {question.type === "multipleChoice" && (
            <div className="answers-section">
              {question.answerOptions.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className={`answer-button ${
                    selectedAnswers[index] === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleAnswerClick(index, option.value)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
          {question.type === "yesNo" && (
            <div className="answers-section">
              {question.answerOptions.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className={`answer-button ${
                    selectedAnswers[index] === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleAnswerClick(index, option.value)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      <button onClick={calculateAndSaveResults}>Soumettre le Quiz</button>
    </div>
  );
};

export default CarbonFootprintQuiz3;
