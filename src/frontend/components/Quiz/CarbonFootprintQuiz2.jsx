import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";
const CarbonFootprintQuiz2 = () => {
  const localStorageKey = "carbonFootprintElectricityQuizAnswers";

  // Questions pour la catégorie Consommation Électrique
  const questions = [
    {
      type: "multipleChoice",
      questionText:
        "Quelle est votre source principale d'énergie pour le chauffage ?",
      answerOptions: [
        { text: "Électricité", impact: "high" },
        { text: "Gaz naturel", impact: "medium" },
        { text: "Énergies renouvelables (solaire, géothermie)", impact: "low" },
      ],
    },
    {
      type: "valueInput",
      questionText: "Combien de kWh votre foyer consomme-t-il par mois ?",
      inputType: "number",
    },
    {
      type: "yesNo",
      questionText: "Avez-vous des panneaux solaires installés chez vous ?",
      answerOptions: [
        { text: "Oui", value: true },
        { text: "Non", value: false },
      ],
    },
    {
      type: "multipleChoice",
      questionText:
        "Quelle est la fréquence de remplacement de vos appareils par des modèles éco-énergétiques ?",
      answerOptions: [
        { text: "À chaque remplacement d'appareil", impact: "low" },
        { text: "Parfois", impact: "medium" },
        { text: "Rarement ou jamais", impact: "high" },
      ],
    },
    {
      type: "slider",
      questionText:
        "Sur une échelle de 1 à 10, évaluez l'efficacité de l'isolation de votre domicile.",
      min: 1,
      max: 10,
      defaultValue: 5,
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

  const handleAnswerClick = (questionIndex, answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  return (
    <div className="quiz-container">
      <h2>Catégorie 2: Consommation Électrique</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-section">
          <p>{question.questionText}</p>
          {/* Rendu des questions selon leur type */}
          {/* Multiple Choice */}
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
          {/* Input Value */}
          {question.type === "valueInput" && (
            <input
              type="number"
              className="input-value"
              value={selectedAnswers[index]?.value || ""}
              onChange={(e) =>
                handleAnswerClick(index, { ...question, value: e.target.value })
              }
            />
          )}
          {/* Yes/No */}
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
          {/* Slider */}
          {question.type === "slider" && (
            <>
              <input
                type="range"
                className="slider"
                min={question.min}
                max={question.max}
                value={selectedAnswers[index]?.value || question.defaultValue}
                onChange={(e) =>
                  handleAnswerClick(index, {
                    ...question,
                    value: e.target.value,
                  })
                }
              />
              <div>
                Valeur sélectionnée :{" "}
                {selectedAnswers[index]?.value || question.defaultValue}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarbonFootprintQuiz2;
