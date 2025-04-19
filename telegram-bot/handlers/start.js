const { Markup } = require('telegraf');

module.exports = (ctx) => {
  const welcomeMessage = `¡Bienvenido a *Shawarma Express*! 🥙\n\n` +
    `Conmigo puedes:\n` +
    `• Ver el menú completo (/menu)\n` +
    `• Hacer pedidos directamente (/pedir)\n` +
    `• Consultar tu cuenta (/micuenta)\n\n` +
    `¿Qué te gustaría hacer?`;

  return ctx.replyWithMarkdown(welcomeMessage, 
    Markup.keyboard([
      ['📋 Ver Menú', '🛒 Hacer Pedido'],
      ['👤 Mi Cuenta', 'ℹ️ Ayuda']
    ])
    .resize()
    .oneTime()
  );
};