import axiosInstance from "../../assets/js/api";

// Action creator for fetching recipes and ingredients
export const fetchReciptAndIngredients = () => async (dispatch, getState) => {
  // Retrieve token from local storage
  const token = localStorage.getItem("token");
  // Check for cached data
  const cachedData = getState().recipes.data;

  // If cached data exists, use it instead of making a new API call
  if (cachedData.length > 0) {
    dispatch({ type: "FETCH_RECIPES_SUCCESS", payload: cachedData });
    return;
  }

  try {
    // Make API call to fetch data
    const response = await axiosInstance.get("/api/recipes/ingredients/", {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization header with token
      },
    });
    // Dispatch success action with fetched data
    dispatch({ type: "FETCH_RECIPES_SUCCESS", payload: response.data });
  } catch (error) {
    // Dispatch failure action in case of an error
    dispatch({ type: "FETCH_RECIPES_FAILURE", payload: error });
  }
};
//export
