const joi = require('@hapi/joi');

const itemCouponSchema = joi.array().items(joi.string().max(100));
const amountProductSchema = joi.number().precision(2).strict().min(0);

const createCouponsSchema = {
    items_ids: itemCouponSchema.required(),
    amount: amountProductSchema.required(),
};

module.exports = {
    createCouponsSchema,
};
