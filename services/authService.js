/* eslint-disable class-methods-use-this */
const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");
const { encrypt } = require("../utils/crypt");

class AuthService {
  async findByUserName(userName) {
    try {
      const user = await models.Auth.findByPk(userName, {
        include: ["user"],
      });
      if (!user) {
        throw boom.notFound("user or password is incorrect");
      }

      return user;
    } catch (err) {
      throw boom.notFound("user or password is incorrect");
    }
  }

  async create(data) {
    data.password = await encrypt(data.password);

    const response = await models.Auth.create(data, {
      include: ["user"],
    });
    delete response.dataValues.password;
    return response;
  }
}

module.exports = AuthService;
