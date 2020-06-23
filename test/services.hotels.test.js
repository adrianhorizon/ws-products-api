const assert = require('assert');
const proxyquire = require('proxyquire');
const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');
const { productsMock } = require('../utils/mocks/products');

describe('services - products', () => {
  const ProductsServiceMock = proxyquire('../services/products', {
    '../lib/mongo': MongoLibMock
  });

  const productsService = new ProductsServiceMock();

  describe('when getProducts method is called', async () => {
    it('should call the getall MongoLib method', async () => {
      await productsService.getProducts({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of products', async () => {
      const result = await productsService.getProducts({});
      const expected = productsMock;
      assert.deepEqual(result, expected);
    });
  });
});
