import axios from "axios";
import axiosInstance from "./api";

const updateRecipt = async (recipt) => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.get("/api/recipes/ingredients/", {
    headers: {
      // Inserisci qui il tuo header di autenticazione, se necessario
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export { updateRecipt };
