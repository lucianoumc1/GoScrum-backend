const Joi = require("joi");

const userName = Joi.string();
const email = Joi.string().email();
const rol = Joi.string();
const continent = Joi.string();
const region = Joi.string();
const teamId = Joi.string();

const createUserSchema = Joi.object({
  name: userName.required(),
  email: email.required(),
  rol: rol.required(),
  continent: continent.required(),
  region,
  teamId: teamId.required(),
});

module.exports = { createUserSchema };
