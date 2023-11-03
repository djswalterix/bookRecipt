const express = require("express");
const app = express();
const userRoutes = require("./routes/users.routes"); // Assicurati che il percorso sia corretto
const booksRoutes = require("./routes/books.routes"); // Assicurati che il percorso sia corretto

app.use(express.json());

// Altri middleware e configurazioni

// Utilizza il router per le rotte degli utenti
app.use("/api/users", userRoutes);
// Utilizza il router per le rotte degli utenti
app.use("/api/books", booksRoutes);

app.use((req, res, next) => {
  res.status(404).send("api not founded");
});
// Altri middleware e configurazioni

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
module.exports = app; // Esporta l'istanza di Express
