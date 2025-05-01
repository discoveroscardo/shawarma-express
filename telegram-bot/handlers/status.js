const OrderService = require('../services/orderService');

const statusHandler = async (ctx) => {
  try {
    const orders = await OrderService.getUserOrders(ctx.from.id);
    
    if (!orders || orders.length === 0) {
      return ctx.reply('No tienes pedidos activos. Usa /pedir para hacer uno nuevo.');
    }

    const lastOrder = orders[0];
    const statusMap = {
      pending: '⏳ Pendiente',
      preparing: '👨‍🍳 En preparación',
      out_for_delivery: '🚚 En camino',
      completed: '✅ Entregado'
    };

    const message = 
      `📦 *Pedido #${lastOrder._id.toString().slice(-6)}*\n\n` +
      `• Items: ${lastOrder.items.map(i => i.name).join(', ')}\n` +
      `• Estado: ${statusMap[lastOrder.status] || lastOrder.status}\n` +
      `• Total: ${lastOrder.total}€\n\n` +
      `Dirección: ${lastOrder.address || 'No especificada'}`;

    return ctx.replyWithMarkdown(message);
  } catch (err) {
    console.error('Error en statusHandler:', err);
    return ctx.reply('❌ Error al consultar tu pedido');
  }
};

module.exports = statusHandler;