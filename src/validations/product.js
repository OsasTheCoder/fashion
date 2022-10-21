const Joi = require("joi");

const validateProduct = {
  body: Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

const validateProductUpdate = {
    params: Joi.object({
        productId: Joi.number().required()
      }),
    body: Joi.object({
      name: Joi.string(),
      category: Joi.string()
    }).messages({
      "object.unknown": "You have used an invalid key."
    })
  };


const validateProductId = {
  params: Joi.object({
    productId: Joi.number().required()
  }).messages({
    "object.unknown": "You have used an invalid key."
  })
};

module.exports = { validateProduct, validateProductUpdate, validateProductId }