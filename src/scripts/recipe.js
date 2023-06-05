// Получение параметра recipeId из URL
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("id");

// Функция для получения данных о рецепте по его id
async function getRecipeDetails() {
  try {
    const apiKey = "76715944e8164430a232c8576f5e2ed6";
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Произошла ошибка при получении данных о рецепте:", error);
    return null;
  }
}

// Функция для отображения данных о рецепте на странице
function displayRecipeDetails(recipe) {
  const recipeContainer = document.getElementById("recipe-container");

  const recipeTitle = document.createElement("h2");
  recipeTitle.textContent = recipe.title;

  const recipeImage = document.createElement("img");
  recipeImage.src = recipe.image;
  recipeImage.alt = recipe.title;

  const recipeDescription = document.createElement("p");
  recipeDescription.textContent = recipe.instructions;

  recipeContainer.appendChild(recipeTitle);
  recipeContainer.appendChild(recipeImage);
  recipeContainer.appendChild(recipeDescription);
}

// Вызов функции для получения и отображения данных о рецепте
getRecipeDetails()
  .then((recipe) => {
    if (recipe) {
      displayRecipeDetails(recipe);
    } else {
      // Обработка случая, когда не удалось получить данные о рецепте
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Не удалось загрузить данные о рецепте.";
      recipeContainer.appendChild(errorMessage);
    }
  })
  .catch((error) => {
    console.log("Произошла ошибка:", error);
  });
