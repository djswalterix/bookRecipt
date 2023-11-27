const Recipe = require("../models/recipes.model"); // Import Recipe Model
const { Sequelize } = require("sequelize");
const Ingredient = require("../models/ingredients.model");
const fs = require("fs");
exports.createRecipe = async (req, res) => {
  try {
    // Read data from recipe input (req.body)
    const { name, description, directions } = req.body;
    let image_path = null;
    if (req.file) {
      // Qui puoi salvare il percorso del nuovo file immagine
      image_path = "/images/" + req.file.filename;
    } else {
      return res.status(404).json({ error: "Image not found." });
    }
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

    if (req.file) {
      // Qui puoi salvare il percorso del nuovo file immagine
      if (recipe.image_path) {
        const existingImagePath = "../client/public" + recipe.image_path;
        console.log(existingImagePath);
        fs.unlink(existingImagePath, (err) => {
          if (err) {
            console.error("Failed to delete existing image:", err);
            // Considera se vuoi gestire l'errore in modo specifico
          }
        });
      }
      const image_path = "/images/" + req.file.filename;
      recipe.image_path = image_path;
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
    try {
      if (recipe.image_path) {
        const existingImagePath = "../client/public" + recipe.image_path;
        console.log(existingImagePath);
        fs.unlink(existingImagePath, (err) => {
          if (err) {
            console.error("Failed to delete existing image:", err);
            // Considera se vuoi gestire l'errore in modo specifico
          }
        });
      }
    } catch (error) {
      console.log("error during delete " + error);
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
            attributes: ["quantity"],
          },
        },
      ],
    });

    res.status(200).json(recipes);
  } catch (error) {
    handleErrors(error, res);
  }
};
