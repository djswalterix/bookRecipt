const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const fs = require("fs"); // Require the fs module to read the SSL certificate file

dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV ? "test" : process.env.DB_NAME,
  ssl: {
    // This is the path to the downloaded CA certificate
    ca: fs.readFileSync("ca.pem"),
  },
});

// Check the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the MySQL database using Sequelize.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();

module.exports = sequelize;
