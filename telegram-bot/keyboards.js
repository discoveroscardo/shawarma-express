const { Markup } = require('telegraf');

module.exports = {
  mainMenu: Markup.keyboard([
    ['📋 Menú', '🛒 Pedir'],
    ['👤 Mi Cuenta', 'ℹ️ Ayuda']
  ]).resize().oneTime(),

  orderOptions: Markup.inlineKeyboard([
    Markup.button.callback('✅ Confirmar', 'confirm_order'),
    Markup.button.callback('✏️ Modificar', 'edit_order')
  ])
};