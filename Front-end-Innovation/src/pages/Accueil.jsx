import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Accueil.css";
import Header from "../components/header/Header";

function Accueil() {
  return (
    <div className="App">
      <Header />
      <div>
        <button className="StartTest">Commencer le test</button>
      </div>
    </div>
  );
}

export default Accueil;
