// backend/src/api/controllers/orderController.js (Mejorado)

const Order = require('../../models/Order');

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el pedido', error: error.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const order = new Order(req.body);
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el pedido', error: error.message });
    }
  },

  updateOrderStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar el pedido', error: error.message });
    }
  }
};

module.exports = orderController;
