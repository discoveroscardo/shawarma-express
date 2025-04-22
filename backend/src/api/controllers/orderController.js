// const OrderService = require('../../services/orderService');

// const getAllOrders = async (req, res, next) => {
//   try {
//     const orders = await OrderService.getAllOrders();
//     res.json(orders);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = {
//   getAllOrders,
// };


const OrderService = require('../../services/orderService');

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'preparing', 'out_for_delivery', 'completed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedOrder = await OrderService.updateOrderStatus(req.params.id, status);
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderStatus
};