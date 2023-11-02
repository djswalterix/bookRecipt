const User = require("../models/users.model"); // Import User Model
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

exports.createUser = async (req, res) => {
  try {
    // Read data from user input (req.body)
    const { name, surname, email, password } = req.body;
    if (!emailRegex.test(email)) {
      throw new Error("Email not provided correctly");
    }
    // Hash the password (using bcrypt or argon2)
    const password_hash = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      name,
      surname,
      email,
      password_hash,
    });

    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      // If it's a unique constraint violation error (duplicate email)
      res
        .status(400)
        .json({ error: "User with this email address already exists." });
    } else {
      // Otherwise, handle other errors as a server error
      console.error(error);
      res.status(500).json({ error: "Error while registering the user." });
    }
  }
};
// Function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to retrieve users." });
  }
};

// Function to get a user by email
exports.getUserByEmail = async (req, res) => {
  console.log("find by email");
  try {
    const { email } = req.params;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to retrieve the user." });
  }
};
// Function to update a user by email
exports.updateUser = async (req, res) => {
  try {
    const emailToUpdate = req.params.email;
    const updates = req.body;
    const user = await User.findByEmail(emailToUpdate);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // update
    if (updates.name) {
      user.name = updates.name;
    }
    if (updates.surname) {
      user.surname = updates.surname;
    }
    if (updates.email) {
      if (!emailRegex.test(updates.email)) {
        throw new Error("Email not provided correctly");
      }
      user.email = updates.email;
    }

    // Save
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to update the user." });
  }
};
// Function to delete a user by email
exports.deleteUser = async (req, res) => {
  try {
    //console.log(req.params.email);
    const user = await User.findByEmail(req.params.email);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const deletedUser = await user.destroy();
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the user." });
  }
};
