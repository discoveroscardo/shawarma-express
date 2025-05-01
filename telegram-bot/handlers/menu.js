const { Markup } = require('telegraf');
const MenuService = require('../services/menuService');

const menuHandler = async (ctx) => {
  try {
    const menuItems = await MenuService.getAllMenus();
    
    if (!menuItems || menuItems.length === 0) {
      return ctx.reply('⚠️ No hay elementos en el menú aún');
    }

    let message = '*🥙 MENÚ SHAWARMA EXPRESS* 🥙\n\n';
    menuItems.forEach(item => {
      message += `• *${item.name}* - ${item.price}€\n`;
    });

    return ctx.replyWithMarkdown(message, 
      Markup.inlineKeyboard([
        Markup.button.callback('🛒 Hacer pedido', 'hacer_pedido')
      ])
    );
  } catch (err) {
    console.error('Error en menuHandler:', err);
    return ctx.reply('❌ No se pudo cargar el menú');
  }
};

module.exports = menuHandler ;