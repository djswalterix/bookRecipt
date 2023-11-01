const User = require("../models/users.model"); // Import User Model
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
exports.createUser = async (req, res) => {
  try {
    // Leggi i dati dall'input dell'utente (req.body)
    const { name, surname, email, password } = req.body;

    // Esegui l'hash della password (utilizzando bcrypt o argon2)
    const password_hash = await bcrypt.hash(password, 10);

    // Crea un nuovo utente nel database
    const newUser = await User.create({
      name,
      surname,
      email,
      password_hash,
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      // Se si tratta di un errore di violazione di vincolo di unicità (email duplicata)
      res
        .status(400)
        .json({ error: "L'utente con questo indirizzo email esiste già." });
    } else {
      // Altrimenti, gestisci altri errori come errore del server
      console.error(error);
      res
        .status(500)
        .json({ error: "Errore durante la registrazione dell'utente." });
    }
  }
};
