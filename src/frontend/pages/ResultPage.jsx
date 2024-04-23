import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultPage = () => {
  const results = JSON.parse(localStorage.getItem("quizResults")) || [];

  const data = {
    labels: results.map((_, index) => `Question ${index + 1}`),
    datasets: [
      {
        label: "Empreinte Carbone",
        data: results.map((result) => result.score),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#C9CBCF",
          "#FF9F40",
        ],
        hoverOffset: 4,
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
        text: "Répartition des Scores d'Empreinte Carbone",
      },
    },
  };

  // Fonction pour générer des conseils basés sur les scores
  const generateAdvice = (scores) => {
    // Implémentez votre logique ici pour générer des conseils personnalisés
    return "Conseils pour améliorer votre empreinte carbone: [...]";
  };

  if (results.length === 0) {
    return <p>Aucun résultat disponible. Veuillez compléter le quiz.</p>;
  }

  return (
    <div>
      <h2>Résultats de votre Empreinte Carbone</h2>
      <Doughnut data={data} options={options} />
      <div>
        <h3>Conseils</h3>
        <p>{generateAdvice(results.map((result) => result.score))}</p>
      </div>
    </div>
  );
};

export default ResultPage;
