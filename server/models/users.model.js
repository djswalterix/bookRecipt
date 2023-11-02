const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

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
});
User.findByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    throw new Error("Error while searching for the user by email.");
  }
};
module.exports = User;
