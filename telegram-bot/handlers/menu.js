const { Markup } = require('telegraf');
const MenuService = require('../services/menuService');

module.exports = async (ctx) => {
  try {
    const menuItems = await MenuService.getAllMenus();

    if (menuItems.length === 0) {
      return ctx.reply('⚠️ No hay elementos en el menú aún');
    }

    let message = '*🥙 MENÚ SHAWARMA EXPRESS* 🥙\n\n';

    menuItems.forEach(item => {
      message += `• *${item.name}* - ${item.price}€\n`;
    });

    ctx.replyWithMarkdown(message,
      Markup.inlineKeyboard([
        Markup.button.callback('🛒 Hacer pedido', 'hacer_pedido')
      ])
    );
  } catch (err) {
    console.error('Error al obtener el menú:', err);
    ctx.reply('❌ No se pudo cargar el menú');
  }
};