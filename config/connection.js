const Sequelize = require('sequelize');
require('dotenv').config();
let sequelize;

// Set up the database connection based on the environment variables
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  const { DB_NAME, DB_USER, DB_PW } = process.env;
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PW, {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  });
}

module.exports = sequelize;