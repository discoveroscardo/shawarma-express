// const { Markup } = require('telegraf');
// const OrderService = require('../services/orderService');

// module.exports = async (ctx) => {
//   // Paso 1: Mostrar opciones
//   await ctx.reply('¿Qué deseas pedir?', 
//     Markup.keyboard([
//       ['Shawarma Pollo', 'Shawarma Carne'],
//       ['Menú Completo', 'Solo Bebida'],
//       ['Cancelar']
//     ]).resize().oneTime()
//   );

//   // Paso 2: Esperar selección
//   bot.on('text', async (ctx) => {
//     const userChoice = ctx.message.text;
    
//     if (userChoice === 'Cancelar') {
//       return ctx.reply('Pedido cancelado', Markup.removeKeyboard());
//     }

//     // Guardar pedido en DB
//     try {
//       const order = await OrderService.createOrder({
//         userId: ctx.from.id,
//         items: [userChoice],
//         status: 'pending'
//       });
      
//       ctx.reply(`✅ Pedido recibido (ID: ${order._id})`, 
//         Markup.inlineKeyboard([
//           Markup.button.callback('Ver estado', `status_${order._id}`)
//         ])
//       );
//     } catch (err) {
//       ctx.reply('❌ Error al procesar pedido');
//     }
//   });
// };

const { Markup } = require('telegraf');
const MenuService = require('../services/menuService');
const OrderService = require('../services/orderService');

let awaitingOrder = {}; // Temporal por usuario

module.exports = async (ctx) => {
  const menuItems = await MenuService.getAllMenus();
  if (!menuItems.length) return ctx.reply('No hay productos para pedir 😞');

  // Guardamos los productos por nombre (clave) para luego buscarlos
  const productNames = menuItems.map(item => item.name);
  awaitingOrder[ctx.from.id] = true;

  await ctx.reply('Selecciona un producto:',
    Markup.keyboard([...productNames, 'Cancelar']).resize().oneTime()
  );
};

// Captura del pedido
const bot = require('../botInstance'); // Para que acceda al bot
bot.on('text', async (ctx) => {
  const userId = ctx.from.id;

  if (!awaitingOrder[userId]) return;

  const choice = ctx.message.text;

  if (choice === 'Cancelar') {
    awaitingOrder[userId] = false;
    return ctx.reply('Pedido cancelado.', Markup.removeKeyboard());
  }

  try {
    const order = await OrderService.createOrder({
      userId,
      items: [choice],
      status: 'pending'
    });

    awaitingOrder[userId] = false;

    return ctx.reply(`✅ Pedido realizado (ID: ${order._id})`,
      Markup.inlineKeyboard([
        Markup.button.callback('📦 Ver estado', `status_${order._id}`)
      ])
    );
  } catch (err) {
    console.error(err);
    ctx.reply('❌ Error al registrar tu pedido.');
  }
});
