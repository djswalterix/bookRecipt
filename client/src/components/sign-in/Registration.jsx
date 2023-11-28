import React, { useState, useEffect } from "react";
// Importing Material-UI components
import {
  Box,
  TextField,
  ThemeProvider,
  Container,
  CssBaseline,
  Typography,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { createTheme } from "@mui/material/styles";
// Importing Redux functionalities and utility function
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setUserLoggedIn } from "../../redux/reducers/authSlice.reducer";
import { register } from "../../redux/reducers/registrationSlice.reducer";
import { emailCheck } from "../../assets/js/utility";

export default function Registration() {
  // State variables for form data and error message
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux dispatch and navigate hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state selectors
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.registration.loading);
  const error = useSelector((state) => state.registration.error);

  // Default theme for Material-UI
  const defaultTheme = createTheme();

  // Redirect to home page if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Set error message based on registration error state
  useEffect(() => {
    if (error) {
      setErrorMessage(
        error.error === "Error while processing the request."
          ? "Errore durante la registrazione."
          : error
      );
    }
  }, [error]);

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = [];

    // Validate input fields
    if (!emailCheck(email)) {
      errors.push("Email non valorizzata correttamente");
    }
    if (password.length < 7) {
      errors.push("La password deve avere almeno 8 caratteri");
    }
    if (!name) {
      errors.push("Nome non valorizzato");
    }
    if (!surname) {
      errors.push("Cognome non valorizato");
    }

    // Display errors or dispatch registration action
    if (errors.length > 0) {
      setErrorMessage(errors.join(" - "));
      return;
    }

    dispatch(register({ name, surname, email, password }))
      .then((response) => {
        if (response.payload) {
          // Automatically login the user after successful registration
          dispatch(login({ email, password })).then((response) => {
            if (response.payload && response.payload.token) {
              localStorage.setItem("token", response.payload.token);
              dispatch(setUserLoggedIn(true));
            } else {
              throw new Error("errore durante il login");
            }
          });
        }
      })
      .catch(() => {
        setErrorMessage("Errore durante la registrazione");
      });
  };

  // Rendering the registration form
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
          component="form"
          noValidate
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrati
          </Typography>
          {loading && <CircularProgress />}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              gap: 2,
            }}
          >
            <TextField
              margin="normal"
              required
              id="name"
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              margin="normal"
              required
              id="surname"
              label="Cognome"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrati
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
