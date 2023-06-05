const apiKey = "76715944e8164430a232c8576f5e2ed6";
const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

function fetchData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Произошла ошибка при получении данных из API");
        }
        return response.json();
      })
      .then((data) => resolve(data.results))
      .catch((error) => reject(error));
  });
}

function displayRecipesNumber(recipes, count) {
  const recipeContainer = document.querySelector(".recipes");
  recipeContainer.innerHTML = "";

  const limitedRecipes = recipes.slice(0, count);

  limitedRecipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipes__item");

    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.title;

    const recipeTitle = document.createElement("p");
    recipeTitle.classList.add("name");
    const truncatedTitle =
      recipe.title.length > 40
        ? recipe.title.substring(0, 40) + "..."
        : recipe.title;
    recipeTitle.textContent = truncatedTitle;

    const recipeLink = document.createElement("a");
    recipeLink.classList.add("ui-btn");
    recipeLink.href = `recipe.html?id=${recipe.id}`;
    recipeLink.textContent = "Show recipes";
    recipeLink.addEventListener("click", () => {
      showRecipeDetails(recipe.id);
    });

    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeTitle);
    recipeCard.appendChild(recipeLink);
    recipeContainer.appendChild(recipeCard);
  });
}

function showRecipeList() {
  fetchData(apiUrl)
    .then((recipes) => {
      displayRecipesNumber(recipes, 3);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

showRecipeList();
