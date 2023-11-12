const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredients.controller");
const { verifyToken } = require("../auth/authMiddleware");
// Route for creating a new ingredient
router.post("/", verifyToken, ingredientController.createIngredient);

// Route for getting all ingredients
router.get("/", verifyToken, ingredientController.getAllIngredients);

// Route for getting a ingredient by id
router.get("/:id", verifyToken, ingredientController.getIngredientById);
// Route for updating a ingredient by id
router.put("/:id", verifyToken, ingredientController.updateIngredient);

// Route for deleting a ingredient by id
router.delete("/:id", verifyToken, ingredientController.deleteIngredient);

module.exports = router;
