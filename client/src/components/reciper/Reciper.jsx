import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchReciptAndIngredients } from "../../redux/actions/recipesActions";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Recipe from "./Recipe";

const drawerWidth = 240; // Width of the side drawer

const Ricettario = () => {
  const dispatch = useDispatch();
  const ricetteDalStore = useSelector((state) => state.recipes.data); // Redux store data
  const [ricettaSelezionata, setRicettaSelezionata] = useState(null); // Selected recipe state
  const [ricetteFiltrate, setRicetteFiltrate] = useState([]); // Filtered recipes state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile drawer toggle
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Breakpoint for mobile devices

  // Fetch recipes on component mount
  useEffect(() => {
    dispatch(fetchReciptAndIngredients());
  }, [dispatch]);

  // Filter recipes based on search query
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
          display: { md: "none", sm: "content" }, // Hide button on larger screens
        }}
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
        ModalProps={{ keepMounted: true }} // Better UX on mobile
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
        <List>
          {ricetteFiltrate.map((ricetta, index) => (
            <ListItemButton
              key={ricetta.id}
              onClick={() => selezionaRicetta(ricetta)}
            >
              <ListItemText primary={ricetta.name} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Recipe ricetta={ricettaSelezionata} />
      </Box>
    </Box>
  );
};

export default Ricettario;
