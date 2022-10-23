const { Sequelize } = require("sequelize");
const {
  dbHost,
  dbUser,
  dbPassword,
  dbDatabase,
  dbPort,
} = require("../config/config");
const setupModels = require("../db/models");

const URI = `mysql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;

const sequelize = new Sequelize(URI, {
  dialect: "mysql",
  logging: console.log,
});

setupModels(sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
