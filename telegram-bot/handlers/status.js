const OrderService = require('../services/orderService');

module.exports = async (ctx) => {
  try {
    const userId = ctx.from.id;
    const orders = await OrderService.getUserOrders(userId);

    if (!orders.length) {
      return ctx.reply('No tienes pedidos en curso');
    }

    const last = orders[orders.length - 1];
    ctx.reply(`📦 Pedido actual:\n• ID: ${last._id}\n• Estado: ${last.status}\n• Items: ${last.items.join(', ')}`);
  } catch (err) {
    console.error('Error al consultar estado:', err);
    ctx.reply('No pudimos consultar el estado del pedido');
  }
};
