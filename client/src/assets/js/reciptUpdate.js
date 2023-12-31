import axios from "axios";
import axiosInstance from "./api";

// Checks if a given ingredient is in an array of ingredients
function isIngredientInArray(array, ingredientToCheck) {
  console.log(array);
  console.log(ingredientToCheck);
  return array.some(
    (element) =>
      element.name === ingredientToCheck.name &&
      element.calories === ingredientToCheck.calories &&
      element.fat === ingredientToCheck.fat &&
      element.carbohydrates === ingredientToCheck.carbohydrates &&
      element.protein === ingredientToCheck.protein
  );
}

// Creates a new recipe using the API
const createReciptApi = async (recipt, image) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name", recipt.name);
  formData.append("description", recipt.description);
  formData.append("directions", recipt.directions);
  if (image) {
    formData.append("image", image);
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": undefined,
    },
  };
  const response = await axiosInstance.post("/api/recipes/", formData, config);
  return response.data.id;
};

// Creates a new ingredient using the API
const createingredientApi = async (ingredient) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.post(
    "/api/ingredients/",
    {
      name: ingredient.name,
      calories: ingredient.calories,
      fat: ingredient.fat,
      carbohydrates: ingredient.carbohydrates,
      protein: ingredient.protein,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.id;
};

// Updates a recipe using the API
const updateReciptApi = async (recipt, image) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name", recipt.name);
  formData.append("description", recipt.description);
  formData.append("directions", recipt.directions);
  if (image) {
    formData.append("image", image);
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.put(
    `/api/recipes/${recipt.id}`,
    formData,
    config
  );
  return response.data;
};

// Deletes a recipe using the API
const deleteReciptApi = async (reciptId) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.delete(`/api/recipes/${reciptId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Updates an ingredient using the API
const updateIngredientApi = async (ingredient) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.put(
    `/api/ingredients/${ingredient.id}`,
    {
      name: ingredient.name,
      calories: ingredient.calories,
      fat: ingredient.fat,
      carbohydrates: ingredient.carbohydrates,
      protein: ingredient.protein,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

// Links a recipe and ingredient in the database
const linkRecipesIngredientsApi = async (reciptId, ingredient) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.post(
    "/api/recipesIngredients",
    {
      RecipeId: reciptId,
      IngredientId: ingredient.id,
      quantity: ingredient.quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.id;
};

// Updates the quantity of an ingredient in a recipe
const updQuantityApi = async (ingredient, reciptId) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.put(
    `/api/recipesIngredients/recipe/`,
    {
      RecipeId: reciptId,
      IngredientId: ingredient.id,
      quantity: ingredient.quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.id;
};

// Gets the quantity of an ingredient by its ID in a recipe
function getIngredientQuantityById(recipe, ingredientId) {
  if (recipe == null) {
    return null;
  }
  const ingredient = recipe.Ingredients.find((ing) => ing.id === ingredientId);
  if (ingredient && ingredient.RecipeIngredient) {
    return ingredient.RecipeIngredient.quantity;
  } else {
    return null;
  }
}

// Deletes a specific ingredient from a recipe
const deletefromRecipesIngredientApi = async (reciptId, ingredientId) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const response = await axiosInstance.delete(
    `/api/recipesIngredients/recipe/?RecipeId=${reciptId}&IngredientId=${ingredientId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Deletes all ingredients from a recipe
const deleteAllfromRecipesIngredientApi = async (reciptId) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const response = await axiosInstance.delete(
    `/api/recipesIngredients/byrecipe/${reciptId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Main function to update or create a recipe, handling ingredients as well
async function updateRecipt(form, image, listIngredients, oldRecipt) {
  let newIngredients = [];
  console.log(form);
  if (form.id >= 0) {
    await updateReciptApi(form, image);
    console.log("upd recipt");
  } else {
    console.log("new recipt");
    let newRecipt = await createReciptApi(form, image);
    console.log("new rec " + newRecipt);
    form.id = newRecipt;
    console.log("new id " + form.id);
  }
  console.log(listIngredients);
  for (let ingredient of form.ingredients) {
    console.log(ingredient.id);
    if (!ingredient.id) {
      console.log("new ingredient " + ingredient.name);
      ingredient.id = await createingredientApi(ingredient);
      await linkRecipesIngredientsApi(form.id, ingredient);
    } else if (!isIngredientInArray(listIngredients, ingredient)) {
      console.log("upd ingredient " + ingredient.name);
      await updateIngredientApi(ingredient);
      await updQuantityApi(ingredient, form.id);
    } else if (
      getIngredientQuantityById(oldRecipt, ingredient.id) != ingredient.quantity
    ) {
      console.log("upd quantity ingredient 2 " + ingredient.name);
      await linkRecipesIngredientsApi(form.id, ingredient);
    } else {
      console.log("upd failed");
    }
  }
  if (oldRecipt && oldRecipt.Ingredients) {
    const removedIngredients = oldRecipt.Ingredients.filter(
      (oldIng) => !form.ingredients.some((newIng) => newIng.id === oldIng.id)
    );
    for (const ingredient of removedIngredients) {
      await deletefromRecipesIngredientApi(form.id, ingredient.id);
    }
  }
}

// Function to delete a recipe, handling associated ingredients
async function deleteRecipt(recipe) {
  if (recipe.Ingredients && recipe.Ingredients.length > 0) {
    await deleteAllfromRecipesIngredientApi(recipe.id);
  }
  await deleteReciptApi(recipe.id);
}

export { updateRecipt, deleteRecipt };
