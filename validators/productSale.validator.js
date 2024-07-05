const Joi = require("joi");

const productSaleSchema = Joi.object().keys({
  product: Joi.string().required(),
  sale: Joi.string().required(),
  quantity: Joi.number().required(),
});

module.exports = productSaleSchema;
