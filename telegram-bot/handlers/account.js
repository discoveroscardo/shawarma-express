const { Markup } = require('telegraf');
const OrderService = require('../services/orderService');

module.exports = async (ctx) => {
  // Usuario disponible por el middleware
  const user = ctx.user;
  
  // Obtener últimos pedidos
  const orders = await OrderService.getUserOrders(user.id);

  const message = `👤 *Tu Cuenta* \n\n` +
    `Nombre: ${user.first_name} ${user.last_name || ''}\n` +
    `Usuario: @${user.username || 'sin usuario'}\n\n` +
    `📦 *Últimos pedidos*:\n${formatOrders(orders)}`;

  ctx.replyWithMarkdown(message, 
    Markup.inlineKeyboard([
      Markup.button.callback('Historial completo', 'full_history')
    ])
  );
};

function formatOrders(orders) {
  return orders.map(o => 
    `#${o._id} - ${o.status} - ${o.items.join(', ')}`
  ).join('\n') || 'Aún no tienes pedidos';
}