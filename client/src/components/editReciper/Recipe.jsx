import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  Typography,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { fetchIngredients } from "../../assets/js/dataFetch";
import { updateRecipt, deleteRecipt } from "../../assets/js/reciptUpdate";
const RecipeEditForm = ({ ricetta }) => {
  const onSave = async () => {
    if (validateForm()) {
      try {
        await updateRecipt(formData, ingredientsList, ricetta);
        setSnackbar({ open: true, message: "Ricetta salvata con successo!" });
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2000 millisecondi = 2 secondi
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Errore durante il salvataggio della ricetta.",
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: "Errore: controlla i dati inseriti.",
      });
    }
  };

  //console.log(ingredientsList);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [formData, setFormData] = useState({
    name: ricetta?.name || "",
    description: ricetta?.description || "",
    directions: ricetta?.directions || "",
    ingredients: ricetta?.ingredients || [
      {
        name: "",
        calories: "",
        fat: "",
        carbohydrates: "",
        protein: "",
        quantity: "",
      },
    ],
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    description: false,
    directions: false,
    ingredients: formData.ingredients.map(() => ({
      name: false,
      calories: false,
      fat: false,
      carbohydrates: false,
      protein: false,
      quantity: false,
    })),
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  useEffect(() => {
    const loadIngredients = async () => {
      const fetchedIngredients = await fetchIngredients();
      setIngredientsList(fetchedIngredients);
    };

    loadIngredients();
  }, []);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleDeleteRecipe = async () => {
    await deleteRecipt(formData.id);
    // ...
    handleCloseDialog();
  };
  useEffect(() => {
    if (ricetta?.id !== formData.id) {
      setFormData({
        id: ricetta?.id || -1,
        name: ricetta?.name || "",
        description: ricetta?.description || "",
        directions: ricetta?.directions || "",
        ingredients:
          Array.isArray(ricetta?.Ingredients) && ricetta.Ingredients.length > 0
            ? ricetta.Ingredients.map((ing) => ({
                ...ing,
                quantity: ing.RecipeIngredient?.quantity || "",
              }))
            : [
                {
                  name: "",
                  calories: "",
                  fat: "",
                  carbohydrates: "",
                  protein: "",
                  quantity: "",
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
        quantity: "",
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
        {
          name: "",
          calories: "",
          fat: "",
          carbohydrates: "",
          protein: "",
          quantity: "",
        },
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
  const validateForm = () => {
    let isValid = true;

    const errors = {
      name: !formData.name,
      description: !formData.description,
      directions: !formData.directions,
      ingredients: formData.ingredients.map((ingredient) => ({
        name: !ingredient.name,
        calories: !ingredient.calories,
        fat: !ingredient.fat,
        carbohydrates: !ingredient.carbohydrates,
        protein: !ingredient.protein,
        quantity: !ingredient.quantity,
      })),
    };

    // Verifica se ci sono errori nei campi degli ingredienti
    errors.ingredients.forEach((ingredientErrors) => {
      if (Object.values(ingredientErrors).some((e) => e)) {
        isValid = false;
      }
    });

    setFormErrors(errors);
    return isValid;
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
          error={formErrors.name}
          helperText={formErrors.name && "Il nome della ricetta è obbligatorio"}
          margin="normal"
          label="Nome Ricetta"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          error={formErrors.description}
          helperText={
            formErrors.description &&
            "La descrizione della ricetta e obbligatoriea"
          }
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
          error={formErrors.directions}
          helperText={formErrors.directions && "I passaggi sono obbligatori"}
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
                } else if (newValue && newValue.id) {
                  // Gestisce la selezione dall'elenco usando l'ID come chiave
                  handleIngredientChange(index, newValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={formErrors.ingredients[index].name}
                  helperText={
                    formErrors.ingredients[index].name &&
                    "Il nome dell'ingrediente è obbligatorio"
                  }
                  label="Ingredients"
                  onChange={(e) =>
                    handleIngredientChange(index, {
                      ...ingredient,
                      name: e.target.value,
                    })
                  }
                />
              )}
              sx={{ mr: 1, width: isMobile ? "68%" : "15%" }}
            />
            <TextField
              label="Calorie"
              name="calories"
              error={formErrors.ingredients[index].calories}
              helperText={
                formErrors.ingredients[index].calories &&
                "Le calorie sono obbligatorie"
              }
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
              error={formErrors.ingredients[index].fat}
              helperText={
                formErrors.ingredients[index].fat && "I grassi sono obbligatori"
              }
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
              error={formErrors.ingredients[index].carbohydrates}
              helperText={
                formErrors.ingredients[index].carbohydrates &&
                "I carboidrati sono obbligatori"
              }
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
              error={formErrors.ingredients[index].protein}
              helperText={
                formErrors.ingredients[index].protein &&
                "Le proteine sono obbligatorie"
              }
              value={ingredient.protein || ""}
              onChange={(e) =>
                handleIngredientChange(index, {
                  ...ingredient,
                  protein: e.target.value,
                })
              }
              sx={{ mr: 1, margin: isMobile ? "1vh" : "auto" }}
            />
            <TextField
              label="Quantità"
              name="quantity"
              error={formErrors.ingredients[index].quantity}
              helperText={
                formErrors.ingredients[index].quantity &&
                "La quantità è obbligatoria"
              }
              value={ingredient.quantity || ""}
              onChange={(e) =>
                handleIngredientChange(index, {
                  ...ingredient,
                  quantity: e.target.value,
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
      {formData.id !== -1 && (
        <Button variant="outlined" color="secondary" onClick={handleOpenDialog}>
          Elimina Ricetta
        </Button>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Conferma Eliminazione</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sei sicuro di voler eliminare questa ricetta?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annulla
          </Button>
          <Button onClick={handleDeleteRecipe} color="secondary">
            Elimina
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Paper>
  );
};

export default RecipeEditForm;
