const OrderService = require('../../services/orderService');

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllOrders,
};
