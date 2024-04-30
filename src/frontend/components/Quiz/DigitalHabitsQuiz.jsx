import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const DigitalHabitsQuiz = () => {
  const localStorageKey = "digitalHabitsQuizAnswers";

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const electronics = [
    "smartphone",
    "tablette",
    "liseuse",
    "montreconnectee",
    "appareilphotoreflex",
    "appareilphotocompact",
    "ordinateurfixebureautique",
    "ordinateurfixeperformant",
    "ordinateurportable",
    "consoledesalon",
    "consoleportable",
    "ecran215pouce",
    "ecran24pouce",
    "chainehifi",
    "enceintebluetooth",
    "barredeson",
    "television",
    "homecinema",
    "modemfibre",
    "imprimante",
  ];

  const digitalActivities = [
    { key: "emailenvoye", name: "Emails envoyés", defaultValue: 0 },
    { key: "emailrecu", name: "Emails reçus", defaultValue: 0 },
    { key: "spamrecu", name: "Spams reçus", defaultValue: 0 },
    { key: "spamenvoye", name: "Spams envoyés", defaultValue: 0 },
    {
      key: "stockagedonnee",
      name: "Stockage de données utilisé (Go)",
      defaultValue: 0,
    },
    {
      key: "rechercheweb",
      name: "Recherches web effectuées",
      defaultValue: 0,
    },
    {
      key: "streamingvideofait",
      name: "Streaming vidéo regardé (heures)",
      defaultValue: 0,
    },
    {
      key: "streamingvideoregarde",
      name: "Streaming vidéo fait (heures)",
      defaultValue: 0,
    },
    {
      key: "visioconference",
      name: "Visioconférence assistée (heures)",
      defaultValue: 0,
    },
    {
      key: "telechargement",
      name: "Téléchargement effectué (Go)",
      defaultValue: 0,
    },
  ];

  const [selectedElectronics, setSelectedElectronics] = useState(() => {
    const saved = localStorage.getItem(localStorageKey);
    try {
      const parsed = JSON.parse(saved);
      return parsed ? parsed.electronics : defaultElectronicsState();
    } catch (e) {
      console.error("Error parsing electronics from localStorage:", e);
      return defaultElectronicsState();
    }
  });

  const [usageData, setUsageData] = useState(() => {
    const saved = localStorage.getItem(localStorageKey);
    try {
      const parsed = JSON.parse(saved);
      return parsed ? parsed.usageData : defaultUsageState();
    } catch (e) {
      console.error("Error parsing usage data from localStorage:", e);
      return defaultUsageState();
    }
  });

  // Helper functions to set default states
  function defaultElectronicsState() {
    return electronics.reduce((acc, device) => {
      acc[device] = 0;
      return acc;
    }, {});
  }

  function defaultUsageState() {
    return digitalActivities.reduce((acc, activity) => {
      acc[activity.key] = activity.defaultValue;
      return acc;
    }, {});
  }

  useEffect(() => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ electronics: selectedElectronics, usageData })
    );
  }, [selectedElectronics, usageData]);

  const handleElectronicsChange = (device) => {
    setSelectedElectronics((prevState) => ({
      ...prevState,
      [device]: prevState[device] === 0 ? 1 : 0,
    }));
  };

  const handleUsageChange = (key, value) => {
    setUsageData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="quiz-container">
      <h2>Catégorie: Numérique - Habitudes et Consommation</h2>
      <div className="section">
        <h3>Achats appareils électroniques</h3>
        {electronics.map((item, index) => (
          <label key={item} className="checkbox-label" id={`question${index}`}>
            <input
              type="checkbox"
              checked={selectedElectronics[item] === 1}
              onChange={() => handleElectronicsChange(item)}
            />
            {item}
          </label>
        ))}
      </div>
      <div className="section">
        <h3>Usage numérique hebdomadaire</h3>
        {digitalActivities.map((activity, index) => (
          <div key={activity.key} id={`question${index}`}>
            <label>
              {activity.name}
              <input
                type="number"
                value={usageData[activity.key]}
                onChange={(e) =>
                  handleUsageChange(
                    activity.key,
                    parseInt(e.target.value, 10) || 0
                  )
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
