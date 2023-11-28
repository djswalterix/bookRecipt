import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import { macrocalc } from "../../assets/js/utility"; // Importing macrocalc function

const Recipe = ({ ricetta }) => {
  const [macros, setMacros] = useState([]); // State to store calculated macros
  const theme = useTheme();

  // Effect hook to calculate macros when a recipe is selected
  useEffect(() => {
    if (ricetta) {
      const macrosLoaded = macrocalc(ricetta.Ingredients);
      setMacros(macrosLoaded);
    }
  }, [ricetta]);

  // Display message if no recipe is selected
  if (!ricetta)
    return (
      <Typography variant="h5">Seleziona una ricetta per iniziare</Typography>
    );

  return (
    <Card raised sx={{ maxWidth: "70vw", mx: "auto", boxShadow: 3 }}>
      {/* Displaying the recipe image, if available */}
      {ricetta.image_path && (
        <CardMedia
          component="img"
          sx={{ width: "100%", height: "auto", maxHeight: "50vh" }}
          image={ricetta.image_path}
          alt={`Immagine di ${ricetta.name}`}
        />
      )}
      <CardContent>
        {/* Recipe name and description */}
        <Typography gutterBottom variant="h5" component="div">
          {ricetta.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ricetta.description}
        </Typography>
        {/* Directions for preparing the recipe */}
        <Typography variant="body1" sx={{ mt: 1 }}>
          Passaggi: {ricetta.directions}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            [theme.breakpoints.up("md")]: {
              flexDirection: "column",
              justifyContent: "space-between",
            },
          }}
        >
          {/* Ingredients list */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Ingredienti:</Typography>
            {ricetta.Ingredients.map((ingredient, index) => (
              <Chip
                key={index}
                label={`${ingredient.name}: ${ingredient.RecipeIngredient.quantity} gr`}
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
          {/* Displaying calculated macros */}
          <Box>
            <Typography variant="h6">Macro Totali:</Typography>
            <Typography variant="body1">
              Calorie: {macros.calories} cal
            </Typography>
            <Typography variant="body1">Grassi: {macros.fat} gr</Typography>
            <Typography variant="body1">
              Proteine: {macros.protein} gr
            </Typography>
            <Typography variant="body1">
              Carboidrati: {macros.carbohydrates} gr
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Recipe;
