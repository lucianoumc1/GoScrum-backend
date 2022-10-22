/* eslint-disable class-methods-use-this */
const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class UsersServices {
  async;

  async getOne(id) {
    const user = await models.User.findByPk(id, {
      include: ["auth", "team"],
    });
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }

  async getAll() {
    const data = await models.User.findAll();
    return data;
  }

  async update(id, data) {
    const user = await this.getOne(id);
    const response = await user.update(data, { where: { id } });
    return response;
  }

  async delete(id) {
    const user = await this.getOne(id);
    const response = await user.destroy();
    return response;
  }
}

module.exports = UsersServices;
