import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const DailyTransportQuiz = () => {
  const localStorageKey = "dailyTransportQuizAnswers";

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const transportOptions = [
    { name: "TGV", carbonMultiplier: 0.02 },
    { name: "Train Intercités", carbonMultiplier: 0.03 },
    { name: "TER", carbonMultiplier: 0.03 },
    { name: "RER ou Transilien", carbonMultiplier: 0.03 },
    { name: "Bus (thermique)", carbonMultiplier: 0.08 },
    { name: "Bus (électrique)", carbonMultiplier: 0.02 },
    { name: "Tramway", carbonMultiplier: 0.01 },
    { name: "Métro", carbonMultiplier: 0.02 },
    { name: "Scooter ou moto légère", carbonMultiplier: 0.2 },
    { name: "Moto", carbonMultiplier: 0.25 },
    { name: "Voiture (thermique)", carbonMultiplier: 0.25 },
    { name: "Voiture (électrique)", carbonMultiplier: 0.05 },
    { name: "Marche ou vélo (non électrique)", carbonMultiplier: 0 },
    {
      name: "Vélo ou trottinette à assistance électrique",
      carbonMultiplier: 0.01,
    },
    { name: "Je ne me déplace pas la plupart des jours", carbonMultiplier: 0 },
  ];

  const [selectedTransportMethods, setSelectedTransportMethods] = useState(
    () => {
      const saved = localStorage.getItem(localStorageKey);
      return saved ? JSON.parse(saved) : [];
    }
  );

  useEffect(() => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(selectedTransportMethods)
    );
  }, [selectedTransportMethods]);

  const handleCheckboxChange = (transport) => {
    const updatedSelections = selectedTransportMethods.includes(transport)
      ? selectedTransportMethods.filter((selected) => selected !== transport)
      : [...selectedTransportMethods, transport];
    setSelectedTransportMethods(updatedSelections);
  };

  return (
    <div className="quiz-container">
      <h2>Catégorie: Transport</h2>
      <p>
        Parmi les options suivantes, quelle méthode de transport utilisez-vous
        au quotidien ?
      </p>
      <div className="answers-section">
        {transportOptions.map((option, index) => (
          <label key={index} className="checkbox-label" id={`question${index}`}>
            <input
              type="checkbox"
              id={`transport-${index}`}
              checked={selectedTransportMethods.includes(option.name)}
              onChange={() => handleCheckboxChange(option.name)}
            />
            {option.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DailyTransportQuiz;
