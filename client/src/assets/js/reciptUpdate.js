import axios from "axios";
import axiosInstance from "./api";

function isIngredientInArray(array, ingredientToCheck) {
  return array.some(
    (element) =>
      element.name === ingredientToCheck.name &&
      element.calories === ingredientToCheck.calories &&
      element.fat === ingredientToCheck.fat &&
      element.carbohydrates === ingredientToCheck.carbohydrates
    // Aggiungi altre proprietà se necessario
  );
}
const createReciptApi = async (recipt) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.post(
    "/api/recipes/",
    {
      name: recipt.name,
      image_path: "default",
      description: recipt.description,
      directions: recipt.directions,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.id;
};
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

const updateReciptApi = async (recipt) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.put(
    `/api/recipes/${recipt.id}`,
    {
      name: recipt.name,
      image_path: "default",
      description: recipt.description,
      directions: recipt.directions,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
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
  return response.data;
};
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
const updQuantityApi = async (ingredient, reciptId) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.put(
    `/api/recipesIngredients/recipe`,
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

function getIngredientQuantityById(recipe, ingredientId) {
  // Trova l'ingrediente con l'ID specificato
  const ingredient = recipe.Ingredients.find((ing) => ing.id === ingredientId);

  // Se l'ingrediente è trovato e ha un campo RecipeIngredient, restituisci la quantity
  if (ingredient && ingredient.RecipeIngredient) {
    return ingredient.RecipeIngredient.quantity;
  } else {
    return null; // Restituisce null se l'ingrediente non è trovato o non ha un campo RecipeIngredient
  }
}

async function updateRecipt(form, listIngredients, oldRecipt) {
  let newIngredients = [];

  console.log(form);
  if (form.id >= 0) {
    await updateReciptApi(form);
    console.log("upd recipt");
  } else {
    console.log("new recipt");
    let newRecipt = await createReciptApi(form);
    form.id = newRecipt.id;
    //new recipt
  }
  console.log(listIngredients);
  for (let ingredient of form.ingredients) {
    console.log(ingredient.id);
    if (!ingredient.id) {
      console.log("new ingredient " + ingredient.name);
      ingredient.id = await createingredientApi(ingredient);
      await linkRecipesIngredientsApi(form.id, ingredient);
      //new ingredient
    } else if (!isIngredientInArray(listIngredients, ingredient)) {
      console.log("upd ingredient " + ingredient.name);
      await updateIngredientApi(ingredient);
      await updQuantityApi(ingredient, form.id);
      //updIngredient
    } else if (
      getIngredientQuantityById(oldRecipt, ingredient.id) != ingredient.quantity
    ) {
      await updQuantityApi(ingredient, form.id);
    }
  }
  return false;
}
export { updateRecipt };
