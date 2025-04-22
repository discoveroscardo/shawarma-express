const { Scenes } = require('telegraf');
const MenuService = require('../services/menuService');
const OrderService = require('../services/orderService');

const orderWizard = new Scenes.WizardScene(
  'ORDER_WIZARD',
  async (ctx) => {
    const menuItems = await MenuService.getAllMenus();
    const keyboard = menuItems.map(item => [{ text: `${item.name} - ${item.price}€` }]);
    
    await ctx.reply('Selecciona los items para tu pedido:', {
      reply_markup: {
        keyboard: [...keyboard, [{ text: '✅ Finalizar pedido' }]],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    });
    
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (ctx.message.text === '✅ Finalizar pedido') {
      if (!ctx.session.orderItems || ctx.session.orderItems.length === 0) {
        await ctx.reply('Debes seleccionar al menos un item. Canceland pedido.');
        return ctx.scene.leave();
      }
      
      await ctx.reply('Por favor, envía tu dirección de entrega:');
      return ctx.wizard.next();
    }
    
    // Procesar selección de items
    const selectedItem = ctx.message.text.split(' - ')[0];
    ctx.session.orderItems = ctx.session.orderItems || [];
    ctx.session.orderItems.push(selectedItem);
    
    await ctx.reply(`✅ ${selectedItem} añadido. Selecciona más items o pulsa "Finalizar pedido"`);
  },
  async (ctx) => {
    const address = ctx.message.text;
    
    try {
      const order = await OrderService.createOrder({
        userId: ctx.from.id,
        items: ctx.session.orderItems.map(item => ({ name: item, quantity: 1 })),
        status: 'pending',
        total: ctx.session.orderItems.length * 10, // Simulación de cálculo
        address
      });
      
      await ctx.reply(
        `🎉 Pedido realizado con éxito!\n\nID: #${order._id}\nItems: ${ctx.session.orderItems.join(', ')}\n\nPuedes ver el estado con /estado`,
        { reply_markup: { remove_keyboard: true } }
      );
    } catch (err) {
      console.error(err);
      await ctx.reply('Error al crear el pedido. Por favor, inténtalo de nuevo.');
    }
    
    // Limpiar sesión y salir
    ctx.session.orderItems = [];
    return ctx.scene.leave();
  }
);

module.exports = orderWizard;