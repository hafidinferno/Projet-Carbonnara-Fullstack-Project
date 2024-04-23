import React from "react";
import Header from "../components/header/Header";



function Accueil() {
  return (
    <><Header />
      <div>
        <img src="/src/images/Accueil/calculerBilanCarbone.png" />
        <button className="StartTest" >
          Commencer le test
        </button>
      </div>
    </>
  );
}

export default Accueil;
