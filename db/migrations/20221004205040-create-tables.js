/** @type {import('sequelize-cli').Migration} */
const { authSchema, AUTH_TABLE } = require("../models/authModel");
const { usersSchema, USERS_TABLE } = require("../models/usersModel");
const { tasksSchema, TASKS_TABLE } = require("../models/tasksModel");
const { teamsSchema, TEAMS_TABLE } = require("../models/teamsModel");

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USERS_TABLE, usersSchema);
    await queryInterface.createTable(TASKS_TABLE, tasksSchema);
    await queryInterface.createTable(AUTH_TABLE, authSchema);
    await queryInterface.createTable(TEAMS_TABLE, teamsSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(AUTH_TABLE);
    await queryInterface.dropTable(USERS_TABLE);
    await queryInterface.dropTable(TASKS_TABLE);
    await queryInterface.dropTable(TEAMS_TABLE);
  },
};
