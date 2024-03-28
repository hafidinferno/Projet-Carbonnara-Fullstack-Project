import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Accueil.css";
import Header from "../components/header/Header";

function Accueil() {
  let navigate = useNavigate();
  function startTest() {
    // Define what happens when the test starts
    navigate("/hello"); // Navigate to the HelloPage route
  }
  return (
    <div className="App">
      <Header />
      <div>
        <button className="StartTest" onClick={startTest}>
          Commencer le test
        </button>
      </div>
    </div>
  );
}

export default Accueil;
