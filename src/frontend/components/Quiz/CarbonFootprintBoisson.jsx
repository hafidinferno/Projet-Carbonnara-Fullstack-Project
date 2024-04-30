import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const CarbonFootprintBoisson = () => {
  const localStorageKey = "CarbonFootprintBoisson";

  const questions = [
    {
      category: "eau",
      questionText: "Buvez-vous de l'eau du robinet ou en bouteille ?",
      type: "radio",
      answerOptions: [
        { text: "100 % eau du robinet", eaudurobinetpourcentage: 1.0, eauenbouteillepourcentage: 0.0 },
        { text: "75 % eau du robinet et 25 % eau en bouteille", eaudurobinetpourcentage: 0.75, eauenbouteillepourcentage: 0.25 },
        { text: "50 % eau du robinet et 50 % eau en bouteille", eaudurobinetpourcentage: 0.5, eauenbouteillepourcentage: 0.5 },
        { text: "25 % eau du robinet et 75 % eau en bouteille", eaudurobinetpourcentage: 0.25, eauenbouteillepourcentage: 0.75 },
        { text: "100 % eau en bouteille", eaudurobinetpourcentage: 0.0, eauenbouteillepourcentage: 1.0 },
      ],
    },
    {
      category: "boissons",
      questionText:
        "Combien de boissons suivantes consommez-vous en moyenne par semaine ?",
      type: "valueInput",
      beverages: [
        { name: "Soda", key: 'soda' },
        { name: "Vin", key: 'vin'},
        { name: "Bière", key: 'biere' },
        { name: "Lait (animal)", key: 'lait' },
        { name: "Lait de soja", key: 'laitsoja' },
        { name: "Thé", key: 'the' },
        { name: "Café", key: 'cafe' },
      ],
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(localStorageKey);
    return savedAnswers
        ? JSON.parse(savedAnswers)
        : questions.map((question) =>
            question.type === "valueInput"
                ? question.beverages.reduce((acc, beverage) => {
                  acc[beverage.key] = 0;
                  return acc;
                }, {})
                : question.answerOptions[0]  // Stocker l'objet entier de l'option par défaut
        );
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  const handleAnswerClick = (questionIndex, answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answer;  // Stocker l'objet entier de l'option sélectionnée
    setSelectedAnswers(newAnswers);
  };

  const handleBeverageInput = (questionIndex, beverageIndex, value) => {
    const newAnswers = [...selectedAnswers];
    const numericValue = parseInt(value, 10) || 0;
    newAnswers[questionIndex][questions[questionIndex].beverages[beverageIndex].key] = numericValue;
    setSelectedAnswers(newAnswers);
  };

  return (
      <div className="quiz-container">
        <h2>Catégorie 2: Les boissons et Empreinte Carbone</h2>
        {questions.map((question, index) => (
            <div key={index} className="question-section">
              <h3>{question.category === "eau" ? "Sub_catégorie: Eau" : "Sub_catégorie: Boissons"}</h3>
              <p>{question.questionText}</p>
              {question.type === "radio" && (
                  <div className="answers-section">
                    {question.answerOptions.map((option, optionIndex) => (
                        <label key={optionIndex}>
                          <input
                              type="radio"
                              name={`question-${index}`}
                              value={option.text}
                              checked={selectedAnswers[index].text === option.text}
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
                                value={selectedAnswers[index][beverage.key]}
                                onChange={(e) => handleBeverageInput(index, beverageIndex, e.target.value)}
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
