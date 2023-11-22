const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
//const Book = require("./books.model");
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Set the default value to the current date and time
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Set the default value to the current date and time
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user", // Imposta 'user' come valore predefinito
    validate: {
      isIn: [["user", "admin"]], // Assicurati che il ruolo sia uno di quelli ammessi
    },
  },
});
// Metodo per hashare la password prima di salvarla nel database
User.beforeCreate(async (user) => {
  if (user.password_hash) {
    const saltRounds = 10;
    user.password_hash = await bcrypt.hash(user.password_hash, saltRounds);
  }
});

// Metodo per validare la password
User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password_hash);
};
User.findByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    throw new Error("Error while searching for the user by email.");
  }
};
User.findPkbyEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    return user.id;
  } catch (error) {
    throw new Error("Error while searching for the user by email.");
  }
};
// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log("Table created successfully.");
  } catch (error) {
    console.error("Error creating the table:", error);
  }
})();

module.exports = User;
