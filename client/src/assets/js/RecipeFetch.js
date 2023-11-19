import axios from "axios";

const fetchRecipt = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("/api/recipes", {
    headers: {
      // Inserisci qui il tuo header di autenticazione, se necessario
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const fetchIngredientsByRecipe = async (id) => {
  console.log(`/api/ingredients/byrecipeid/${id}`);
  const token = localStorage.getItem("token");
  const response = await axios.get(`/api/ingredients/byrecipeid/${id}`, {
    headers: {
      // Inserisci qui il tuo header di autenticazione, se necessario
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};
export { fetchRecipt, fetchIngredientsByRecipe };
