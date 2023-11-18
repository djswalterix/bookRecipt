import React, { useState, useEffect } from "react";
import {
  fetchRecipt,
  fetchIngredientsByRecipe,
} from "../../assets/js/RecipeFetch";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Recipe from "./Recipe";
const drawerWidth = 240;

const Ricettario = () => {
  const [ricette, setRicette] = useState([]);
  const [ricettaSelezionata, setRicettaSelezionata] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Usa un breakpoint appropriato

  // Caricamento delle ricette dal backend
  useEffect(() => {
    const loadRicette = async () => {
      const ricetteCaricate = await fetchRecipt();
      setRicette(ricetteCaricate);
    };

    loadRicette();
  }, []);

  const selezionaRicetta = (ricetta) => {
    setRicettaSelezionata(ricetta);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }} // Nasconde il pulsante su schermi più grandi di 'sm'
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        ModalProps={{
          keepMounted: true, // Migliore esperienza utente su dispositivi mobili
        }}
      >
        <Typography variant="h6" noWrap component="div">
          Ricette
        </Typography>
        <List>
          {ricette.map((ricetta, index) => (
            <ListItemButton
              sx={{
                color: "gray",
              }}
              key={ricetta.id}
              onClick={() => selezionaRicetta(ricetta)}
            >
              <ListItemText primary={ricetta.name} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Qui andrebbe il componente che mostra i dettagli della ricetta */}
        <Recipe ricetta={ricettaSelezionata} />
      </Box>
    </Box>
  );
};

export default Ricettario;
