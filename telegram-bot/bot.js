require('dotenv').config();
const { Telegraf, Scenes, session } = require('telegraf');

// 1. Inicialización con más opciones de debug
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN, {
  telegram: { 
    agent: null, // Fuerza conexión limpia
    testEnv: process.env.NODE_ENV === 'test' // Solo para testing
  }
});

// Debug inicial
console.log('=== INICIANDO BOT ===');
console.log('Token:', process.env.TELEGRAM_BOT_TOKEN?.slice(0, 10) + '...');
console.log('MongoDB:', process.env.MONGO_URI?.slice(0, 25) + '...');

// 2. Configuración básica primero
bot.use((ctx, next) => {
  console.log(`[Update] ${ctx.updateType} from ${ctx.from?.id}`);
  return next();
});

// 3. Importar handlers CORRECTAMENTE
const startHandler = require('./handlers/start');
const menuHandler = require('./handlers/menu');
const accountHandler = require('./handlers/account');
const statusHandler = require('./handlers/status');
const orderHandler = require('./handlers/order')

// 4. Registrar comandos SIN middlewares complejos primero
bot.start(startHandler);
bot.command('menu', menuHandler);
bot.command('micuenta', accountHandler);
bot.command('estado', statusHandler);
bot.command('orden', orderHandler);

// 5. Wizard simplificado (comentado temporalmente)
// const orderWizard = new Scenes.WizardScene(...);
// const stage = new Scenes.Stage([orderWizard]);
// bot.use(stage.middleware());

// 6. Handler básico para /pedir (temporal)
bot.command('pedir', (ctx) => {
  console.log('Comando /pedir recibido');
  ctx.reply('Función de pedido temporal. Usa /menu primero.');
});

// 7. Manejo de errores mejorado
bot.catch((err, ctx) => {
  console.error('‼️ ERROR CRÍTICO:', err);
  ctx.reply('⚠️ Error interno. Por favor, inténtalo más tarde.');
});

// 8. Inicio seguro con verificación
const start = async () => {
  try {
    const botInfo = await bot.telegram.getMe();
    console.log('🤖 Bot info:', botInfo);
    
    await bot.launch();
    console.log('🚀 Bot iniciado correctamente');
    
    // Verificación adicional
    bot.telegram.sendMessage(
      process.env.ADMIN_CHAT_ID, 
      '🔔 Bot reiniciado correctamente'
    ).catch(e => console.log('No se pudo notificar al admin:', e));
    
  } catch (err) {
    console.error('💥 ERROR AL INICIAR:', err);
    process.exit(1);
  }
};

start();

// Manejo de cierre
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));