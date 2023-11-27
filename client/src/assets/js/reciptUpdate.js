import axios from "axios";
import axiosInstance from "./api";

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
    // Aggiungi altre proprietà se necessario
  );
} /*
const createReciptApi = async (recipt, image) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.post(
    "/api/recipes/",
    {
      name: recipt.name,
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
};*/
const createReciptApi = async (recipt, image) => {
  const token = localStorage.getItem("token");

  // Crea un nuovo oggetto FormData
  const formData = new FormData();
  formData.append("name", recipt.name);
  formData.append("description", recipt.description);
  formData.append("directions", recipt.directions);

  // Aggiungi l'immagine, se presente
  if (image) {
    formData.append("image", image);
  }

  // Assicurati di rimuovere il content-type dal header in modo che il browser possa settarlo automaticamente
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": undefined, // Importante per il caricamento del file
    },
  };

  const response = await axiosInstance.post("/api/recipes/", formData, config);

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

const updateReciptApi = async (recipt, image) => {
  const token = localStorage.getItem("token");

  // Crea un nuovo oggetto FormData
  const formData = new FormData();
  formData.append("name", recipt.name);
  formData.append("description", recipt.description);
  formData.append("directions", recipt.directions);

  // Aggiungi l'immagine, se presente
  if (image) {
    formData.append("image", image);
  }

  // Configurazione della richiesta con l'header per l'autenticazione
  // Non impostare manualmente il Content-Type per FormData
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // Non impostare "Content-Type" quando si usa FormData
      // Lascia che sia il browser a farlo in modo automatico
    },
  };

  const response = await axiosInstance.put(
    `/api/recipes/${recipt.id}`,
    formData,
    config
  );

  return response.data;
};
const deleteReciptApi = async (reciptId) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.delete(
    `/api/recipes/${reciptId}`,

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
  console.log(response.data);
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

function getIngredientQuantityById(recipe, ingredientId) {
  if (recipe == null) {
    return null;
  }
  // Trova l'ingrediente con l'ID specificato
  const ingredient = recipe.Ingredients.find((ing) => ing.id === ingredientId);

  // Se l'ingrediente è trovato e ha un campo RecipeIngredient, restituisci la quantity
  if (ingredient && ingredient.RecipeIngredient) {
    return ingredient.RecipeIngredient.quantity;
  } else {
    return null; // Restituisce null se l'ingrediente non è trovato o non ha un campo RecipeIngredient
  }
}
const deletefromRecipesIngredientApi = async (reciptId, ingredientId) => {
  const token = localStorage.getItem("token");
  console.log(token);
  const response = await axiosInstance.delete(
    `/api/recipesIngredients/recipe/?RecipeId=${reciptId}&IngredientId=${ingredientId}`,
    /*{
      RecipeId: reciptId,
      IngredientId: ingredientId,
    },*/
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
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
      //ingredients is in list!
      console.log("upd ingredient " + ingredient.name);
      await updateIngredientApi(ingredient); ///////
      await updQuantityApi(ingredient, form.id);
      //updIngredient
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
    // Il resto del codice che utilizza oldRecipt
    const removedIngredients = oldRecipt.Ingredients.filter(
      (oldIng) => !form.ingredients.some((newIng) => newIng.id === oldIng.id)
    );
    for (const ingredient of removedIngredients) {
      await deletefromRecipesIngredientApi(form.id, ingredient.id);
    }
  }
  //return false;
}

async function deleteRecipt(recipe) {
  if (recipe.Ingredients && recipe.Ingredients.length > 0) {
    await deleteAllfromRecipesIngredientApi(recipe.id);
  }

  await deleteReciptApi(recipe.id);
}
export { updateRecipt, deleteRecipt };
