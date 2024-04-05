import React from "react";
import { useNavigate } from "react-router-dom";

import "../../CSS/Header.css";


function Header() {
  let navigate = useNavigate();
  function startTest() {
    navigate("/Test");
  }
  function GoAccueil() {
    navigate("/Accueil");
  }
  function GoResults() {
    navigate("/Results");
  }
  function GoAbout() {
    navigate("/AboutUs");
  }

  return (
    <header className="App App-header">
      <h1>CARBONARA</h1>
      <div className="circle-container">
        <button onClick={GoAccueil} className="circle">
          Accueil
        </button>
        <button onClick={startTest} className="sub-circle" id="circle1">
          TEST
        </button>
        <button onClick={GoResults} className="sub-circle" id="circle2">
          RESULTS
        </button>
        <button onClick={GoAbout} className="sub-circle" id="circle3">
          About US
        </button>
      </div>
    </header>
  );
}

export default Header;
