const { Sequelize, DataTypes, Model } = require("sequelize");
const { USERS_TABLE } = require("./usersModel");
const { TEAMS_TABLE } = require("./teamsModel");

const TASKS_TABLE = "tasks";

const tasksSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  importance: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdBy: {
    field: "created_by",
    allowNull: false,
    type: DataTypes.INTEGER.UNSIGNED,
    reference: {
      model: USERS_TABLE,
      key: "id",
    },
  },
  teamId: {
    field: "team_id",
    allowNull: false,
    type: DataTypes.STRING,
    reference: {
      model: TEAMS_TABLE,
      key: "id",
    },
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    allowNull: false,
    field: "updated_at",
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
};

class Task extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: "created_by", foreignKey: "createdBy" });
    // this.belongsTo(models.Team, { as: "team" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASKS_TABLE,
      modelName: "Task",
      timestamps: false,
    };
  }
}

module.exports = { TASKS_TABLE, tasksSchema, Task };
