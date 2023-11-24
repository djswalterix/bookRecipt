import axios from "axios";
import axiosInstance from "../../assets/js/api";
/*
const fetchRecipt = async () => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.get("/api/recipes", {
    headers: {
      // Inserisci qui il tuo header di autenticazione, se necessario
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};*/

const fetchIngredientsByRecipe = async (id) => {
  console.log(`/api/ingredients/byrecipeid/${id}`);
  const token = localStorage.getItem("token");
  const response = await axiosInstance.get(
    `/api/ingredients/byrecipeid/${id}`,
    {
      headers: {
        // Inserisci qui il tuo header di autenticazione, se necessario
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

const fetchReciptAndIngredients = async () => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.get("/api/recipes/ingredients/", {
    headers: {
      // Inserisci qui il tuo header di autenticazione, se necessario
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { /*fetchRecipt,*/ fetchIngredientsByRecipe, fetchReciptAndIngredients };
