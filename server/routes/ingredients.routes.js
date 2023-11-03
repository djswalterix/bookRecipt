const express = require("express");
const router = express.Router();
const ingredientController = require("../controllers/ingredients.controller");

// Route for creating a new ingredient
router.post("/", ingredientController.createIngredient);

// Route for getting all ingredients
router.get("/", ingredientController.getAllIngredients);

// Route for getting a ingredient by id
router.get("/:id", ingredientController.getIngredientById);
// Route for updating a ingredient by id
router.put("/:id", ingredientController.updateIngredient);

// Route for deleting a ingredient by id
router.delete("/:id", ingredientController.deleteIngredient);

module.exports = router;
