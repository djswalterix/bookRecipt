const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredients.controller");
const { verifyToken, isAdmin } = require("../auth/authMiddleware");
// Route for creating a new ingredient
router.post("/", verifyToken, isAdmin, ingredientController.createIngredient);

// Route for getting all ingredients
router.get("/", verifyToken, ingredientController.getAllIngredients);

// Route for getting a ingredient by id
router.get("/:id", verifyToken, ingredientController.getIngredientById);
// Route for updating a ingredient by id
router.put("/:id", verifyToken, isAdmin, ingredientController.updateIngredient);

// Route for deleting a ingredient by id
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  ingredientController.deleteIngredient
);

//route for getting ingredients by recipe
router.get(
  "/byrecipeid/:id",
  verifyToken,
  ingredientController.getIngredientsByRecipeId
);

module.exports = router;
