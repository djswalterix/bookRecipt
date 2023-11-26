import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  Typography,
  Autocomplete,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { fetchIngredients } from "../../assets/js/dataFetch";
import { updateRecipt } from "../../assets/js/reciptUpdate";
const RecipeEditForm = ({ ricetta }) => {
  function onSave() {
    updateRecipt(formData, ingredientsList);
  }
  //console.log(ingredientsList);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [formData, setFormData] = useState({
    name: ricetta?.name || "",
    description: ricetta?.description || "",
    directions: ricetta?.directions || "",
    ingredients: ricetta?.ingredients || [
      { name: "", calories: "", fat: "", carbohydrates: "", protein: "" },
    ],
  });
  useEffect(() => {
    const loadIngredients = async () => {
      const fetchedIngredients = await fetchIngredients();
      setIngredientsList(fetchedIngredients);
    };

    loadIngredients();
  }, []);

  useEffect(() => {
    if (ricetta?.id !== formData.id) {
      setFormData({
        id: ricetta?.id || -1,
        name: ricetta?.name || "",
        description: ricetta?.description || "",
        directions: ricetta?.directions || "",
        ingredients:
          Array.isArray(ricetta?.Ingredients) && ricetta.Ingredients.length > 0
            ? ricetta.Ingredients
            : [
                {
                  name: "",
                  calories: "",
                  fat: "",
                  carbohydrates: "",
                  protein: "",
                },
              ],
      });
    }
  }, [ricetta]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleIngredientChange = (index, newValue) => {
    console.log("handleIngredientChange" + index + " : " + newValue);
    let newIngredient;
    if (typeof newValue === undefined) {
      // Nuovo ingrediente inserito manualmente
      newIngredient = {
        name: newValue,
        calories: "",
        fat: "",
        carbohydrates: "",
        protein: "",
      };
    } else if (typeof newValue === "object") {
      // Ingrediente selezionato dall'elenco
      newIngredient = newValue;
    } else {
      // Se newValue non è né una stringa né un oggetto, mantieni l'ingrediente come è
      newIngredient = formData.ingredients[index];
    }

    const updatedIngredients = formData.ingredients.map((ingredient, i) =>
      i === index ? newIngredient : ingredient
    );

    setFormData({ ...formData, ingredients: updatedIngredients });
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
    console.log(formData);
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
            <Autocomplete
              freeSolo
              options={ingredientsList}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.name
              }
              value={ingredient.name || ""}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  // Gestisce l'input libero
                  handleIngredientChange(index, {
                    ...ingredient,
                    name: newValue,
                  });
                } else if (typeof newValue === "object" && newValue !== null) {
                  // Gestisce la selezione dall'elenco
                  handleIngredientChange(index, newValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) =>
                    handleIngredientChange(index, {
                      ...ingredient,
                      name: e.target.value,
                    })
                  }
                  label="Ingredients"
                />
              )}
              sx={{ mr: 1, width: "15%" }}
            />
            <TextField
              label="Calorie"
              name="calories"
              value={ingredient.calories || ""}
              onChange={(e) =>
                handleIngredientChange(index, {
                  ...ingredient,
                  calories: e.target.value,
                })
              }
              sx={{ mr: 1, margin: isMobile ? "1vh" : "auto" }}
            />
            <TextField
              label="Grassi"
              name="fat"
              value={ingredient.fat || ""}
              onChange={(e) =>
                handleIngredientChange(index, {
                  ...ingredient,
                  fat: e.target.value,
                })
              }
              sx={{ mr: 1, margin: isMobile ? "1vh" : "auto" }}
            />
            <TextField
              label="Carboidrati"
              name="carbohydrates"
              value={ingredient.carbohydrates || ""}
              onChange={(e) =>
                handleIngredientChange(index, {
                  ...ingredient,
                  carbohydrates: e.target.value,
                })
              }
              sx={{ mr: 1, margin: isMobile ? "1vh" : "auto" }}
            />
            <TextField
              label="Proteine"
              name="protein"
              value={ingredient.protein || ""}
              onChange={(e) =>
                handleIngredientChange(index, {
                  ...ingredient,
                  protein: e.target.value,
                })
              }
              sx={{ mr: 1, margin: isMobile ? "1vh" : "auto" }}
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
