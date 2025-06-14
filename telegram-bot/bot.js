// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const app = express();

// Ruta básica para mantener a Render feliz
app.get('/', (req, res) => {
  res.send('Shawarma bot is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

const { Telegraf, Scenes, session } = require('telegraf');
const mongoose = require('mongoose');

// === INICIANDO BOT ===
console.log('Token:', process.env.BOT_TOKEN?.slice(0, 10) + '...');
console.log('MongoDB:', process.env.MONGODB_URI?.slice(0, 25) + '...');
console.log('Backend URL:', process.env.BACKEND_URL?.slice(0, 25) + '...');

// 1. Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error MongoDB:', err));

// 2. Crear instancia del bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// 3. Debug por cada update
bot.use((ctx, next) => {
  console.log(`[Update] ${ctx.updateType} from ${ctx.from?.id}`);
  return next();
});

// 4. Configurar Wizard
const orderWizard = require('./wizards/orderWizard');
const stage = new Scenes.Stage([orderWizard]);

// 5. Middlewares esenciales
bot.use(session());
bot.use(stage.middleware());

// 6. Importar handlers
const startHandler = require('./handlers/start');
const menuHandler = require('./handlers/menu');
const accountHandler = require('./handlers/account');
const statusHandler = require('./handlers/status');

// 7. Registrar comandos
bot.start(startHandler);
bot.command('menu', menuHandler);
bot.command('micuenta', accountHandler);
bot.command('estado', statusHandler);
bot.command('pedir', (ctx) => ctx.scene.enter('ORDER_WIZARD'));

// 8. Manejo de errores global
bot.catch((err, ctx) => {
  console.error('‼️ Error global:', err);
  ctx.reply('⚠️ Ocurrió un error. Por favor, inténtalo de nuevo.');
});

// 9. Lanzar bot de forma segura
const start = async () => {
  try {
    const botInfo = await bot.telegram.getMe();
    console.log('🤖 Bot info:', botInfo);

    await bot.launch();
    console.log('🚀 Bot iniciado correctamente');

  } catch (err) {
    console.error('💥 ERROR AL INICIAR:', err);
    process.exit(1);
  }
};

start();

// 10. Manejo de cierre
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


setInterval(() => {}, 1000 * 60 * 60);
