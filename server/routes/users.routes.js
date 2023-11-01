const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller"); // Assicurati che il percorso sia corretto

// Rotta per creare un nuovo utente
router.post("/", userController.createUser);
/*
// Rotta per ottenere tutti gli utenti
router.get("/", userController.getAllUsers);

// Rotta per ottenere un utente per e,ao;
router.get("/:email", userController.getUserByEmail);

// Rotta per aggiornare un utente per email
router.put("/:email", userController.updateUser);

// Rotta per eliminare un utente per email
router.delete("/:email", userController.deleteUser);
*/
module.exports = router;
