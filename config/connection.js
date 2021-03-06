// Import sequelize class
const Sequelize = require("sequelize");

// Load environmental variables
require("dotenv").config();

let sequelize;

// Create sequelize instanced
// Configure to use Heroku environmental variables if present
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      port: 3306,
      logging: false,
    }
  );
}

module.exports = sequelize;
