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
  CircularProgress,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { fetchIngredients } from "../../assets/js/dataFetch";
import { updateRecipt, deleteRecipt } from "../../assets/js/reciptUpdate";
const RecipeEditForm = ({ ricetta }) => {
  // State initialization
  const [isSaving, setIsSaving] = useState(false);
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
  const [image, setImage] = useState(null);
  ////////////////////////////////////////////////////
  // Responsive design with theme
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Ingredient change handler
  const handleIngredientChange = (index, newValue) => {
    console.log("handleIngredientChange", index, ":", newValue);

    // Determine the type of the new value
    const valueType = typeof newValue;

    let newIngredient;

    if (valueType === "undefined") {
      // If newValue is undefined, keep the existing ingredient
      newIngredient = formData.ingredients[index];
    } else if (valueType === "object") {
      // If newValue is an object, assume it's a selected ingredient from a list
      newIngredient = newValue;
    } else {
      // Assume newValue is a manually entered string
      newIngredient = {
        name: newValue,
        calories: "",
        fat: "",
        carbohydrates: "",
        protein: "",
        quantity: "",
      };
    }

    // Update the specific ingredient in the ingredients array
    const updatedIngredients = formData.ingredients.map((ingredient, i) =>
      i === index ? newIngredient : ingredient
    );

    // Update the formData state with the new ingredients array
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  // Add and remove ingredient functions
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

  // Form data change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation function
  const validateForm = () => {
    let isValid = true;

    // Constructing error object for each field
    const errors = {
      name: !formData.name.trim(),
      description: !formData.description.trim(),
      directions: !formData.directions.trim(),
      ingredients: formData.ingredients.map((ingredient) => ({
        name: typeof ingredient.name === "string" && !ingredient.name.trim(),
        calories:
          typeof ingredient.calories !== "string"
            ? !ingredient.calories
            : !ingredient.calories.trim(),
        fat: typeof ingredient.fat === "string" && !ingredient.fat.trim(),
        carbohydrates:
          typeof ingredient.carbohydrates === "string" &&
          !ingredient.carbohydrates.trim(),
        protein:
          typeof ingredient.protein === "string" && !ingredient.protein.trim(),
        quantity:
          typeof ingredient.quantity === "string" &&
          !ingredient.quantity.trim(),
      })),
    };

    // Checking for errors in the main fields
    if (errors.name || errors.description || errors.directions) {
      isValid = false;
    }

    // Checking for errors in ingredients
    if (
      errors.ingredients.some((ingredientErrors) =>
        Object.values(ingredientErrors).some((e) => e)
      )
    ) {
      isValid = false;
    }

    // Update the form errors state
    setFormErrors(errors);
    return isValid;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Save function
  const onSave = async () => {
    // First, validate the form
    if (validateForm()) {
      setIsSaving(true); // Start the saving process
      try {
        // Attempt to update the recipe with the provided data
        await updateRecipt(formData, image, ingredientsList, ricetta);
        setSnackbar({ open: true, message: "Ricetta salvata con successo!" });

        // Reload the page after 2 seconds to reflect changes
        // Consider using more dynamic methods to update UI without reloading
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        // Handle any errors during the save operation
        setSnackbar({
          open: true,
          message: "Errore durante il salvataggio della ricetta.",
        });
      } finally {
        setIsSaving(false); // End the saving process
      }
    } else {
      // If validation fails, inform the user to check their input
      setSnackbar({
        open: true,
        message: "Errore: controlla i dati inseriti.",
      });
    }
  };
  //////////////////////////////////////////////////
  //console.log(ingredientsList);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
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
    try {
      // Attempt to delete the recipe
      await deleteRecipt(formData);
      setSnackbar({
        open: true,
        message: "Ricetta eliminata con successo!",
      });

      // Optionally reload the page or redirect the user
      // Consider updating the UI without reloading for a smoother user experience
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2 seconds delay
    } catch (error) {
      // Handle any errors that occur during deletion
      setSnackbar({
        open: true,
        message: "Errore durante l'eliminazione della ricetta.",
      });
    } finally {
      // Close the dialog irrespective of the outcome
      handleCloseDialog();
    }
  };
  useEffect(() => {
    // Check if the ricetta has changed
    if (ricetta?.id !== formData.id) {
      // Map the ingredients if ricetta.Ingredients is an array, otherwise use a default structure
      const mappedIngredients = Array.isArray(ricetta?.Ingredients)
        ? ricetta.Ingredients.map((ing) => ({
            name: ing?.name || "",
            calories: ing?.calories || "",
            fat: ing?.fat || "",
            carbohydrates: ing?.carbohydrates || "",
            protein: ing?.protein || "",
            quantity: ing?.RecipeIngredient?.quantity || "",
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
          ];

      // Update formData with the new values from ricetta
      setFormData({
        id: ricetta?.id || -1,
        name: ricetta?.name || "",
        description: ricetta?.description || "",
        directions: ricetta?.directions || "",
        ingredients: mappedIngredients,
      });
    }
  }, [ricetta]);

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
                  error={formErrors.ingredients[index]?.name ?? false}
                  helperText={
                    formErrors.ingredients[index]?.name &&
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
              error={formErrors.ingredients[index]?.calories ?? false}
              helperText={
                formErrors.ingredients[index]?.calories &&
                "Le calorie sono obbligatorie"
              }
              value={
                ingredient.calories || ingredient.calories === 0
                  ? ingredient.calories.toString()
                  : ""
              }
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
              error={formErrors.ingredients[index]?.fat ?? false}
              helperText={
                formErrors.ingredients[index]?.fat &&
                "I grassi sono obbligatori"
              }
              value={
                ingredient.fat || ingredient.fat === 0
                  ? ingredient.fat.toString()
                  : ""
              }
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
              error={formErrors.ingredients[index]?.carbohydrates ?? false}
              helperText={
                formErrors.ingredients[index]?.carbohydrates &&
                "I carboidrati sono obbligatori"
              }
              value={
                ingredient.carbohydrates || ingredient.carbohydrates === 0
                  ? ingredient.carbohydrates.toString()
                  : ""
              }
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
              error={formErrors.ingredients[index]?.protein ?? false}
              helperText={
                formErrors.ingredients[index]?.protein &&
                "Le proteine sono obbligatorie"
              }
              value={
                ingredient.protein || ingredient.protein === 0
                  ? ingredient.protein.toString()
                  : ""
              }
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
              error={formErrors.ingredients[index]?.quantity ?? false}
              helperText={
                formErrors.ingredients[index]?.quantity &&
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
        <input type="file" onChange={handleImageChange} />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={isSaving}
        >
          Salva
          {isSaving && (
            <CircularProgress size={24} sx={{ position: "absolute" }} />
          )}
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
