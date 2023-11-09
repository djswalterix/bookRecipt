const BookRecipe = require("../models/booksRecipes.model"); // Import BookRecipe Model
const { Sequelize } = require("sequelize");

exports.createBookRecipe = async (req, res) => {
  try {
    // Read data from bookRecipe input (req.body)

    const { BookId, RecipeId } = req.body;
    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11BookId" +
        BookId
    );
    console.log("RecipeId" + RecipeId);
    if (!BookId || !RecipeId) {
      throw error;
    }
    // Create a new bookRecipe in the database
    const newBookRecipe = await BookRecipe.create({
      BookId,
      RecipeId,
    });

    res.status(201).json(newBookRecipe);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to get all bookRecipes
exports.getAllBookRecipes = async (req, res) => {
  try {
    const bookRecipes = await BookRecipe.findAll();
    res.status(200).json(bookRecipes);
  } catch (error) {
    handleErrors(error, res);
  }
};

// Function to get a bookRecipe by id
exports.getBookRecipeById = async (req, res) => {
  console.log("r!!!!!!!!!!!!!!!!!eq.body:", req.params);
  console.log("find by id");
  try {
    const { id } = req.params;
    const bookRecipe = await BookRecipe.findByPk(id);

    if (!bookRecipe) {
      return res.status(404).json({ error: "BookRecipe not found." });
    }

    res.status(200).json(bookRecipe);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to update a bookRecipe by id
exports.updateBookRecipe = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updates = req.body;
    const bookRecipe = await BookRecipe.findByPk(idToUpdate);

    if (!bookRecipe) {
      return res.status(404).json({ error: "BookRecipe not found." });
    }

    // update
    if (updates.BookId) {
      bookRecipe.BookId = updates.BookId;
    }
    if (updates.RecipeId) {
      bookRecipe.surBookId = updates.surBookId;
    }

    // Save
    const updatedBookRecipe = await bookRecipe.save();
    res.status(200).json(updatedBookRecipe);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to delete a bookRecipe by id
exports.deleteBookRecipe = async (req, res) => {
  try {
    //console.log(req.params.id);
    const bookRecipe = await BookRecipe.findByPk(req.params.id);
    if (!bookRecipe) {
      return res.status(404).json({ error: "BookRecipe not found." });
    }
    const deletedBookRecipe = await bookRecipe.destroy();
    res.status(200).json(deletedBookRecipe);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Centralized error handling function
const handleErrors = (error, res) => {
  if (error instanceof Sequelize.UniqueConstraintError) {
    res.status(400).json({ error: "BookRecipe with this id  already exists." });
  } else {
    console.error(error);
    res.status(500).json({ error: "Error while processing the request." });
  }
};
