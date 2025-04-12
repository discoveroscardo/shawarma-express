const { Markup } = require('telegraf');

module.exports = (ctx) => {
  const welcomeMessage = `¡Bienvenido a *Shawarma Express*! 🥙\n\n` +
    `Con este bot puedes:\n` +
    `• Ver nuestro menú (/menu)\n` +
    `• Hacer pedidos (/pedir)\n` +
    `• Consultar tu cuenta (/micuenta)\n\n` +
    `¿En qué podemos ayudarte hoy?`;

  ctx.replyWithMarkdown(welcomeMessage, 
    Markup.keyboard([
      ['📋 Ver Menú', '🛒 Hacer Pedido'],
      ['👤 Mi Cuenta', 'ℹ️ Ayuda']
    ]).resize()
  );
};