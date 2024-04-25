import React, { useState } from "react";
import "../../CSS/CategoryPanel.css";

const CategoryPanel = ({ category, questions }) => {
  return (
    <div className="category-panel">
      <h2>{category}</h2>
      {questions.map((item, index) => (
        <div key={index} className="question">
          <h3>{item.question}</h3>
          {item.answers.map((answer, answerIndex) => (
            <div key={answerIndex} className="answer">
              {answer}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CategoryPanel;
