const express = require("express");
const app = express();
const userRoutes = require("./routes/users.routes"); // Assicurati che il percorso sia corretto
const booksRoutes = require("./routes/books.routes"); // Assicurati che il percorso sia corretto
const recipesRoutes = require("./routes/recipes.routes"); // Assicurati che il percorso sia corretto
const ingredientsRoutes = require("./routes/ingredients.routes"); // Assicurati che il percorso sia corretto
const ordersRoutes = require("./routes/orders.routes"); // Assicurati che il percorso sia corretto
const booksRecipesRoutes = require("./routes/booksRecipes.routes"); // Assicurati che il percorso sia corretto
const recipesIngredientsRoutes = require("./routes/recipesIngredients.routes"); // Assicurati che il percorso sia corretto
const passport = require("./auth/passport");
const session = require("express-session");
const authRoutes = require("./routes/auth.routes");
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Altri middleware e configurazioni
app.use("/api/auth", authRoutes);

// Utilizza il router per le rotte degli utenti
app.use("/api/users", userRoutes);
// Utilizza il router per le rotte degli utenti
app.use("/api/books", booksRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/ingredients", ingredientsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/booksRecipes", booksRecipesRoutes);
app.use("/api/recipesIngredients", recipesIngredientsRoutes);
app.use((req, res, next) => {
  res.status(404).send("api not founded");
});
// Altri middleware e configurazioni

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
module.exports = app; // Esporta l'istanza di Express
