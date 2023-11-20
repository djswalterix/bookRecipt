const Recipe = require("../models/recipes.model"); // Import Recipe Model
const { Sequelize } = require("sequelize");
const Ingredient = require("../models/ingredients.model");
exports.createRecipe = async (req, res) => {
  try {
    // Read data from recipe input (req.body)
    const { name, image_path, description, directions } = req.body;

    // Create a new recipe in the database
    const newRecipe = await Recipe.create({
      name,
      image_path,
      description,
      directions,
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);
  } catch (error) {
    handleErrors(error, res);
  }
};

// Function to get a recipe by id
exports.getRecipeById = async (req, res) => {
  console.log("find by id");
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    res.status(200).json(recipe);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to update a recipe by id
exports.updateRecipe = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updates = req.body;
    const recipe = await Recipe.findByPk(idToUpdate);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    // update
    if (updates.name) {
      recipe.name = updates.name;
    }
    if (updates.image_path) {
      recipe.surname = updates.surname;
    }
    if (updates.description) {
      recipe.description = updates.description;
    }
    if (updates.directions) {
      recipe.directions = updates.directions;
    }
    // Save
    const updatedRecipe = await recipe.save();
    res.status(200).json(updatedRecipe);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to delete a recipe by id
exports.deleteRecipe = async (req, res) => {
  try {
    //console.log(req.params.id);
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }
    const deletedRecipe = await recipe.destroy();
    res.status(200).json(deletedRecipe);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Centralized error handling function
const handleErrors = (error, res) => {
  if (error instanceof Sequelize.UniqueConstraintError) {
    res
      .status(400)
      .json({ error: "Recipe with this id address already exists." });
  } else {
    console.error(error);
    res.status(500).json({ error: "Error while processing the request." });
  }
};

exports.getRecipesAndIngredients = async (req, res) => {
  try {
    console.log("recipes and ingredients");
    let recipes = await Recipe.findAll({
      include: [
        {
          model: Ingredient,
          as: "Ingredients",
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.status(200).json(recipes);
  } catch (error) {
    handleErrors(error, res);
  }
};
