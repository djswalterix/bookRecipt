const express = require("express");
const router = express.Router();
const bookRecipeController = require("../controllers/booksRecipes.controller");

// Route for creating a new bookRecipe
router.post("/", bookRecipeController.createBookRecipe);

// Route for getting all bookRecipes
router.get("/", bookRecipeController.getAllBookRecipes);

// Route for getting a bookRecipe by id
router.get("/:id", bookRecipeController.getBookRecipeById);
// Route for updating a bookRecipe by id
router.put("/:id", bookRecipeController.updateBookRecipe);

// Route for deleting a bookRecipe by id
router.delete("/:id", bookRecipeController.deleteBookRecipe);

module.exports = router;
