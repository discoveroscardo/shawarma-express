const Order = require('../models/Order');

class OrderService {
  static async getAllOrders() {
    return await Order.find().sort({ createdAt: -1 });
  }

  static async getOrderById(id) {
    return await Order.findById(id);
  }

  static async getUserOrders(userId) {
    return await Order.find({ userId }).sort({ createdAt: -1 });
  }

  static async createOrder(orderData) {
    const order = new Order(orderData);
    return await order.save();
  }

  static async updateOrderStatus(id, status) {
    return await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  }
}

module.exports = OrderService;