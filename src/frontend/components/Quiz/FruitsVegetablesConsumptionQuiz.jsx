import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const FruitsVegetablesConsumptionQuiz = () => {
  const localStorageKey = "fruitsVegetablesConsumptionQuizAnswers";

  const fruitsAndVegetables = [
    "fraise",
    "pomme",
    "orange",
    "citron",
    "ail",
    "artichaut",
    "asperge",
    "betterave",
    "blette",
    "carotte",
    "celeri",
    "champignonmorille",
    "chou",
    "choudebruxelles",
    "choufleur",
    "concombre",
    "courge",
    "courgette",
    "cresson",
    "echalote",
    "endive",
    "epinard",
    "mangue",
    "fenouil",
    "haricotvert",
    "laitue",
    "mache",
    "navet",
    "mais",
    "oignon",
    "panais",
    "petitpois",
    "poireau",
    "poivron",
    "potiron",
    "radis",
    "salsifis",
    "topinambour",
    "cassis",
    "chataigne",
    "clementine",
    "pamplemousse",
    "coing",
    "figue",
    "groseille",
    "kiwi",
    "mandarine",
    "melon",
    "mure",
    "nectarine",
    "myrtille",
    "noisette",
    "noix",
    "prune",
    "reineclaude",
    "rhubarbe",
    "peche",
    "cerise",
    "abricot",
    "framboise",
    "poire",
    "raisin",
    "aubergine",
    "brocoli",
    "tomate",
    "ananas",
    "banane",
    "avocat",
    "carambole",
    "datte",
    "fruitdelapassion",
    "grenade",
    "kaki",
    "noixdecoco",
    "pasteque",
  ];

  const [selectedItems, setSelectedItems] = useState(() => {
    const saved = localStorage.getItem(localStorageKey);
    return saved
        ? JSON.parse(saved)
        : fruitsAndVegetables.reduce((acc, fruit) => {
          acc[fruit] = 0;
          return acc;
        }, {});
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [item]: prevState[item] === 0 ? 1 : 0, // Bascule la valeur entre 0 et 1
    }));
  };

  return (
      <div className="quiz-container">
        <h2>Catégorie: Fruits et Légumes</h2>
        <p>
          Parmi les fruits et légumes suivants, lesquels consommez-vous
          fréquemment (au moins une fois par mois)?
        </p>
        <div className="answers-section">
          {fruitsAndVegetables.map((item, index) => (
              <label key={index} className="checkbox-label">
                <input
                    type="checkbox"
                    checked={selectedItems[item] === 1}
                    onChange={() => handleCheckboxChange(item)}
                />
                {item}
              </label>
          ))}
        </div>
      </div>
  );
};

export default FruitsVegetablesConsumptionQuiz;
