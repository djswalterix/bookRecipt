const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Book = require("./books.model");
const Recipe = require("./recipes.model");

const BookRecipe = sequelize.define("BookRecipes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Recipe.belongsToMany(Book, { through: BookRecipe });
Book.belongsToMany(Recipe, { through: BookRecipe });
// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log("Table created successfully.");
  } catch (error) {
    console.error("Error creating the table:", error);
  }
})();
module.exports = BookRecipe;
