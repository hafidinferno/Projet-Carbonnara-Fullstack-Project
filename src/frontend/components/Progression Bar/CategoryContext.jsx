import React, { createContext, useState, useContext } from "react";

// Create a context object
const CategoryContext = createContext();

// Custom hook to use the context
export const useCategoryContext = () => useContext(CategoryContext);

// Provider component that wraps children components and provides context
export const CategoryProvider = ({ children }) => {
  // State to keep track of the current category index
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  // Total number of categories, assumed to be a fixed number for now
  const totalCategories = 10;

  return (
    <CategoryContext.Provider
      value={{ currentCategoryIndex, setCurrentCategoryIndex, totalCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
