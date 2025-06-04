// backend/src/api/controllers/orderController.js (Mejorado)

const OrderService = require('../../services/orderService');

const orderController = {
  getAllOrders: async (req, res, next) => {
    try {
      const orders = await OrderService.getAllOrders();
      res.json(orders);
    } catch (err) {
      next(err);
    }
  },

  getOrderById: async (req, res, next) => {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
      res.json(order);
    } catch (err) {
      next(err);
    }
  },

  createOrder: async (req, res, next) => {
    try {
      const newOrder = await OrderService.createOrder(req.body);
      res.status(201).json(newOrder);
    } catch (err) {
      next(err);
    }
  },

  updateOrderStatus: async (req, res, next) => {
    try {
      const { status } = req.body;
      const validStatuses = ['pending', 'preparing', 'out_for_delivery', 'completed'];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Estado inválido' });
      }

      const updatedOrder = await OrderService.updateOrderStatus(req.params.id, status);
      res.json(updatedOrder);
    } catch (err) {
      next(err);
    }
  }
};

module.exports = orderController;
