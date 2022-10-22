const Joi = require("joi");

const id = Joi.number();
const title = Joi.string().min(3).max(30);
const status = Joi.string();
const importance = Joi.string();
const description = Joi.string().max(250);

const createTaskSchema = Joi.object({
  title: title.required(),
  status: status.required(),
  importance: importance.required(),
  description: description.required(),
});

const updateTasksSchema = Joi.object({
  title,
  importance,
  status,
  description,
});

const idTaskSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createTaskSchema,
  updateTasksSchema,
  idTaskSchema,
};
