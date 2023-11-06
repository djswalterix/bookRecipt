const Book = require("../models/books.model"); // Import Book Model
const { Sequelize } = require("sequelize");

exports.createBook = async (req, res) => {
  try {
    // Read data from book input (req.body)
    const { name, image_path, description, free } = req.body;

    // Create a new book in the database
    const newBook = await Book.create({
      name,
      image_path,
      description,
      free,
    });

    res.status(201).json(newBook);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    handleErrors(error, res);
  }
};

// Function to get a book by id
exports.getBookById = async (req, res) => {
  console.log("find by id");
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    res.status(200).json(book);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to update a book by id
exports.updateBook = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updates = req.body;
    const book = await Book.findByPk(idToUpdate);

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    // update
    if (updates.name) {
      book.name = updates.name;
    }
    if (updates.image_path) {
      book.surname = updates.surname;
    }
    if (updates.description) {
      book.description = updates.description;
    }
    if (updates.free) {
      book.free = updates.free;
    }
    // Save
    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to delete a book by id
exports.deleteBook = async (req, res) => {
  try {
    //console.log(req.params.id);
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }
    const deletedBook = await book.destroy();
    res.status(200).json(deletedBook);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Centralized error handling function
const handleErrors = (error, res) => {
  if (error instanceof Sequelize.UniqueConstraintError) {
    res
      .status(400)
      .json({ error: "Book with this id address already exists." });
  } else {
    console.error(error);
    res.status(500).json({ error: "Error while processing the request." });
  }
};
