const express = require("express");
const router = express.Router();
const bookRecipeController = require("../controllers/booksRecipes.controller");
const { verifyToken, isAdmin } = require("../auth/authMiddleware");
// Route for creating a new bookRecipe
router.post("/", verifyToken, isAdmin, bookRecipeController.createBookRecipe);

// Route for getting all bookRecipes
router.get("/", verifyToken, bookRecipeController.getAllBookRecipes);

// Route for getting a bookRecipe by id
router.get("/:id", verifyToken, bookRecipeController.getBookRecipeById);
// Route for updating a bookRecipe by id
router.put("/:id", verifyToken, isAdmin, bookRecipeController.updateBookRecipe);

// Route for deleting a bookRecipe by id
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  bookRecipeController.deleteBookRecipe
);

module.exports = router;
