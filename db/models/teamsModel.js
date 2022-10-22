const { DataTypes, Model, Sequelize } = require("sequelize");
const { USERS_TABLE } = require("./usersModel");

const TEAMS_TABLE = "teams";

const teamsSchema = {
  id: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: true,
    allowNull: false,
  },
  teamLeader: {
    field: "team-leader",
    type: DataTypes.STRING,
    allowNull: false,
    reference: {
      model: USERS_TABLE,
      key: "id",
    },
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
};

class Teams extends Model {
  static associate(models) {
    this.hasMany(models.Task, {
      as: "tasks",
      foreignKey: "teamId",
    });
    this.belongsTo(models.User, { as: "leader", foreignKey: "teamLeader" });
    this.hasMany(models.User, { as: "users", foreignKey: "teamId" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TEAMS_TABLE,
      modelName: "Team",
      timestamps: false,
    };
  }
}

module.exports = { TEAMS_TABLE, teamsSchema, Teams };
