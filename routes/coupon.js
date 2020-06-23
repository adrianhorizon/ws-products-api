const express = require('express');
const CouponService = require('../services/coupon');
const ProductsService = require('../services/products');
const { createCouponsSchema } = require('../utils/schemas/coupon');
const validationHandler = require('../utils/middleware/validationHandler');
const calculate = require('../utils/calculate');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS } = require('../utils/time');

const couponApi = (app) => {
  const router = express.Router();
  app.use('/api/coupon', router);

  const couponService = new CouponService();
  const productsService = new ProductsService();

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

    try {
      const coupons = await couponService.getCoupons(req.query);

      res.status(200).json({
        coupons,
        message: 'coupons listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', validationHandler(createCouponsSchema), async (
    req,
    res,
    next
  ) => {
    const { body: product } = req;
    try {
      const products = await productsService.getProducts(req.query);
      const totalCalculate = calculate(products, product);

      const create = {
        items_ids: totalCalculate.item_ids,
        total: totalCalculate.total
      };

      const createdProductId = await couponService.createCoupon(create);

      res.status(201).json({
        data: createdProductId,
        create,
        message: 'purchase ok'
      });
    } catch (err) {
      next(err);
    }
  });

}

module.exports = couponApi;
