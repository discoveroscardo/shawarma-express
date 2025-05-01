const { Scenes } = require('telegraf');
const MenuService = require('../services/menuService');
const OrderService = require('../services/orderService');

const orderWizard = new Scenes.WizardScene(
  'ORDER_WIZARD',
  
  // Paso 1: Mostrar menú
  async (ctx) => {
    try {
      const menuItems = await MenuService.getAllMenus();
      
      if (!menuItems || menuItems.length === 0) {
        await ctx.reply('⚠️ No hay items disponibles. Intenta más tarde.');
        return ctx.scene.leave();
      }

      ctx.session.order = {
        items: [],
        total: 0
      };

      const keyboard = menuItems.map(item => [
        { 
          text: `${item.name} - ${item.price}€`,
          callback_data: `add_${item._id}`
        }
      ]);

      await ctx.reply('🍽️ *Selecciona tus items:*', {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            ...keyboard,
            [{ text: '✅ Finalizar pedido', callback_data: 'finish_order' }]
          ]
        }
      });

      return ctx.wizard.next();
    } catch (err) {
      console.error('Error en Wizard Paso 1:', err);
      await ctx.reply('❌ Error al cargar el menú');
      return ctx.scene.leave();
    }
  },

  // Paso 2: Procesar selección
  async (ctx) => {
    if (!ctx.callbackQuery) {
      return ctx.reply('Por favor usa los botones para seleccionar');
    }

    const action = ctx.callbackQuery.data;

    if (action === 'finish_order') {
      if (ctx.session.order.items.length === 0) {
        await ctx.reply('⚠️ Debes agregar al menos un item');
        return;
      }
      
      await ctx.reply('📍 Por favor envía tu dirección de entrega:');
      return ctx.wizard.next();
    }

    // Agregar item
    if (action.startsWith('add_')) {
      const itemId = action.split('_')[1];
      const item = await MenuService.getItemById(itemId);
      
      ctx.session.order.items.push({
        name: item.name,
        price: item.price,
        quantity: 1
      });
      
      ctx.session.order.total += item.price;
      
      await ctx.answerCbQuery(`✅ ${item.name} añadido`);
      await ctx.editMessageReplyMarkup({
        inline_keyboard: [
          ...ctx.update.callback_query.message.reply_markup.inline_keyboard,
          [{ text: `🛒 Ver pedido (${ctx.session.order.items.length})`, callback_data: 'view_cart' }]
        ]
      });
    }
  },

  // Paso 3: Tomar dirección
  async (ctx) => {
    if (!ctx.message || !ctx.message.text) {
      await ctx.reply('Por favor envía una dirección válida');
      return;
    }

    try {
      const order = await OrderService.createOrder({
        userId: ctx.from.id,
        items: ctx.session.order.items,
        total: ctx.session.order.total,
        address: ctx.message.text,
        status: 'pending'
      });

      await ctx.replyWithMarkdown(
        `🎉 *Pedido realizado!*\n\n` +
        `📦 ID: #${order._id.toString().slice(-6)}\n` +
        `🍱 Items: ${order.items.map(i => i.name).join(', ')}\n` +
        `💰 Total: ${order.total}€\n\n` +
        `Puedes seguir el estado con /estado`
      );

      return ctx.scene.leave();
    } catch (err) {
      console.error('Error al crear pedido:', err);
      await ctx.reply('❌ Error al procesar tu pedido');
      return ctx.scene.leave();
    }
  }
);

// Mejora: Middleware para limpiar sesión
orderWizard.leave((ctx) => {
  if (ctx.session.order) {
    delete ctx.session.order;
  }
});

module.exports = orderWizard;