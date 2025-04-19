require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const authMiddleware = require('./middleware/authMiddleware');
bot.use(authMiddleware);



// Importar handlers
const startHandler = require('./handlers/start');
const menuHandler = require('./handlers/menu');
const orderHandler = require('./handlers/order');
const accountHandler = require('./handlers/account');
const statusHandler = require('./handlers/status');



// Registrar middlewares (si los tienes)
// bot.use(miMiddleware);

// Registrar handlers de comandos
bot.start(startHandler);
bot.command('menu', menuHandler);
bot.command('pedir', orderHandler);
bot.command('micuenta', accountHandler);
bot.command('ayuda', (ctx) => ctx.reply('¿Necesitas ayuda? Contáctanos directamente en el restaurante.'));
bot.command('estado', statusHandler);

// otra vaina


bot.on('callback_query', async (ctx) => {
  const callbackData = ctx.callbackQuery.data;

  if (callbackData.startsWith('status_')) {
    const orderId = callbackData.split('status_')[1];
    const order = await OrderService.getOrderById(orderId);

    if (!order) return ctx.reply('Pedido no encontrado');

    return ctx.reply(`📦 Estado de tu pedido: *${order.status}*`, { parse_mode: 'Markdown' });
  }
});




// Manejar mensajes no comandos
bot.on('text', (ctx) => {
  if (ctx.message.text.toLowerCase().includes('hola')) {
    ctx.reply('¡Hola! ¿En qué puedo ayudarte? Usa /menu para ver nuestras opciones.');
  }
});

// Manejar errores
bot.catch((err, ctx) => {
  console.error(`Error en ${ctx.updateType}`, err);
  ctx.reply('❌ Ocurrió un error procesando tu solicitud');
});

// Iniciar bot
bot.launch()
  .then(() => console.log('🤖 Bot iniciado correctamente'))
  .catch(err => console.error('🚨 Error al iniciar bot:', err));

// Manejar cierre elegante
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = bot;
