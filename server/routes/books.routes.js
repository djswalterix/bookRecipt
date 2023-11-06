const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books.controller");

// Route for creating a new book
router.post("/", bookController.createBook);

// Route for getting all books
router.get("/", bookController.getAllBooks);

// Route for getting a book by id
router.get("/:id", bookController.getBookById);
// Route for updating a book by id
router.put("/:id", bookController.updateBook);

// Route for deleting a book by id
router.delete("/:id", bookController.deleteBook);

module.exports = router;
