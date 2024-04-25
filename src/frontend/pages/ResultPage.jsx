import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import "../CSS/ResultPage.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const ResultPage = () => {
  const beverageResults =
    JSON.parse(localStorage.getItem("CarbonFootprintBoisson")) || [];
  const mealResults =
    JSON.parse(localStorage.getItem("carbonFootprintQuizAnswers")) || [];

  // Process beverage data
  const beverageTotals =
    beverageResults.length > 1 && beverageResults[1]
      ? Object.entries(beverageResults[1]).reduce((acc, [key, value]) => {
          const multiplier =
            value *
            (key === "Soda"
              ? 0.3
              : key === "Vin"
              ? 0.2
              : key === "Bière"
              ? 0.25
              : key === "Lait (animal)"
              ? 0.15
              : key === "Lait de soja"
              ? 0.1
              : key === "Thé"
              ? 0.05
              : key === "Café"
              ? 0.1
              : 0);
          acc[key] = multiplier;
          return acc;
        }, {})
      : {};

  // Process meal data
  const mealTotals =
    mealResults.length > 0 && mealResults[0]
      ? Object.entries(mealResults[0]).reduce((acc, [foodName, quantity]) => {
          const multiplier =
            quantity *
            (foodName === "Bœuf"
              ? 2.5
              : foodName === "Poulet"
              ? 0.5
              : foodName === "Poisson blanc"
              ? 0.8
              : foodName === "Poisson gras"
              ? 1.2
              : foodName === "Végétarien"
              ? 0.2
              : foodName === "Végétalien"
              ? 0.1
              : 0);
          acc[foodName] = (acc[foodName] || 0) + multiplier;
          return acc;
        }, {})
      : {};

  const waterData = {
    labels: ["Eau plate", "Eau en bouteille"],
    datasets: [
      {
        label: "Pourcentage de consommation d'eau",
        data:
          beverageResults.length > 0
            ? [
                beverageResults[0].Pourcentage_eau_plate,
                beverageResults[0].Pourcentage_eau_bouteille,
              ]
            : [0, 0],
        backgroundColor: ["#36A2EB", "#51D2A5"],
        hoverOffset: 4,
      },
    ],
  };

  const beverageData = {
    labels: Object.keys(beverageTotals),
    datasets: [
      {
        label: "Empreinte Carbone des Boissons (kg CO2)",
        data: Object.values(beverageTotals),
        backgroundColor: "#FFCE56",
      },
    ],
  };

  const foodConsumptionData = {
    labels: Object.keys(mealTotals),
    datasets: [
      {
        label: "Empreinte Carbone des Repas (kg CO2)",
        data: Object.values(mealTotals),
        backgroundColor: "#FFA07A",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "", // Title set dynamically below
      },
    },
  };

  if (!beverageResults.length && !mealResults.length) {
    return <p>Aucun résultat disponible. Veuillez compléter le quiz.</p>;
  }

  return (
    <div className="result-container">
      <h2>Résultats de Votre Empreinte Carbone des Boissons et Repas</h2>
      <div className="chart-container">
        <Doughnut
          data={waterData}
          options={{
            ...options,
            title: {
              ...options.title,
              text: "Répartition de la consommation d'eau",
            },
          }}
        />
      </div>
      <div className="chart-container">
        <Bar
          data={beverageData}
          options={{
            ...options,
            title: { ...options.title, text: "Empreinte Carbone des Boissons" },
          }}
        />
      </div>
      <div className="chart-container">
        <Bar
          data={foodConsumptionData}
          options={{
            ...options,
            title: { ...options.title, text: "Empreinte Carbone des Repas" },
          }}
        />
      </div>
    </div>
  );
};

export default ResultPage;
