const MongoLib = require('../lib/mongo');

class CouponService {
  constructor() {
    this.collection = 'coupon';
    this.mongoDB = new MongoLib();
  }

  async getCoupons(querys) {
    const query = querys.items_ids && { items_ids: querys.items_ids };
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  async createCoupon(coupon) {
    const createCouponId = await this.mongoDB.create(this.collection, coupon);
    return createCouponId;
  }
}

module.exports = CouponService;
