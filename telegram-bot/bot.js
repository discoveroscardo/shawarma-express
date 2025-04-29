require('dotenv').config();
const { Telegraf, Scenes, session } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Importar middlewares y servicios
const authMiddleware = require('./middlewares/authMiddleware');
const OrderService = require('./services/orderService');
const MenuService = require('./services/menuService');

// Importar handlers
const startHandler = require('./handlers/start');
const menuHandler = require('./handlers/menu');
const orderHandler = require('./handlers/order');
const accountHandler = require('./handlers/account');
const statusHandler = require('./handlers/status');

// Configurar sesiones y escenas
const orderWizard = require('./wizards/orderWizard.js/orderWizard'); // Nuevo wizard para pedidos
const stage = new Scenes.Stage([orderWizard]);

// Middlewares
bot.use(session());
bot.use(stage.middleware());
// bot.use(authMiddleware);

// Comandos
bot.start(startHandler);
bot.command('menu', menuHandler);
bot.command('pedir', (ctx) => ctx.scene.enter('ORDER_WIZARD'));
bot.command('micuenta', accountHandler);
bot.command('estado', statusHandler);

// Callbacks
bot.action(/status_(\w+)/, async (ctx) => {
  const orderId = ctx.match[1];
  const order = await OrderService.getOrderById(orderId);
  
  if (!order) {
    return ctx.reply('Pedido no encontrado');
  }
  
  const statusMessages = {
    pending: '⏳ Tu pedido está pendiente',
    preparing: '👨‍🍳 Tu pedido está en preparación',
    out_for_delivery: '🚴 Tu pedido está en camino',
    completed: '✅ Pedido completado. ¡Gracias!'
  };
  
  ctx.reply(statusMessages[order.status] || `Estado: ${order.status}`);
});

// Manejo de errores
bot.catch((err, ctx) => {
  console.error(`Error en ${ctx.updateType}:`, err);
  ctx.reply('❌ Ocurrió un error procesando tu solicitud');
});

// Iniciar bot
bot.launch()
  .then(() => console.log('🤖 Bot iniciado correctamente'))
  .catch(err => console.error('🚨 Error al iniciar bot:', err));

// Manejo de cierre
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = bot;