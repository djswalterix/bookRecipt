const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
//const passport = require("../auth/passport"); // Assicurati che il percorso sia corretto
const { verifyToken, isAdmin } = require("../auth/authMiddleware");

// Rotte di autenticazione
// Route for creating a new user (proteggere con autenticazione)
router.post("/", userController.createUser);

// Route for getting all users (proteggere con autenticazione)
router.get("/", verifyToken, isAdmin, userController.getAllUsers);

// Route for getting a user by email (proteggere con autenticazione)
router.get("/:email", verifyToken, isAdmin, userController.getUserByEmail);

// Route for updating a user by email (proteggere con autenticazione)
router.put("/:email", verifyToken, userController.updateUser);

// Route for deleting a user by email (proteggere con autenticazione)
router.delete("/:email", verifyToken, userController.deleteUser);

module.exports = router;
