const Joi = require("joi");

const productSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().required(),
  category: Joi.string().required(),
});

module.exports = productSchema;
