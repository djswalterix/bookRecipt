const express = require("express");
const router = express.Router();
const recipesIngredients = require("../controllers/recipesIngredients.controller");
const { verifyToken } = require("../auth/authMiddleware");
// Route for creating a new recipesIngredients
router.post("/", verifyToken, recipesIngredients.createRecipeIngredient);

// Route for getting all recipesIngredients
router.get("/", verifyToken, recipesIngredients.getAllRecipeIngredients);

// Route for getting a recipesIngredients by id
router.get("/:id", verifyToken, recipesIngredients.getRecipeIngredientById);
// Route for updating a recipesIngredients by id
router.put("/:id", verifyToken, recipesIngredients.updateRecipeIngredient);

// Route for deleting a recipesIngredients by id
router.delete("/:id", verifyToken, recipesIngredients.deleteRecipeIngredient);

module.exports = router;
