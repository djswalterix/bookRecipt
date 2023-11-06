const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Book = require("./books.model");
const User = require("./users.model");

const Order = sequelize.define("Orders", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  invoice: { type: DataTypes.JSON, allowNull: false },
});

User.belongsToMany(Book, { through: Order });
Book.belongsToMany(User, { through: Order });
// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync();
    console.log("Table created successfully.");
  } catch (error) {
    console.error("Error creating the table:", error);
  }
})();
module.exports = Order;
