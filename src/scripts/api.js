const apiKey = "76715944e8164430a232c8576f5e2ed6";
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

async function getRecipes() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error while loading API:", error);
    return [];
  }
}

function displayRecipes(recipes) {
  const recipeContainer = document.getElementById("recipe-container");

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    const recipeTitle = document.createElement("h2");
    recipeTitle.textContent = recipe.title;

    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.title;

    const viewRecipeButton = document.createElement("button");
    viewRecipeButton.classList.add("ui-btn");
    viewRecipeButton.textContent = "Show recipe";

    viewRecipeButton.addEventListener("click", () => {
      redirectToRecipePage(recipe.id);
    });

    recipeCard.appendChild(recipeTitle);
    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(viewRecipeButton);
    recipeContainer.appendChild(recipeCard);
  });
}

getRecipes()
  .then((recipes) => {
    displayRecipes(recipes);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

function redirectToRecipePage(recipeId) {
  window.location.href = `recipe.html?id=${recipeId}`;
}
