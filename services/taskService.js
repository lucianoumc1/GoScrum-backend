/* eslint-disable class-methods-use-this */
const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class TaskService {
  async create(user, data) {
    const res = await models.Task.create({
      ...data,
      createdBy: user.id,
      teamId: user.teamId,
    });
    return res;
  }

  async getOne(id) {
    try {
      const response = await models.Task.findByPk(id);

      if (!response) {
        throw boom.notFound("Task not found");
      }
      return response;
    } catch (err) {
      throw boom.notFound(err);
    }
  }

  async getAll(teamId) {
    const tasks = await models.Task.findAll({
      where: { teamId },
      include: ["created_by"],
    });
    const response = {
      message: "OK",
      result: tasks,
    };
    return response;
  }

  async getByUser(id) {
    const tasks = await models.Task.findAll({
      where: { createdBy: id },
      include: "created_by",
    });
    const response = {
      message: "OK",
      result: tasks,
    };
    return response;
  }

  async update(id, data, userId) {
    const task = await this.getOne(id);
    if (task.createdBy !== userId) {
      throw boom.unauthorized();
    }
    const response = await task.update(data);
    return response;
  }

  async delete(taskId, userId) {
    const task = await this.getOne(taskId);
    if (task.createdBy !== userId) {
      throw boom.unauthorized();
    }
    const response = await task.destroy();
    return response;
  }
}

module.exports = TaskService;
