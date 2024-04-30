import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "../CSS/Accueil.css";

function Accueil() {
  const navigate = useNavigate(); // Instantiate the navigate function

  function startTest() {
    navigate("/Test1"); // Navigate to the Test1 page
  }

  return (
    <main>
      <section className="info">
        <div className="container-main">
          <h2>Calculer votre empreinte carbone</h2>
          <p>Découvrez comment votre mode de vie affecte l'environnement et apprenez comment réduire votre empreinte carbone.</p>
          <button className="start-test big-button" onClick={startTest}>Commencer le test</button> {/* Add onClick handler */}
        </div>
      </section>
    </main>
  );
}

export default Accueil;
