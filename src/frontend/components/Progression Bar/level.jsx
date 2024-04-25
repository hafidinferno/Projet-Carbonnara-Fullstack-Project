// Level.js
import React from "react";

const Level = ({ level, currentLevel }) => {
  return (
    <div className={`level ${currentLevel === level ? "active" : ""}`}>
      {level}
    </div>
  );
};

export default Level;
