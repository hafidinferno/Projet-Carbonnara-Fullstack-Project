import React from "react";
import "../../CSS/Navigation.css";

const NavigationPanel = () => {
  return (
    <div className="navigation-panel">
      <h1>Navigation</h1>
      <div className="category">
        <h3>Catégorie 1</h3>
        <ul>
          <li>Question 1</li>
          <li>Question 2</li>
          <li>Question 3</li>
        </ul>
      </div>
      <div className="category">
        <h3>Catégorie 2</h3>
        <ul>
          <li>Question 4</li>
          <li>Question 5</li>
          <li>Question 6</li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationPanel;
