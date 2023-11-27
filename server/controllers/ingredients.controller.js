const Ingredient = require("../models/ingredients.model"); // Import Ingredient Model
const { Sequelize } = require("sequelize");
const Recipe = require("../models/recipes.model");
exports.createIngredient = async (req, res) => {
  try {
    // Read data from ingredient input (req.body)
    const { name, protein, fat, carbohydrates, calories } = req.body;

    // Create a new ingredient in the database
    const newIngredient = await Ingredient.create({
      name,
      fat,
      carbohydrates,
      protein,
      calories,
    });

    res.status(201).json(newIngredient);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to get all ingredients
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json(ingredients);
  } catch (error) {
    handleErrors(error, res);
  }
};

// Function to get a ingredient by id
exports.getIngredientById = async (req, res) => {
  console.log("find by id");
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found." });
    }

    res.status(200).json(ingredient);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to update a ingredient by id
exports.updateIngredient = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updates = req.body;
    const ingredient = await Ingredient.findByPk(idToUpdate);

    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found." });
    }

    // update
    if (updates.name) {
      ingredient.name = updates.name;
    }
    if (updates.calories) {
      ingredient.calories = updates.calories;
    }
    if (updates.protein) {
      ingredient.surname = updates.surname;
    }
    if (updates.fat) {
      ingredient.fat = updates.fat;
    }
    if (updates.carbohydrates) {
      ingredient.carbohydrates = updates.carbohydrates;
    }
    // Save
    const updatedIngredient = await ingredient.save();
    res.status(200).json(updatedIngredient);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to delete a ingredient by id
exports.deleteIngredient = async (req, res) => {
  try {
    //console.log(req.params.id);
    const ingredient = await Ingredient.findByPk(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found." });
    }
    const deletedIngredient = await ingredient.destroy();
    res.status(200).json(deletedIngredient);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Centralized error handling function
const handleErrors = (error, res) => {
  if (error instanceof Sequelize.UniqueConstraintError) {
    res
      .status(400)
      .json({ error: "Ingredient with this id address already exists." });
  } else {
    console.error(error);
    res.status(500).json({ error: "Error while processing the request." });
  }
};

exports.getIngredientsByRecipeId = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id, {
      include: [
        {
          model: Ingredient,
          as: "Ingredients", // Usa l'alias che hai definito nell'associazione
          through: {
            attributes: ["quantity"], // Non restituire attributi dalla tabella di join
          },
        },
      ],
    });

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    // Ora puoi accedere agli ingredienti attraverso l'alias definito
    const ingredients = recipe.Ingredients;
    res.status(200).json(ingredients);
  } catch (error) {
    handleErrors(error, res);
  }
};
