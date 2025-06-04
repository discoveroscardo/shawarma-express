const Order = require('../models/Order');

const orderService = {
  getAllOrders: async () => {
    return await Order.find().sort({ createdAt: -1 });
  },

  getOrderById: async (orderId) => {
    return await Order.findById(orderId);
  },

  createOrder: async (orderData) => {
    const order = new Order(orderData);
    return await order.save();
  },

  updateOrderStatus: async (orderId, status) => {
    return await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
  }
};

module.exports = orderService; 