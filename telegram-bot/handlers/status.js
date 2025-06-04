const Order = require('../models/Order');

const statusHandler = async (ctx) => {
  try {
    const userId = ctx.from.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).limit(5);

    if (!orders || orders.length === 0) {
      return ctx.reply('🤔 No tienes pedidos activos');
    }

    let message = '📦 *Tus últimos pedidos:*\n\n';
    
    for (const order of orders) {
      const items = order.items.map(item => `${item.quantity}x ${item.name}`).join(', ');
      const statusEmoji = {
        'pending': '⏳',
        'preparing': '👨‍🍳',
        'out_for_delivery': '🛵',
        'completed': '✅'
      };

      message += `*Pedido #${order._id.toString().slice(-6)}*\n`;
      message += `${statusEmoji[order.status]} Estado: ${order.status}\n`;
      message += `🍽️ Items: ${items}\n`;
      message += `💰 Total: ${order.total}€\n`;
      message += `📍 Dirección: ${order.address}\n`;
      message += `📅 Fecha: ${order.createdAt.toLocaleString()}\n\n`;
    }

    return ctx.replyWithMarkdown(message);
  } catch (err) {
    console.error('Error en statusHandler:', err);
    return ctx.reply('❌ Error al obtener el estado de los pedidos');
  }
};

module.exports = statusHandler;