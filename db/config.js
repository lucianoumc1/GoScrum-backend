const { dbHost, dbUser, dbPassword, dbDatabase } = require("../config/config");

const URI = `mysql://${dbUser}:${dbPassword}@${dbHost}/${dbDatabase}`;

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
