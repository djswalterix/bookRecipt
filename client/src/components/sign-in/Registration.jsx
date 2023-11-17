import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { login, setUserLoggedIn } from "../../redux/reducers/authSlice.reducer";
import { register } from "../../redux/reducers/registrationSlice.reducer";
export default function Registration() {
  const [errorMessage, setErrorMessage] = useState(""); // Aggiungi uno stato per il messaggio di errore
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);

  const defaultTheme = createTheme();
  const loading = useSelector((state) => state.auth.loading); // Utilizza lo stato di caricamento dalla slice di registrazione

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Cambia '/' con il percorso della tua home page se è diverso
    }
  }, [isAuthenticated, navigate]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("passowrd " + password);
    console.log("email " + email);
    console.log("name " + name);
    console.log("surname " + surname);

    if (!email.includes("@") || password.length < 6 || !name || !surname) {
      setErrorMessage("Dati inseriti non validi");
      return;
    }
    dispatch(
      register({
        name: name,
        surname: surname,
        email: email,
        password: password,
      })
    )
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          dispatch(
            login({
              email: email,
              password: password,
            })
          ).then((response) => {
            if (response.payload && response.payload.token) {
              localStorage.setItem("token", response.payload.token); // Salvare il token
              dispatch(setUserLoggedIn(true)); // Aggiornare lo stato di Redux
              console.log("logged");
              // Altre azioni post-login
            } else {
              throw new Error("errore durante il login");
            }
          });
          // Altre azioni post-login
        }
      })
      .catch((error) => {
        setErrorMessage("Errore durante la registrazione"); // Gestione degli errori
        console.error("Errore durante la registrazione:", error);
      });
  };
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
          <div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between", // Questo assicura spazio tra i campi
                width: "100%", // Larghezza piena per contenere entrambi i campi
                gap: 2, // Distanza tra i due campi
              }}
            >
              <TextField
                margin="normal"
                required
                id="name"
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ flexGrow: 1 }} // Permette al campo di crescere e riempire lo spazio
              />
              <TextField
                margin="normal"
                required
                id="surname"
                label="Cognome"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                sx={{ flexGrow: 1 }} // Permette al campo di crescere e riempire lo spazio
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
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
