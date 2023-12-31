const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
//const Recipe = require("./recipes.model");
const Book = sequelize.define("Book", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_path: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  free: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Set the default value to the current date and time
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Set the default value to the current date and time
  },
});
// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log("Table created successfully.");
  } catch (error) {
    console.error("Error creating the table:", error);
  }
})();

module.exports = Book;
