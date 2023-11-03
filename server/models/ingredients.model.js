const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Ingredient = sequelize.define("Ingredient", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calories: DataTypes.FLOAT,
  fat: DataTypes.FLOAT,
  carbohydrates: DataTypes.FLOAT,
  protein: DataTypes.FLOAT,
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
module.exports = Ingredient;
