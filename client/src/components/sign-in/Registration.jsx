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
import { emailCheck } from "../../assets/js/utility";

export default function Registration() {
  const [errorMessage, setErrorMessage] = useState(""); // Aggiungi uno stato per il messaggio di errore
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const loading = useSelector((state) => state.registration.loading);
  const error = useSelector((state) => state.registration.error);

  const defaultTheme = createTheme();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Cambia '/' con il percorso della tua home page se è diverso
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    if (error) {
      if (error.error == "Error while processing the request.") {
        setErrorMessage("Errore durante la registrazione."); // Set the error message if there is an error in the state
      } else {
        //console.log(error.toString());
        setErrorMessage(error);
      }
    }
  }, [error]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = []; // Array to collect error messages

    console.log("passowrd " + password);
    console.log("email " + email);
    console.log("name " + name);
    console.log("surname " + surname);

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
    if (errors.length > 0) {
      setErrorMessage(errors.join(" - ")); // Join the errors into a single string
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
      .catch(() => {
        console.error("Registration error:", error);
        setErrorMessage("Errore durante la registrazione");
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
            <Typography color="error">
              {typeof errorMessage === "string"
                ? errorMessage
                : errorMessage.error}
            </Typography>
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
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
