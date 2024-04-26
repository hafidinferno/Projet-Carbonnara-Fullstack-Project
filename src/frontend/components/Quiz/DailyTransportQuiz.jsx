import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const DailyTransportQuiz = () => {
  const localStorageKey = "dailyTransportQuizAnswers";

  const transportOptions = [
    { name: "TGV", key: "tgv" },
    { name: "Train Intercités", key: "intercites" },
    { name: "TER", key: "ter" },
    { name: "RER", key: "rer" },
    { name: "Bus (thermique)", key: "busthermique" },
    { name: "Bus (électrique)", key: "buselectrique" },
    { name: "Bus (GNV)", key: "busgnv" },
    { name: "Tramway", key: "tramway" },
    { name: "Métro", key: "metro" },
    { name: "Scooter ou moto légère", key: "scooter" },
    { name: "Moto", key: "moto" },
    { name: "Voiture (thermique)", key: "voiturethermique" },
    { name: "Voiture (électrique)", key: "voitureelectrique" },
    { name: "Marche ou vélo (non électrique)", key: "velo" },
    { name: "Vélo ou trottinette à assistance électrique", key: "veloelectrique" },
    { name: "Avion court-courrier", key: "avioncourtcourrier" },
    { name: "Avion moyen-courrier", key: "avionmoyencourrier" },
    { name: "Avion long-courrier", key: "avionlongcourrier" },
    { name: "Je ne me déplace pas la plupart des jours", key: "carbonMultiplier" },
  ];

  const [selectedTransportMethods, setSelectedTransportMethods] = useState(() => {
    const saved = localStorage.getItem(localStorageKey);
    return saved ? JSON.parse(saved) : transportOptions.reduce((acc, option) => {
      acc[option.key] = 0;
      return acc;
    }, {});
  });

  useEffect(() => {
    localStorage.setItem(
        localStorageKey,
        JSON.stringify(selectedTransportMethods)
    );
  }, [selectedTransportMethods]);

  const handleCheckboxChange = (transportKey, isChecked) => {
    setSelectedTransportMethods(prevState => ({
      ...prevState,
      [transportKey]: isChecked ? 1 : 0
    }));
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
              <label key={index} className="checkbox-label">
                <input
                    type="checkbox"
                    checked={selectedTransportMethods[option.key] === 1}
                    onChange={(e) => handleCheckboxChange(option.key, e.target.checked)}
                />
                {option.name}
              </label>
          ))}
        </div>
      </div>
  );
};

export default DailyTransportQuiz;
