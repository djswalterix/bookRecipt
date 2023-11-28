import React, { useState, useEffect } from "react";
// Importing necessary Material-UI components
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Importing Redux functionalities
import { useSelector, useDispatch } from "react-redux";
import { login, setUserLoggedIn } from "../../redux/reducers/authSlice.reducer";
import { useNavigate } from "react-router-dom";

// Copyright component for the footer
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        RicettarioSmart
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme(); // Default theme creation for Material-UI

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState(""); // State for handling error messages

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  // Effect hook to navigate to home page upon successful authentication
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to home page if authenticated
    }
  }, [isAuthenticated, navigate]);

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // Basic validation for email and password
    if (!email.includes("@") || password.length < 6) {
      setErrorMessage("Email o password non validi");
      return;
    }

    // Dispatching login action to Redux
    dispatch(login({ email, password }))
      .then((response) => {
        // Post-login actions
        if (response.payload && response.payload.token) {
          // Token storage and additional setup
          localStorage.setItem("token", response.payload.token);
          localStorage.setItem("role", response.payload.user.role);
          localStorage.setItem("tokenTimestamp", Date.now());
          dispatch(setUserLoggedIn(true));
        } else {
          throw new Error("Errore durante il login");
        }
      })
      .catch((error) => {
        setErrorMessage("Errore durante il login"); // Error handling
      });
  };

  // JSX for rendering the login form
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Accedi
          </Typography>
          {loading && <CircularProgress />}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* Form fields for email and password */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Ricordami"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Accedi
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  password dimenticata?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/registration" variant="body2">
                  {"Non hai un account? Registrati"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
