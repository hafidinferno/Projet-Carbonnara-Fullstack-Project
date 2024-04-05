import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";

import "../CSS/App.css";


function Accueil() {
  return (
      <div className="App">
        <Header />
      <div>
      <img src="/src/images/Accueil/calculerBilanCarbone.png"/>
        <button className="StartTest" onClick={startTest}>
          Commencer le test
        </button>
      </div>
    </div>
  );
}

export default Accueil;
