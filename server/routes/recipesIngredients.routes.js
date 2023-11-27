const express = require("express");
const router = express.Router();
const recipesIngredients = require("../controllers/recipesIngredients.controller");
const { verifyToken, isAdmin } = require("../auth/authMiddleware");
// Route for creating a new recipesIngredients
router.post(
  "/",
  verifyToken,
  isAdmin,
  recipesIngredients.createRecipeIngredient
);

// Route for getting all recipesIngredients
router.get("/", verifyToken, recipesIngredients.getAllRecipeIngredients);

// Route for updating a recipesIngredients by id recipt
router.put(
  "/recipe/",
  verifyToken,
  isAdmin,
  recipesIngredients.updateRecipeIngredientByRecipeId
);
// Route for getting a recipesIngredients by id
router.get("/:id", verifyToken, recipesIngredients.getRecipeIngredientById);
// Route for updating a recipesIngredients by id
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  recipesIngredients.updateRecipeIngredient
);
// Route for deleting a recipesIngredients by id
router.delete(
  "/recipe/",
  verifyToken,
  isAdmin,
  recipesIngredients.deleteRecipeIngredientbyId
);
// Route for deleting a recipesIngredients by id
router.delete(
  "/byrecipe/:id",
  verifyToken,
  isAdmin,
  recipesIngredients.deleteRecipeIngredientbyRecipe
);

// Route for deleting a recipesIngredients by id
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  recipesIngredients.deleteRecipeIngredient
);

module.exports = router;
