const API_KEY = process.env.REACT_APP_SPOONACULAR_KEY;

export const fetchRecipes = async (ingredients) => {
  const query = ingredients.join(",");
  const response = await fetch(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=6&apiKey=${API_KEY}`
  );
  return response.json();
};