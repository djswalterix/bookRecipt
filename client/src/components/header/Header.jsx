import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  logout,
  setUserLoggedIn,
} from "../../redux/reducers/authSlice.reducer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // Rimuovere il token
    dispatch(setUserLoggedIn(false)); // Aggiornare lo stato di Redux
    navigate("/sign-in"); // Reindirizza alla pagina di login o alla home
  };

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
        to="/chi-siamo"
        sx={{ display: "block" }}
      >
        Chi Siamo
      </Button>
      {isAuthenticated ? (
        <Button color="inherit" onClick={handleLogout}>
          Esci
        </Button>
      ) : (
        <>
          <Button
            color="inherit"
            component={RouterLink}
            to="/sign-in"
            sx={{ display: "block" }}
          >
            Accedi
          </Button>
        </>
      )}
    </div>
  );

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
            <Button color="inherit" component={RouterLink} to="/chi-siamo">
              Chi Siamo
            </Button>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/sign-in">
                  Sign In
                </Button>
              </>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
