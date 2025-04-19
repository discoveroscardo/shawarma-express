const Order = require('../models/Order');

class OrderService {
  static async createOrder(orderData) {
    const order = new Order(orderData);
    return await order.save();
  }

  static async getOrderById(id) {
    return await Order.findById(id);
  }

  static async updateOrderStatus(id, status) {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
  }
}

module.exports = OrderService;