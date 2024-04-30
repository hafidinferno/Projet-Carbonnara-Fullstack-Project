import React, { useState, useEffect } from "react";
import "../../CSS/Carboon.css";

const CarbonFootprintMeuble = () => {
    const localStorageKey = "carbonFootprintMeuble";

    // Only include relevant questions for furniture
    const question = {
        category: "Meuble",
        questionText:
            "Parmi les meubles suivants, lesquels avez-vous acheté cette année et en quelle quantité ?",
        foods: [
            { name: "Canapés convertibles", key: 'canapeconvertible' },
            { name: "Chaises en bois", key: 'chaiseenbois' },
            { name: "Tables en bois", key: 'tableenbois' },
            { name: "Canapés textiles", key: 'canapetextile' },
            { name: "Armoires", key: 'armoire' },
            { name: "Lits", key: 'lit' },
        ],
    };

    const [selectedAnswers, setSelectedAnswers] = useState(() => {
        const savedAnswers = localStorage.getItem(localStorageKey);
        return savedAnswers ? JSON.parse(savedAnswers) : question.foods.reduce((acc, food) => {
            acc[food.key] = 0;
            return acc;
        }, {});
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(selectedAnswers));
    }, [selectedAnswers]);

    const handleFoodInput = (foodKey, value) => {
        const newAnswers = { ...selectedAnswers };
        const numericValue = value ? parseInt(value, 10) : 0;
        newAnswers[foodKey] = numericValue;
        setSelectedAnswers(newAnswers);
    };

    return (
        <div className="quiz-container">
            <h2>Bilan Carbone de Vos Achats de Meubles</h2>
            <div className="question-section">
                <h3>Sub_catégorie: Meuble</h3>
                <p>{question.questionText}</p>
                <div className="answers-section">
                    {question.foods.map((food) => (
                        <div key={food.key}>
                            <label>
                                {food.name}:
                                <input
                                    type="number"
                                    value={selectedAnswers[food.key]}
                                    onChange={(e) => handleFoodInput(food.key, e.target.value)}
                                />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarbonFootprintMeuble;
