const Joi = require("joi");

const validateSignup = {
  body: Joi.object({
    firstname: Joi.string().min(2).max(20).required(),
    lastname: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(16),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

const validateLogin = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

module.exports = { validateSignup, validateLogin }
