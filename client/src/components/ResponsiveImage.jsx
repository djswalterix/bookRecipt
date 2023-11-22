import React from "react";
import { Link } from "react-router-dom";
import {
  useTheme,
  useMediaQuery,
  Box,
  Button,
  Typography,
} from "@mui/material";

const ResponsiveImage = ({ desktopImage, mobileImage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        component="img"
        src={isMobile ? mobileImage : desktopImage}
        alt="piatti in material design"
        sx={{
          width: isMobile ? "100%" : "100%", // Larghezza modificata in base alla dimensione dello schermo
          height: "auto", // Mantieni l'altezza auto per preservare l'aspect ratio dell'immagine
          margin: isMobile ? "0" : "auto",
          display: "block",
        }}
      />
      <Box
        sx={{
          position: isMobile ? "relative" : "absolute",
          top: isMobile ? "auto" : "50%",
          left: isMobile ? "auto" : "50%",
          transform: isMobile ? "none" : "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        {/* Titolo */}
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            fontSize: isMobile ? "2.5rem" : "3rem", // Adatta la dimensione del titolo in base al dispositivo
          }}
        >
          RicettarioSmart
        </Typography>
        {/* Frase Breve */}
        <Typography
          variant="h5"
          component="p"
          gutterBottom
          sx={{
            textShadow: "1px 1px 6px rgba(0,0,0,0.7)",
            fontSize: isMobile ? "1.2rem" : "1.5rem", // Adatta la dimensione del testo in base al dispositivo
          }}
        >
          Scopri ricette deliziose e facili da preparare!
        </Typography>
        {/* Bottone */}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/reciper"
        >
          Esplora Ricette
        </Button>
      </Box>
    </>
  );
};

export default ResponsiveImage;
