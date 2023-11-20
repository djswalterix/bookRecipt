import axios from "axios";
export const fetchReciptAndIngredients = () => async (dispatch, getState) => {
  const token = localStorage.getItem("token");
  const cachedData = getState().recipes.data;

  if (cachedData.length > 0) {
    // Utilizza la cache se disponibile
    dispatch({ type: "FETCH_RECIPES_SUCCESS", payload: cachedData });
    return;
  }

  try {
    const response = await axios.get("/api/recipes/ingredients/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "FETCH_RECIPES_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_RECIPES_FAILURE", payload: error });
  }
};
//export
