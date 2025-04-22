const OrderService = require('../services/orderService');

module.exports = async (ctx) => {
  try {
    const orders = await OrderService.getUserOrders(ctx.from.id);
    
    if (!orders.length) {
      return ctx.reply('No tienes pedidos activos. Usa /pedir para hacer uno nuevo.');
    }
    
    const lastOrder = orders[0];
    const statusMessages = {
      pending: '⏳ Pendiente',
      preparing: '👨‍🍳 En preparación',
      out_for_delivery: '🚴 En reparto',
      completed: '✅ Completado'
    };
    
    const message = `📦 *Estado de tu pedido* (ID: #${lastOrder._id})\n\n` +
      `• Items: ${lastOrder.items.map(i => i.name).join(', ')}\n` +
      `• Estado: ${statusMessages[lastOrder.status] || lastOrder.status}\n` +
      `• Total: ${lastOrder.total}€\n\n` +
      `Puedes consultar de nuevo en cualquier momento con /estado`;
    
    ctx.replyWithMarkdown(message);
  } catch (err) {
    console.error('Error al consultar estado:', err);
    ctx.reply('No pudimos consultar el estado de tus pedidos. Por favor, inténtalo más tarde.');
  }
};