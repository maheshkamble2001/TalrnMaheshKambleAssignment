const { Sequelize } = require("sequelize");

// SQLite database connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite" // this file will be created automatically
});

module.exports = sequelize;
