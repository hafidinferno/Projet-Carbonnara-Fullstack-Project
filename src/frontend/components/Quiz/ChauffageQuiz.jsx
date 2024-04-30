import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const ChauffageQuiz = () => {
    const localStorageKey = "chauffageQuiz";

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const questions = [
    {
      category: "chauffage",
      questionText: "Quel type de chauffage utilisez-vous ?",
      type: "radio",
      answerOptions: [
        { text: "Gaz", chauffagegaz: 1 },
        { text: "Fioul", chauffagefioul: 1 },
        { text: "Électrique", chauffageelectrique: 1 },
        { text: "Pompe à chaleur", pompeachaleur: 1 },
        { text: "Poêle à granulés", poeleagranule: 1 },
        { text: "Poêle à bois", poeleabois: 1 },
        { text: "Réseau de chaleur", reseaudechaleur: 1 },
      ],
    },
    {
      category: "surface",
      questionText:
        "Quelle est la surface de votre habitation en mètres carrés ?",
      type: "valueInput",
      key: "surfaceHabitation",
      defaultValue: 0,
    },
  ];

    const [selectedAnswers, setSelectedAnswers] = useState(() => {
        const savedAnswers = localStorage.getItem(localStorageKey);
        if (savedAnswers) {
            return JSON.parse(savedAnswers);
        } else {
            let initialAnswers = {};
            questions.forEach(question => {
                if (question.type === "radio") {
                    question.answerOptions.forEach(option => {
                        const key = Object.keys(option).find(key => key !== 'text');
                        initialAnswers[key] = 0;
                    });
                    const firstOptionKey = Object.keys(question.answerOptions[0]).find(key => key !== 'text');
                    initialAnswers[firstOptionKey] = 1;
                } else if (question.type === "valueInput") {
                    initialAnswers[question.key] = question.defaultValue;
                }
            });
            return initialAnswers;
        }
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(selectedAnswers));
    }, [selectedAnswers]);

    const handleAnswerClick = (question, answer) => {
        const answerKey = Object.keys(answer).find(key => key !== 'text');
        setSelectedAnswers(prev => ({
            ...Object.keys(prev).reduce((acc, key) => {
                acc[key] = 0; // Set all heating types to 0
                return acc;
            }, {}),
            [answerKey]: 1  // Set only the selected type to 1
        }));
    };

    const handleValueInput = (question, value) => {
        const numericValue = parseInt(value, 10) || 0;
        setSelectedAnswers(prev => ({
            ...prev,
            [question.key]: numericValue
        }));
    };

    return (
        <div className="quiz-container">
            <h2>Quiz sur le Chauffage</h2>
            {questions.map((question, index) => (
                <div key={index} className="question-section" id={`question${index}`}>
                    <h3>{question.category === "chauffage" ? "Type de chauffage" : "Surface de l'habitation"}</h3>
                    <p>{question.questionText}</p>
                    {question.type === "radio" && (
                        <div className="answers-section">
                            {question.answerOptions.map((option, optionIndex) => {
                                const optionKey = Object.keys(option).find(key => key !== 'text');
                                return (
                                    <label key={optionIndex}>
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option.text}
                                            checked={selectedAnswers[optionKey] === option[optionKey]}
                                            onChange={() => handleAnswerClick(question, option)}
                                        />
                                        {option.text}
                                    </label>
                                );
                            })}
                        </div>
                    )}
                    {question.type === "valueInput" && (
                        <div className="answers-section">
                            <input
                                type="number"
                                min="0"
                                value={selectedAnswers[question.key]}
                                onChange={(e) => handleValueInput(question, e.target.value)}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChauffageQuiz;
