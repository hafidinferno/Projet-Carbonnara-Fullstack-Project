import React, { useState, useEffect } from "react";
import "../../CSS/ProgressionBar.css";
import { useNavigate } from "react-router-dom";
import data from "../../Controleur/data";

function ProgressionBar({ level, setCurrentLevel }) {
  const navigate = useNavigate();
  const totalCategories = data.length;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(() => {
    const savedCategoryIndex = localStorage.getItem("currentCategoryIndex");
    return savedCategoryIndex ? parseInt(savedCategoryIndex, 10) : null;
  });
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const currentCategoryIndex = React.useMemo(() => {
    const savedCategoryIndex = localStorage.getItem("currentCategoryIndex");
    if (savedCategoryIndex) {
      return parseInt(savedCategoryIndex, 10);
    } else {
      return data.findIndex((category, index) => {
        const startLevel = data
            .slice(0, index)
            .reduce((acc, cur) => acc + cur.levels.length, 0);
        const endLevel = startLevel + category.levels.length;
        return level >= startLevel && level < endLevel;
      });
    }
  }, [level]);

  useEffect(() => {
    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel !== null) {
      setCurrentLevel(parseInt(savedLevel, 10));
    }
  }, [setCurrentLevel]);

  const navigateToLevel = (catIndex, levelIndex) => {
    const level =
        data.slice(0, catIndex).reduce((acc, cur) => acc + cur.levels.length, 0) +
        levelIndex;
    setCurrentLevel(level);
    localStorage.setItem("currentLevel", level.toString());
    localStorage.setItem("currentCategoryIndex", catIndex.toString());
    navigate(`/Test${catIndex + 1}?level=${level}`);
  };

  // Calcule la largeur de chaque segment en fonction de la progression de l'utilisateur
  const calculateSegmentWidth = (catIndex) => {
    const totalLevelsBeforeCategory = data
        .slice(0, catIndex)
        .reduce((acc, cur) => acc + cur.levels.length, 0);
    const currentLevelInCategory = Math.max(
        0,
        level - totalLevelsBeforeCategory
    );
    const categoryLevels = data[catIndex].levels.length;
    const widthPercentage = (currentLevelInCategory / categoryLevels) * 100;
    return widthPercentage + "%";
  };

  const navigateToCategory = (catIdx) => {
    const level = data
        .slice(0, catIdx)
        .reduce((acc, cur) => acc + cur.levels.length, 0);
    setCurrentLevel(level);
    localStorage.setItem("currentCategoryIndex", catIdx.toString()); // Sauvegarder l'index de la catégorie actuelle
    navigate(`/Test${catIdx + 1}?level=${level}`);
  };

  const handleMouseEnter = (index) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setSelectedCategoryIndex(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setSelectedCategoryIndex(null);
    }, 1000); // 500ms delay before hiding questions
    setHoverTimeout(timeout);
  };

  return (
      <div className="pb-wrapper">
        <div className="progress-visual-bar-container">
          {data.map((category, index) => (
              <div
                  key={index}
                  className={`progress-visual-bar-segment ${
                      index <= selectedCategoryIndex ? "active" : ""
                  }`}
                  style={{ width: calculateSegmentWidth(index) }}
                  onMouseEnter={() => handleMouseEnter(index)}
              >
                <div className="segment-text">{category.cat_name}</div>
              </div>
          ))}
        </div>
        {selectedCategoryIndex !== null && (
            <div className="questions-container">
              {data[selectedCategoryIndex].levels.map((_, index) => (
                  <button
                      key={index}
                      className="question-button"
                      onClick={() => navigateToLevel(selectedCategoryIndex, index)}
                  >
                    Question {index + 1}
                  </button>
              ))}
            </div>
        )}
        {selectedCategoryIndex !== null && (
            <>
              <div className="navigation-buttons">
                <button
                    onClick={() =>
                        navigateToCategory(Math.max(currentCategoryIndex - 1, 0))
                    }
                    disabled={currentCategoryIndex === 0}
                >
                  Précédent
                </button>
                <button
                    onClick={() =>
                        navigateToCategory(
                            Math.min(currentCategoryIndex + 1, totalCategories - 1)
                        )
                    }
                    disabled={currentCategoryIndex >= totalCategories - 1}
                >
                  Suivant
                </button>
              </div>
            </>
        )}
      </div>
  );
}

export default ProgressionBar;
