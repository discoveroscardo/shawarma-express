// const { Markup } = require('telegraf');

// module.exports = (ctx) => {
//   const menuMessage = `*🥙 MENÚ SHAWARMA EXPRESS* 🥙\n\n` +
//     `*ENTRANTES*:\n` +
//     `• Hummus con pan pita - $5\n` +
//     `• Falafel (6 unidades) - $6\n\n` +
//     `*SHAWARMAS*:\n` +
//     `• Shawarma de pollo - $10\n` +
//     `• Shawarma de carne - $12\n\n` +
//     `*MENÚS COMPLETOS*:\n` +
//     `• Menú Shawarma + bebida - $14\n` +
//     `• Menú Falafel + bebida - $12\n\n` +
//     `Usa /pedir para hacer tu pedido`;

//   return ctx.replyWithMarkdown(menuMessage, 
//     Markup.inlineKeyboard([
//       Markup.button.callback('Hacer pedido', 'hacer_pedido')
//     ])
//   );
// };


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









// const { Markup } = require('telegraf');
// const MenuService = require('../services/menuService');

// module.exports = async (ctx) => {
//   try {
//     const items = await MenuService.getMenu();

//     const grouped = items.reduce((acc, item) => {
//       acc[item.category] = acc[item.category] || [];
//       acc[item.category].push(`• ${item.name} - $${item.price}`);
//       return acc;
//     }, {});

//     const menuMessage = `*🥙 MENÚ SHAWARMA EXPRESS* 🥙\n\n` +
//       `*ENTRANTES:*\n${(grouped['entrante'] || []).join('\n')}\n\n` +
//       `*SHAWARMAS:*\n${(grouped['shawarma'] || []).join('\n')}\n\n` +
//       `*MENÚS COMPLETOS:*\n${(grouped['menu'] || []).join('\n')}\n\n` +
//       `Usa /pedir para hacer tu pedido`;

//     return ctx.replyWithMarkdown(menuMessage,
//       Markup.inlineKeyboard([
//         Markup.button.callback('Hacer pedido', 'hacer_pedido')
//       ])
//     );
//   } catch (err) {
//     console.error('❌ Error en /menu:', err);
//     ctx.reply('No se pudo cargar el menú');
//   }
// };
