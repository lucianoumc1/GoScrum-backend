const { authSchema, Auth } = require("./authModel");
const { usersSchema, User } = require("./usersModel");
const { tasksSchema, Task } = require("./tasksModel");
const { teamsSchema, Teams } = require("./teamsModel");

const setupModels = (sequelize) => {
  Auth.init(authSchema, Auth.config(sequelize));
  User.init(usersSchema, User.config(sequelize));
  Task.init(tasksSchema, Task.config(sequelize));
  Teams.init(teamsSchema, Teams.config(sequelize));

  Auth.associate(sequelize.models);
  Task.associate(sequelize.models);
  User.associate(sequelize.models);
  Teams.associate(sequelize.models);
};

module.exports = setupModels;
