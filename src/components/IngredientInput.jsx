import React, { useState } from "react";

const IngredientInput = ({ ingredients, setIngredients }) => {
  const [input, setInput] = useState("");

  const addIngredient = () => {
    if (input.trim() !== "") {
      setIngredients([...ingredients, input.trim()]);
      setInput("");
    }
  };

  const removeIngredient = (idx) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter an ingredient"
      />
      <button onClick={addIngredient}>Add</button>
      <ul>
        {ingredients.map((item, idx) => (
          <li key={idx}>
            {item} <button onClick={() => removeIngredient(idx)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientInput;