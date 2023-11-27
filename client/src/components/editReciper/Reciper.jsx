import React, { useState, useEffect } from "react";
//import { fetchReciptAndIngredients } from "../../assets/js/RecipeFetch";
import { fetchReciptAndIngredients } from "../../redux/actions/recipesActions";
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
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Recipe from "./Recipe";
import { useDispatch, useSelector } from "react-redux";
const drawerWidth = 240;

const Ricettario = () => {
  const dispatch = useDispatch();
  const ricetteDalStore = useSelector((state) => state.recipes.data);
  const [ricettaSelezionata, setRicettaSelezionata] = useState(null);
  const [ricetteFiltrate, setRicetteFiltrate] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Usa un breakpoint appropriato

  // Caricamento delle ricette dal backend
  useEffect(() => {
    dispatch(fetchReciptAndIngredients());
  }, [dispatch]);

  useEffect(() => {
    // Filtrazione basata sullo stato delle ricette recuperate dal Redux store
    if (searchQuery) {
      const searchTerms = searchQuery
        .split(",")
        .map((term) => term.trim().toLowerCase());
      const filtered = ricetteDalStore.filter((ricetta) =>
        searchTerms.some(
          (term) =>
            term === "" ||
            ricetta.name.toLowerCase().includes(term) ||
            (ricetta.Ingredients &&
              ricetta.Ingredients.some((ing) =>
                ing.name.toLowerCase().includes(term)
              ))
        )
      );
      setRicetteFiltrate(filtered);
    } else {
      setRicetteFiltrate(ricetteDalStore);
    }
  }, [searchQuery, ricetteDalStore]);

  const selezionaRicetta = (ricetta) => {
    setRicettaSelezionata(ricetta);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          mr: 2,
          paddingRight: 0,
          marginRight: 0,
          position: "absolute",
          top: "50%",
          left: "1vh",
          display: { md: "none", sm: "content" },
        }} // Nasconde il pulsante su schermi più grandi di 'sm'
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
        <Typography
          variant="h6"
          sx={{
            paddingLeft: "1vh",
          }}
        >
          Ricette
        </Typography>
        <Box sx={{ padding: "16px" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Cerca ricette"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        <List>
          <ListItemButton
            key={-1}
            onClick={() => selezionaRicetta(null)}
            sx={{
              color: "blue",
            }}
          >
            Nuova Ricetta
          </ListItemButton>
          {ricetteFiltrate.map((ricetta, index) => (
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