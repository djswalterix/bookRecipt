import React, { useState, useEffect } from "react";
import { fetchIngredientsByRecipe } from "../../assets/js/RecipeFetch";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";

import { macrocalc } from "../../assets/js/utility";

const Recipe = ({ ricetta }) => {
  const [ingredients, setIngredients] = useState([]);
  const [macros, setMacros] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (ricetta) {
      const loadIngredients = async () => {
        console.log(ricetta.id);
        const ingredientsLoaded = await fetchIngredientsByRecipe(ricetta.id);
        console.log("ingredients " + ingredientsLoaded);
        setIngredients(ingredientsLoaded);
        const macrosLoaded = macrocalc(ingredientsLoaded);
        setMacros(macrosLoaded);
      };

      loadIngredients();
    }
  }, [ricetta]);

  if (!ricetta)
    return (
      <Typography variant="h5">Seleziona una ricetta per iniziare</Typography>
    );

  return (
    <Card raised sx={{ maxWidth: "70vw", mx: "auto", boxShadow: 3 }}>
      {/* Aggiungi un controllo per verificare se esiste un'immagine */}
      {ricetta.image_path && (
        <CardMedia
          component="img"
          sx={{
            width: "100%", // Larghezza massima della Card
            height: "auto", // Altezza automatica per mantenere l'aspect ratio
            maxHeight: "50vh", // Imposta un'altezza massima basata sul viewport height
          }}
          image={ricetta.image_path} // Assicurati che 'image' sia il percorso corretto all'interno dell'oggetto 'ricetta'
          alt={`Immagine di ${ricetta.name}`}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {ricetta.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ricetta.description}
        </Typography>
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
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Ingredienti:</Typography>
            {ingredients.map((ingredient, index) => (
              <Chip
                key={index}
                label={`${ingredient.name}: ${ingredient.RecipeIngredient.quantity} gr`}
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
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
