import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReciptAndIngredients } from "../../redux/actions/recipesActions";
import {
  Box,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
  Typography,
  IconButton,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Recipe from "./Recipe";

const drawerWidth = 240;

const Ricettario = () => {
  const dispatch = useDispatch();
  const ricetteDalStore = useSelector((state) => state.recipes.data); // Retrieve recipes from Redux store
  const [ricettaSelezionata, setRicettaSelezionata] = useState(null); // State for selected recipe
  const [ricetteFiltrate, setRicetteFiltrate] = useState([]); // State for filtered recipes
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile drawer visibility
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Media query for mobile responsiveness

  // Fetching recipes from backend on component mount
  useEffect(() => {
    dispatch(fetchReciptAndIngredients());
  }, [dispatch]);

  // Filtering recipes based on search query
  useEffect(() => {
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
  }, [searchQuery, ricetteDalStore]);

  // Function to select a recipe
  const selezionaRicetta = (ricetta) => {
    setRicettaSelezionata(ricetta);
  };

  // Function to toggle mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Rendering the component
  return (
    <Box sx={{ display: "flex" }}>
      {/* Mobile menu button */}
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
        }}
      >
        <MenuIcon />
      </IconButton>
      {/* Drawer for recipe list */}
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
        ModalProps={{ keepMounted: true }}
      >
        <Typography variant="h6" sx={{ paddingLeft: "1vh" }}>
          Ricette
        </Typography>
        <Box sx={{ padding: "16px" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Cerca ricette"
            InputProps={{ endAdornment: <SearchIcon /> }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        {/* List of recipes */}
        <List>
          <ListItemButton
            key={-1}
            onClick={() => selezionaRicetta(null)}
            sx={{ color: "blue" }}
          >
            Nuova Ricetta
          </ListItemButton>
          {ricetteFiltrate.map((ricetta, index) => (
            <ListItemButton
              key={ricetta.id}
              onClick={() => selezionaRicetta(ricetta)}
              sx={{ color: "gray" }}
            >
              <ListItemText primary={ricetta.name} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      {/* Main content area displaying the selected recipe */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Recipe ricetta={ricettaSelezionata} />
      </Box>
    </Box>
  );
};

export default Ricettario;
