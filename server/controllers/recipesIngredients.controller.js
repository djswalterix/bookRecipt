const RecipeIngredient = require("../models/recipesIngredients.model"); // Import RecipeIngredient Model
const { Sequelize } = require("sequelize");

exports.createRecipeIngredient = async (req, res) => {
  try {
    // Read data from recipeIngredient input (req.body)

    const { IngredientId, RecipeId, quantity } = req.body;
    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11IngredientId" +
        IngredientId
    );
    console.log("RecipeId" + RecipeId);
    if (!IngredientId || !RecipeId) {
      throw new Error("IngredientId and RecipeId must be provided.");
    }
    // Create a new recipeIngredient in the database
    const newRecipeIngredient = await RecipeIngredient.create({
      IngredientId,
      RecipeId,
      quantity,
    });

    res.status(201).json(newRecipeIngredient);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to get all recipeIngredients
exports.getAllRecipeIngredients = async (req, res) => {
  try {
    const recipeIngredients = await RecipeIngredient.findAll();
    res.status(200).json(recipeIngredients);
  } catch (error) {
    handleErrors(error, res);
  }
};

// Function to get a recipeIngredient by id
exports.getRecipeIngredientById = async (req, res) => {
  console.log("r!!!!!!!!!!!!!!!!!eq.body:", req.params);
  console.log("find by id");
  try {
    const { id } = req.params;
    const recipeIngredient = await RecipeIngredient.findByPk(id);

    if (!recipeIngredient) {
      return res.status(404).json({ error: "RecipeIngredient not found." });
    }

    res.status(200).json(recipeIngredient);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to update a recipeIngredient by id
exports.updateRecipeIngredient = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updates = req.body;
    const recipeIngredient = await RecipeIngredient.findByPk(idToUpdate);

    if (!recipeIngredient) {
      return res.status(404).json({ error: "RecipeIngredient not found." });
    }

    // update
    if (updates.IngredientId) {
      recipeIngredient.IngredientId = updates.IngredientId;
    }
    if (updates.RecipeId) {
      recipeIngredient.surIngredientId = updates.surIngredientId;
    }
    if (updates.quantity) {
      recipeIngredient.quantity = updates.quantity;
    }
    // Save
    const updatedRecipeIngredient = await recipeIngredient.save();
    res.status(200).json(updatedRecipeIngredient);
  } catch (error) {
    handleErrors(error, res);
  }
};

// Function to update a recipeIngredient by idrecipet
exports.updateRecipeIngredientByRecipeId = async (req, res) => {
  try {
    const { RecipeId, IngredientId } = req.body;
    const updates = req.body;
    console.log(`RecipeId ${RecipeId} , IngredientId ${IngredientId} `);
    const recipeIngredient = await RecipeIngredient.findOne({
      where: {
        RecipeId: RecipeId,
        IngredientId: IngredientId,
      },
    });

    if (!recipeIngredient) {
      return res.status(404).json({ error: "RecipeIngredient not found." });
    }

    if (updates.quantity) {
      recipeIngredient.quantity = updates.quantity;
    }
    // Save
    const updatedRecipeIngredient = await recipeIngredient.save();
    res.status(200).json(updatedRecipeIngredient);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to delete a recipeIngredient by id
exports.deleteRecipeIngredient = async (req, res) => {
  try {
    //console.log(req.params.id);
    const recipeIngredient = await RecipeIngredient.findByPk(req.params.id);
    if (!recipeIngredient) {
      return res.status(404).json({ error: "RecipeIngredient not found." });
    }
    const deletedRecipeIngredient = await recipeIngredient.destroy();
    res.status(200).json(deletedRecipeIngredient);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Centralized error handling function
const handleErrors = (error, res) => {
  if (error instanceof Sequelize.UniqueConstraintError) {
    res
      .status(400)
      .json({ error: "RecipeIngredient with this id  already exists." });
  } else {
    console.error(error);
    res.status(500).json({ error: "Error while processing the request." });
  }
};
