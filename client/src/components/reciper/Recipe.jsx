import React, { useState, useEffect } from "react";
import { fetchIngredientsByRecipe } from "../../assets/js/RecipeFetch";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Recipe = ({ ricetta }) => {
  if (!ricetta)
    return (
      <Typography variant="h5">Seleziona una ricetta per iniziare</Typography>
    );

  return (
    <Card raised sx={{ maxWidth: "70vw" }}>
      {/* Aggiungi un controllo per verificare se esiste un'immagine */}
      {ricetta.image_path && (
        <CardMedia
          component="img"
          sx={{
            width: "100%", // Larghezza massima della Card
            height: "auto", // Altezza automatica per mantenere l'aspect ratio
            maxHeight: "70vh", // Imposta un'altezza massima basata sul viewport height
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
      </CardContent>
    </Card>
  );
};
export default Recipe;
