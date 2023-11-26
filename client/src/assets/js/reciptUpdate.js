import axios from "axios";
import axiosInstance from "./api";

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
  return response.data;
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

async function updateRecipt(form, listIngredients) {
  console.log(form);
  if (form.id >= 0) {
    await updateReciptApi(form);
    console.log("upd recipt");
  } else {
    console.log("new recipt");
    await createReciptApi(form);
    //new recipt
  }
  console.log(listIngredients);
  for (let ingredient of form.ingredients) {
    console.log(ingredient.id);
    if (!ingredient.id) {
      console.log("new ingredient " + ingredient.name);
      //new ingredient
    } else if (!isIngredientInArray(listIngredients, ingredient)) {
      console.log("upd ingredient " + ingredient.name);
      //updIngredient
    } else {
      console.log("not upd ingredient " + ingredient.name);
    }
  }
  return false;
}
export { updateRecipt };
