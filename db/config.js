const {
  dbHost,
  dbUser,
  dbPassword,
  dbDatabase,
  dbPort,
} = require("../config/config");

const URI = `mysql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;
module.exports = {
  development: {
    url: URI,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    url: URI,
    dialect: "mysql",
  },
};
