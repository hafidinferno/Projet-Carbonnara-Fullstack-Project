import React from "react";
import { useNavigate } from "react-router-dom";

import "../../CSS/Header.css";

function Header() {
  let navigate = useNavigate();
  function startTest() {
    navigate("/Test1");
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
    <header className="App App-header shadowed">
      <div className="circle-container">
        <button
          onClick={startTest}
          className="sub-circle shadowed"
          id="circle1"
        >
          TEST
        </button>
        <button
          onClick={GoResults}
          className="sub-circle shadowed"
          id="circle2"
        >
          RESULTS
        </button>
        <button onClick={GoAbout} className="sub-circle shadowed" id="circle3">
          About US
        </button>
        <button onClick={GoAccueil} className="circle shadowed">
          Accueil
        </button>
      </div>
      <h1>CARBONARA</h1>
    </header>
  );
}

export default Header;
