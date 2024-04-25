import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const FruitsVegetablesConsumptionQuiz = () => {
  const localStorageKey = "fruitsVegetablesConsumptionQuizAnswers";

  const fruitsAndVegetables = [
    "Fraise",
    "Pomme",
    "Orange",
    "Citron",
    "Ail",
    "Artichaut",
    "Asperge",
    "Betterave",
    "Blette",
    "Carotte",
    "Céleri",
    "Champignon (morille crue)",
    "Chou",
    "Chou de Bruxelles",
    "Chou-fleur",
    "Concombre",
    "Courge",
    "Courgette",
    "Cresson",
    "Échalote",
    "Endive",
    "Épinard",
    "Mangue",
    "Fenouil",
    "Haricot vert",
    "Laitue",
    "Mâche",
    "Navet",
    "Maïs",
    "Oignon",
    "Panais",
    "Petit pois",
    "Poireau",
    "Poivron",
    "Potiron",
    "Radis",
    "Salsifis",
    "Topinambour",
    "Cassis",
    "Châtaigne",
    "Clémentine",
    "Pamplemousse",
    "Coing",
    "Figue",
    "Groseille",
    "Kiwi",
    "Mandarine",
    "Melon",
    "Mûre",
    "Nectarine",
    "Myrtille",
    "Noisette",
    "Noix",
    "Prune",
    "Reine Claude",
    "Rhubarbe",
    "Pêche",
    "Cerise",
    "Abricot",
    "Framboise",
    "Poire",
    "Raisin",
    "Aubergine",
    "Brocoli",
    "Tomate",
    "Ananas",
    "Banane",
    "Avocat",
    "Carambole",
    "Datte",
    "Fruit de la passion",
    "Grenade",
    "Kaki",
    "Noix de coco",
    "Pastèque",
  ];

  const [selectedItems, setSelectedItems] = useState(() => {
    const saved = localStorage.getItem(localStorageKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleCheckboxChange = (item) => {
    const updatedSelections = selectedItems.includes(item)
      ? selectedItems.filter((selected) => selected !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedSelections);
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
              checked={selectedItems.includes(item)}
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
