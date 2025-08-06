import React, { useState } from "react";
import IngredientInput from "./components/IngredientInput";
import { fetchRecipes } from "./api/spoonacular";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const handleFetchRecipes = async () => {
    const data = await fetchRecipes(ingredients);
    setRecipes(data);
  };

  return (
    <div>
      <h1>What Can I Cook With This?</h1>
      <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />
      <button onClick={handleFetchRecipes}>Find Recipes</button>
      <div className="recipes">
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} width={150} />
            <a href={`https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}`} target="_blank" rel="noopener noreferrer">
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;