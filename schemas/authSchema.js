const Joi = require("joi");
const { createUserSchema } = require("./userSchema");

const userName = Joi.string();
const password = Joi.string().min(6);

const loginAuthSchema = Joi.object({
  userName: userName.required(),
  password: password.required(),
});

const createAuthSchema = Joi.object({
  userName: userName.required(),
  password: password.required(),
  user: createUserSchema,
});

module.exports = { loginAuthSchema, createAuthSchema };
