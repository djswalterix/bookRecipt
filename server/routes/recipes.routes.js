const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipes.controller");
const { verifyToken } = require("../auth/authMiddleware");
// Route for creating a new recipe
router.post("/", verifyToken, recipeController.createRecipe);

// Route for getting all recipes
router.get("/", verifyToken, recipeController.getAllRecipes);
// Route for getting all recipes and ingredients
router.get(
  "/ingredients/",
  verifyToken,
  recipeController.getRecipesAndIngredients
);

// Route for getting a recipe by id
router.get("/:id", verifyToken, recipeController.getRecipeById);
// Route for updating a recipe by id
router.put("/:id", verifyToken, recipeController.updateRecipe);

// Route for deleting a recipe by id
router.delete("/:id", verifyToken, recipeController.deleteRecipe);

module.exports = router;
