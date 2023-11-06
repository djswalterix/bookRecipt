const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "test",
});

// Check the database connection
const testDb = (async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the test MySQL database using Sequelize.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();

module.exports = testDb;
