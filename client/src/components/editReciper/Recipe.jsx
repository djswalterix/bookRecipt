import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const RecipeEditForm = ({ ricetta, onSave }) => {
  const [formData, setFormData] = useState({
    name: ricetta?.name || "",
    description: ricetta?.description || "",
    directions: ricetta?.directions || "",
    ingredients: ricetta?.ingredients || [
      { name: "", calories: "", fat: "", carbohydrates: "", protein: "" },
    ],
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleIngredientChange = (index, e) => {
    const newIngredients = formData.ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [e.target.name]: e.target.value };
      }
      return ingredient;
    });
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { name: "", calories: "", fat: "", carbohydrates: "", protein: "" },
      ],
    });
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Qui puoi gestire il salvataggio dei dati, ad esempio inviando una richiesta al server
    onSave(formData);
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nome Ricetta"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Descrizione"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Passaggi"
          name="directions"
          value={formData.directions}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Ingredienti:
        </Typography>
        {formData.ingredients.map((ingredient, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              mb: 1,
            }}
          >
            <TextField
              label="Nome"
              name="name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, e)}
              sx={{ mr: 1 }}
            />
            <TextField
              label="Calorie"
              name="calories"
              value={ingredient.calories}
              onChange={(e) => handleIngredientChange(index, e)}
              sx={{ mr: 1 }}
            />
            <TextField
              label="Grassi"
              name="fat"
              value={ingredient.fat}
              onChange={(e) => handleIngredientChange(index, e)}
              sx={{ mr: 1 }}
            />
            <TextField
              label="Carboidrati"
              name="carbohydrates"
              value={ingredient.carbohydrates}
              onChange={(e) => handleIngredientChange(index, e)}
              sx={{ mr: 1 }}
            />
            <TextField
              label="proteine"
              name="protein"
              value={ingredient.protein}
              onChange={(e) => handleIngredientChange(index, e)}
              sx={{ mr: 1 }}
            />
            <IconButton onClick={() => removeIngredient(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddCircleIcon />} onClick={addIngredient}>
          Aggiungi Ingrediente
        </Button>
        {/* Aggiungi altri campi come necessario */}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Salva
        </Button>
      </Box>
    </Paper>
  );
};

export default RecipeEditForm;
