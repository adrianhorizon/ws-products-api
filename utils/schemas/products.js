const joi = require('@hapi/joi');

const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const nameProductSchema = joi.string().min(1).max(50);
const amountProductSchema = joi.number().precision(2).strict().min(0);
const itemProductSchema = joi.string().min(2).max(50);

const createProductsSchema = {
  name: nameProductSchema.required(),
  amount: amountProductSchema.required(),
  item_id: itemProductSchema.required(),
};

const updateProductsSchema = {
  name: nameProductSchema,
  amount: amountProductSchema,
  item_id: itemProductSchema
};

module.exports = {
  productIdSchema,
  createProductsSchema,
  updateProductsSchema
};
