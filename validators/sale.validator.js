const Joi = require("joi");

const saleSchema = Joi.object().keys({
  date: Joi.date().required(),
  products: Joi.array().items(Joi.string().required()),
});

module.exports = saleSchema;
