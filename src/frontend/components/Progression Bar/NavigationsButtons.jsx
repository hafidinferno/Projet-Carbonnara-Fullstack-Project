import React from "react";
import { useCategoryContext } from "./CategoryContext";

function NavigationButtons() {
  const { currentCategoryIndex, setCurrentCategoryIndex, totalCategories } =
    useCategoryContext();

  const navigateToCategory = (newIndex) => {
    if (newIndex < 0 || newIndex >= totalCategories) return; // Prevent out-of-bounds navigation
    setCurrentCategoryIndex(newIndex);
    // Add navigation logic if needed
  };

  return (
    <div className="navigation-buttons">
      <button
        onClick={() => navigateToCategory(currentCategoryIndex - 1)}
        disabled={currentCategoryIndex === 0}
      >
        Précédent
      </button>
      <button
        onClick={() => navigateToCategory(currentCategoryIndex + 1)}
        disabled={currentCategoryIndex >= totalCategories - 1}
      >
        Suivant
      </button>
    </div>
  );
}

export default NavigationButtons;
