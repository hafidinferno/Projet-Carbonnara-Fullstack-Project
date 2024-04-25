import React, { useState, useEffect } from "react";
import "../../CSS/ProgressionBar.css";

export default function Progressbar() {
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (filled < 100 && isRunning) {
      timer = setTimeout(() => setFilled((prev) => prev + 2), 50);
    } else if (filled >= 100) {
      setIsRunning(false); // Automatically stop when filled reaches 100%
    }
    return () => clearTimeout(timer); // Cleanup the timeout
  }, [filled, isRunning]);

  const handleRunClick = () => {
    setIsRunning((prev) => !prev); // Toggle running state
  };

  const handleResetClick = () => {
    setFilled(0);
    setIsRunning(false); // Stop and reset the progress
  };

  return (
    <div>
      <div className="progressbar">
        <div
          style={{
            height: "100%",
            width: `${filled}%`,
            backgroundColor: "#a66cff",
            transition: "width 0.5s",
          }}
        ></div>
        <span className="progressPercent">{filled}%</span>
      </div>
    </div>
  );
}
