const express = require("express");
const router = express.Router();
const recipesIngredients = require("../controllers/recipesIngredients.controller");

// Route for creating a new recipesIngredients
router.post("/", recipesIngredients.createRecipeIngredient);

// Route for getting all recipesIngredients
router.get("/", recipesIngredients.getAllRecipeIngredients);

// Route for getting a recipesIngredients by id
router.get("/:id", recipesIngredients.getRecipeIngredientById);
// Route for updating a recipesIngredients by id
router.put("/:id", recipesIngredients.updateRecipeIngredient);

// Route for deleting a recipesIngredients by id
router.delete("/:id", recipesIngredients.deleteRecipeIngredient);

module.exports = router;
