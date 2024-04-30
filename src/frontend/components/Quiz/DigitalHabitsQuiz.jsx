import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";
import { useNavigate } from "react-router-dom";
const DigitalHabitsQuiz = () => {
  const navigate = useNavigate();
  const localStorageKey = "digitalHabitsQuizAnswers";

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  function handleSubmit() {
    const requete = [
      "electromenager",
      "boissons",
      "eaux",
      "repas",
      "fruitsetlegumes",
      "transport",
      "numerique",
      "usagenumerique",
      "chauffage",
      "mobilier",
    ];
    const objet = [
      'localStorage.getItem("CarbonQuizElectro")',
      'JSON.stringify(JSON.parse(localStorage.getItem("CarbonFootprintBoisson"))[1])',
      'JSON.stringify(JSON.parse(localStorage.getItem("CarbonFootprintBoisson"))[0])',
      'JSON.stringify(JSON.parse(localStorage.getItem("carbonFootprintQuizAnswers"))[0])',
      'localStorage.getItem("fruitsVegetablesConsumptionQuizAnswers")',
      'localStorage.getItem("dailyTransportQuizAnswers")',
      'JSON.stringify(JSON.parse(localStorage.getItem("digitalHabitsQuizAnswers") || "{}").electronics)',
      'JSON.stringify(JSON.parse(localStorage.getItem("digitalHabitsQuizAnswers") || "{}").usageData)',
      'localStorage.getItem("chauffageQuiz")',
      'localStorage.getItem("carbonFootprintMeuble")',
    ];

    function executeSequentialRequests(routesApi, currentIndex, callback) {
      if (currentIndex >= routesApi.length) {
        if (callback) callback();
        return;
      }

      const adresse = routesApi[currentIndex];
      const url = `https://localhost:3001/api/ecv/${adresse}`;
      const data1 = eval(objet[currentIndex]);
      console.log(objet[currentIndex], routesApi[currentIndex]);
      console.log(data1, "-----------------");

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data1,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("La requête a échoué");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Réponse pour", adresse, ":", data[adresse]);

          localStorage.setItem(adresse, data[adresse]);

          // Exécute la prochaine requête de manière séquentielle
          executeSequentialRequests(routesApi, currentIndex + 1, callback);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    executeSequentialRequests(requete, 0, () => {
      console.log("Toutes les requêtes ont été exécutées avec succès !");

      navigate("/Results"); // Redirige vers la page de résultats
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
      <div id="submit-quiz-wrapper">
        <button id="submit-quiz" onClick={handleSubmit}>Soumettre le Quiz</button>
      </div>
    </div>
  );
};

export default DigitalHabitsQuiz;
