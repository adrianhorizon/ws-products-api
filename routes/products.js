const express = require('express');
const ProductsService = require('../services/products');
const { productIdSchema, createProductsSchema, updateProductsSchema } = require('../utils/schemas/products');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

const productsApi = (app) => {
  const router = express.Router();
  app.use('/api/products', router);

  const productsService = new ProductsService();

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

    try {
      const products = await productsService.getProducts(req.query);

      res.status(200).json({
        products,
        totalSize: products.length,
        message: 'products listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:productId',
    validationHandler({ productId: productIdSchema }, 'params'),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { productId } = req.params;

      try {
        const products = await productsService.getProduct({ productId });

        res.status(200).json({
          products,
          message: 'product retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/', validationHandler(createProductsSchema), async (
    req,
    res,
    next
  ) => {
    const { body: product } = req;
    try {
      const query = {
        item_id: product.item_id,
      };

      const item = await productsService.getProducts(query);

      if (item[0] && item[0].item_id === product.item_id) {

        return res.status(400).json({
          message: `ya existe el elemento ${product.item_id}`
        });

      } else {
        const createdProductId = await productsService.createProduct({ product });

        return res.status(201).json({
          data: createdProductId,
          message: 'product created'
        });
      }
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:productId',
    validationHandler({ productId: productIdSchema }, 'params'),
    validationHandler(updateProductsSchema),
    async (req, res, next) => {
      const { productId } = req.params;
      const { body: product } = req;

      try {
        const query = {
          item_id: product.item_id,
        };

        const item = await productsService.getProducts(query);

        if (item[0] && item[0].item_id === product.item_id) {

          return res.status(400).json({
            message: `no se puede editar ya tiene asociado el item_id ${product.item_id}`
          });

        } else {
          const updatedProductId = await productsService.updateProduct({
            productId,
            product
          });

          return res.status(200).json({
            product: updatedProductId,
            message: 'product updated'
          });
        }
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:productId',
    validationHandler({ productId: productIdSchema }, 'params'),
    async (req, res, next) => {
      const { productId } = req.params;

      try {
        const deletedProductId = await productsService.deleteProduct({ productId });

        res.status(200).json({
          product: deletedProductId,
          message: 'product deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = productsApi;
