import React from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/Header.css";
import imageHome from "./../../images/header/home.png";
import imageResultat from "./../../images/header/resultat.png";
import imageTest from "./../../images/header/test.png";
import imageTeam from "./../../images/header/team.png";

function Header() {
  const navigate = useNavigate();

  // Navigates to the start of the test, potentially restoring the last saved state or starting fresh
  function startTest() {
    // Optionally, determine if you want to start from the beginning or from a saved state
    navigate("/Test1");
  }

  // Navigation function for the home page
  function GoAccueil() {
    navigate("/Accueil");
  }

  // Resets the progression and navigates to the Results page
  function GoResults() {
    // Clear stored progress information
    localStorage.removeItem("currentLevel");
    localStorage.removeItem("currentCategoryIndex");

    // Navigate to the Results page
    navigate("/Results");
  }

  // Navigation function for the About Us page
  function GoAbout() {
    navigate("/AboutUs");
  }

  return (
    <header className="App App-header shadowed">
      <div id="div-header">
        <h1>CARBONARA</h1>
        <div className="circle-container">
          <button onClick={GoAccueil} className="circle shadowed">
            <img src={imageHome} alt="Home" className="sub-circle-content" />
          </button>
          <button
            onClick={startTest}
            className="sub-circle shadowed"
            id="circle1"
          >
            <img
              src={imageTest}
              alt="Start Test"
              className="sub-circle-content"
            />
          </button>
          <button
            onClick={GoResults}
            className="sub-circle shadowed"
            id="circle2"
          >
            <img
              src={imageResultat}
              alt="Results"
              className="sub-circle-content"
            />
          </button>
          <button
            onClick={GoAbout}
            className="sub-circle shadowed"
            id="circle3"
          >
            <img
              src={imageTeam}
              alt="About Us"
              className="sub-circle-content"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
