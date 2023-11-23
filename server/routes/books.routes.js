const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books.controller");
const { verifyToken, isAdmin } = require("../auth/authMiddleware");

// Route for creating a new book
router.post("/", verifyToken, isAdmin, bookController.createBook);

// Route for getting all books
router.get("/", verifyToken, bookController.getAllBooks);

// Route for getting a book by id
router.get("/:id", verifyToken, bookController.getBookById);
// Route for updating a book by id
router.put("/:id", verifyToken, isAdmin, bookController.updateBook);

// Route for deleting a book by id
router.delete("/:id", verifyToken, isAdmin, bookController.deleteBook);

module.exports = router;
