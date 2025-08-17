import React, { useState } from "react";
import IngredientInput from "../components/IngredientInput.jsx";
import { fetchRecipes } from "../api/spoonacular";
import CircleTitle from "../components/CircleTitle";
import IngredientFloat from "../components/IngredientFloat";
import apple from "../assets/svg_food_icons/apple.svg";
import banana from "../assets/svg_food_icons/banana.svg";
import beet from "../assets/svg_food_icons/beet.svg";
import broccoli from "../assets/svg_food_icons/broccoli.svg";
import bread from "../assets/svg_food_icons/bread.svg";
import carrot from "../assets/svg_food_icons/carrot.svg";
import cheese from "../assets/svg_food_icons/cheese.svg";
import cherry from "../assets/svg_food_icons/cherry.svg";
import chicken from "../assets/svg_food_icons/chicken.svg";
import corn from "../assets/svg_food_icons/corn.svg";
import egg from "../assets/svg_food_icons/egg.svg";
import fish from "../assets/svg_food_icons/fish.svg";
import garlic from "../assets/svg_food_icons/garlic.svg";
import paprika from "../assets/svg_food_icons/paprika.svg";
import pear from "../assets/svg_food_icons/pear.svg";
import milk from "../assets/svg_food_icons/milk.svg";
import orange from "../assets/svg_food_icons/orange.svg";
import lemon from "../assets/svg_food_icons/lemon.svg";
import pineapple from "../assets/svg_food_icons/pineapple.svg";
import strawberry from "../assets/svg_food_icons/strawberry.svg";
import shrimp from "../assets/svg_food_icons/shrimp.svg";
import steak from "../assets/svg_food_icons/steak.svg";
import tomato from "../assets/svg_food_icons/tomato.svg";
import turnip from "../assets/svg_food_icons/turnip.svg";
import watermelon from "../assets/svg_food_icons/watermelon.svg";
import wheat from "../assets/svg_food_icons/wheat.svg";



function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  // MUST match your CircleTitle radius prop
  const TITLE_RADIUS = 170;
  const BOX = TITLE_RADIUS * 2;

  const handleFetchRecipes = async () => {
    const data = await fetchRecipes(ingredients);
    setRecipes(data);
  };

  return (
    <div>
      {/* Shared square so the title circle and fruit share the exact same center */}
      <div style={{ width: BOX, height: BOX, margin: "24px auto", position: "relative" }}>
        {/* Title in the square */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <CircleTitle radius={TITLE_RADIUS} />
        </div>

        {/* Fruit sequence begins AFTER the title finishes; floats straight up from bottom */}
        <div style={{ position: "absolute", inset: 0 }}>
          <IngredientFloat
            icons={[apple, banana, beet, broccoli, bread, carrot, cheese, cherry, chicken, corn, egg, fish, garlic, paprika, pear, milk, orange, lemon, pineapple, strawberry, shrimp, steak, tomato, turnip, watermelon, wheat]}
            boxSize={BOX}
            size={100}
            startDelayMs={1500}   // wait for title to finish, then start
            durationMs={1200}
            holdMs={800}
            fadeMs={500}
            // one-at-a-time is default (stagger = duration+hold+fade)
            startFromPx={160}     // start lower if you want a longer float
            centerYOffset={0}     // nudge if needed
            loop={true}
          />
        </div>
      </div>

      <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />
      <button onClick={handleFetchRecipes}>Find Recipes</button>

      <div className="recipes">
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} width={150} />
            <a
              href={`https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;