import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const DigitalHabitsQuiz = () => {
  const localStorageKey = "digitalHabitsQuizAnswers";

  // List of electronic devices
  const electronics = [
    "Smartphones",
    "Tablettes",
    "Liseuses",
    "Montres connectées",
    "Appareil photo",
    "Ordinateurs fixes sans écran",
    "Ordinateurs portables",
    "Consoles de salon",
    "Consoles portables",
    "Écrans",
    "Chaînes hi-fi",
    "Enceintes bluetooth",
    "Barres de son",
    "Télévisions",
    "Home cinéma",
    "Modems",
    "Imprimantes",
  ];

  // Digital activities details
  const digitalActivities = [
    { name: "Emails envoyés", defaultValue: 0 },
    { name: "Emails reçus", defaultValue: 0 },
    { name: "Spams reçus", defaultValue: 0 },
    { name: "Spams envoyés", defaultValue: 0 },
    { name: "Stockage de données utilisé (Go)", defaultValue: 0 },
    { name: "Recherches web effectuées", defaultValue: 0 },
    { name: "Streaming vidéo regardé (heures)", defaultValue: 0 },
    { name: "Streaming vidéo fait (heures)", defaultValue: 0 },
    { name: "Visioconférence assistée (heures)", defaultValue: 0 },
    { name: "Téléchargement effectué (Go)", defaultValue: 0 },
  ];

  const [selectedElectronics, setSelectedElectronics] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(localStorageKey));
    return saved?.electronics || [];
  });

  const [usageData, setUsageData] = useState(() => {
    const saved = JSON.parse(localStorage.getItem(localStorageKey));
    return (
      saved?.usageData ||
      digitalActivities.reduce((acc, activity) => {
        acc[activity.name] = activity.defaultValue;
        return acc;
      }, {})
    );
  });

  useEffect(() => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ electronics: selectedElectronics, usageData })
    );
  }, [selectedElectronics, usageData]);

  const handleElectronicsChange = (item) => {
    const updatedElectronics = selectedElectronics.includes(item)
      ? selectedElectronics.filter((e) => e !== item)
      : [...selectedElectronics, item];
    setSelectedElectronics(updatedElectronics);
  };

  const handleUsageChange = (name, value) => {
    setUsageData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="quiz-container">
      <h2>Catégorie: Numérique - Habitudes et Consommation</h2>
      <div className="section">
        <h3>Achats appareils électroniques</h3>
        {electronics.map((item, index) => (
          <label key={index} className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedElectronics.includes(item)}
              onChange={() => handleElectronicsChange(item)}
            />
            {item}
          </label>
        ))}
      </div>
      <div className="section">
        <h3>Usage numérique hebdomadaire</h3>
        {digitalActivities.map((activity, index) => (
          <div key={index}>
            <label>
              {activity.name}
              <input
                type="number"
                value={usageData[activity.name]}
                onChange={(e) =>
                  handleUsageChange(activity.name, parseInt(e.target.value))
                }
                min="0"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitalHabitsQuiz;
