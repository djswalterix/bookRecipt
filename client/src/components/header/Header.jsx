import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  logout,
  setUserLoggedIn,
} from "../../redux/reducers/authSlice.reducer";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false); // State for controlling the drawer's visibility
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Redux state for authentication status
  const userRole = useSelector((state) => state.auth.role); // Redux state for user role
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Breakpoint for mobile responsiveness
  const navigate = useNavigate();

  // Handler for navigating to edit recipes page
  const handleEditRecipeBook = () => {
    navigate("/edit-recipe-book");
  };

  // Handler for logging out
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // Remove the token from local storage
    dispatch(setUserLoggedIn(false)); // Update Redux state
    navigate("/sign-in"); // Redirect to sign-in page
  };

  // Drawer content
  const drawer = (
    <div onClick={() => setDrawerOpen(false)}>
      <Button
        color="inherit"
        component={RouterLink}
        to="/"
        sx={{ display: "block" }}
      >
        Home
      </Button>
      <Button
        color="inherit"
        component={RouterLink}
        to="/reciper"
        sx={{ display: "block" }}
      >
        Ricettario
      </Button>
      {userRole === "admin" && (
        <Button
          color="inherit"
          onClick={handleEditRecipeBook}
          sx={{ display: "block" }}
        >
          Modifica Ricettario
        </Button>
      )}
      {isAuthenticated ? (
        <Button color="inherit" onClick={handleLogout}>
          Esci
        </Button>
      ) : (
        <Button
          color="inherit"
          component={RouterLink}
          to="/sign-in"
          sx={{ display: "block" }}
        >
          Accedi
        </Button>
      )}
    </div>
  );

  // Rendering the header component
  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {drawer}
        </Drawer>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RicettarioSmart
        </Typography>
        {!isMobile && (
          <div>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/reciper">
              Ricettario
            </Button>
            {userRole === "admin" && (
              <Button color="inherit" onClick={handleEditRecipeBook}>
                Modifica Ricettario
              </Button>
            )}
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" component={RouterLink} to="/sign-in">
                Sign In
              </Button>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
