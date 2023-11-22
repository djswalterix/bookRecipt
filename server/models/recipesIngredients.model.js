const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Ingredient = require("./ingredients.model");
const Recipe = require("./recipes.model");

const RecipeIngredient = sequelize.define("RecipeIngredient", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: {
    type: DataTypes.DECIMAL(10, 2), //10 total digits, 2 decimal places.
    allowNull: false,
  },
});

Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient,
  as: "Ingredients",
});
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient, as: "Recipes" });
// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log("Table created successfully.");
  } catch (error) {
    console.error("Error creating the table:", error);
  }
})();
module.exports = RecipeIngredient;
