const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

// Route for creating a new user
router.post("/", userController.createUser);

// Route for getting all users
router.get("/", userController.getAllUsers);

// Route for getting a user by email
router.get("/:email", userController.getUserByEmail);
// Route for updating a user by email
router.put("/:email", userController.updateUser);

// Route for deleting a user by email
router.delete("/:email", userController.deleteUser);

module.exports = router;
