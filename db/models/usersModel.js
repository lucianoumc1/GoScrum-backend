const { Model, DataTypes, Sequelize } = require("sequelize");
const { TEAMS_TABLE } = require("./teamsModel");

const USERS_TABLE = "users";

const usersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER.UNSIGNED,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  rol: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  continent: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  region: {
    type: DataTypes.STRING,
  },
  teamId: {
    allowNull: false,
    field: "team_id",
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

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Team, { as: "team" });
    this.hasOne(models.Auth, { as: "auth", foreignKey: "userId" });
    this.hasOne(models.Team, { as: "leader", foreignKey: "teamLeader" });
    this.hasMany(models.Task, { as: "tasks", foreignKey: "createdBy" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

module.exports = { USERS_TABLE, usersSchema, User };
