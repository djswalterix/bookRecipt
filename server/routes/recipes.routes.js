const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipes.controller");

// Route for creating a new recipe
router.post("/", recipeController.createRecipe);

// Route for getting all recipes
router.get("/", recipeController.getAllRecipes);

// Route for getting a recipe by id
router.get("/:id", recipeController.getRecipeById);
// Route for updating a recipe by id
router.put("/:id", recipeController.updateRecipe);

// Route for deleting a recipe by id
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
