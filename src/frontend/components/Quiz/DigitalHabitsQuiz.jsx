import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const DigitalHabitsQuiz = () => {
  const localStorageKey = "digitalHabitsQuizAnswers";

  function handleSubmit() {

    const req = ['electromenager'];

    function executeSequentialRequests(endpoints, currentIndex, callback) {
      if (currentIndex >= endpoints.length) {

        if (callback) callback();
        return;
      }

      const endpoint = endpoints[currentIndex];
      const url = `https://localhost:3001/api/ecv/${endpoint}`;
      const data = localStorage.getItem("CarbonQuizElectro");
      console.log(data);

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ,
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('La requête a échoué');
            }
            return response.json();
          })
          .then(data => {
            // Traitez les données renvoyées par le serveur si nécessaire
            console.log('Réponse pour', endpoint, ':', data.endpoint);

            // Enregistrez les réponses dans le localStorage si nécessaire
            localStorage.setItem(data, JSON.stringify(data.endpoint));

            // Exécute la prochaine requête de manière séquentielle
            executeSequentialRequests(endpoints, currentIndex + 1, callback);
          })
          .catch(error => {
            console.error('Error:', error);
            // Vous pouvez gérer les erreurs ici si nécessaire
          });
    }

    // Démarrez l'exécution séquentielle des requêtes avec les endpoints
    executeSequentialRequests(req, 0, () => {
      console.log('Toutes les requêtes ont été exécutées avec succès !');
    });
  }

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
          {electronics.map((item) => (
              <label key={item} className="checkbox-label">
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
          {digitalActivities.map((activity) => (
              <div key={activity.key}>
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
        <button onClick={handleSubmit}>Soumettre le Quiz</button>
      </div>
  );
};

export default DigitalHabitsQuiz;
