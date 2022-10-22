const { DataTypes, Model } = require("sequelize");
const { USERS_TABLE } = require("./usersModel");

const AUTH_TABLE = "auth";

const authSchema = {
  userName: {
    allowNull: false,
    primaryKey: true,
    unique: true,
    type: DataTypes.STRING,
    field: "user-name",
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  userId: {
    field: "user-id",
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: USERS_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
};

class Auth extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: "user" });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: AUTH_TABLE,
      modelName: "Auth",
      timestamps: false,
    };
  }
}

module.exports = { AUTH_TABLE, authSchema, Auth };
