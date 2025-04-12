// bot.js - Bot básico de Telegram

const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

// Importar handlers
const startHandler = require('./handlers/start');
const menuHandler = require('./handlers/menu');
const orderHandler = require('./handlers/order');
const accountHandler = require('./handlers/account');

// Tu token de Telegram, lo guardas en el archivo .env
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// Comando /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "¡Bienvenido a Shawarma Express! ¿Qué te gustaría pedir?");
});

// Comando /menu
bot.onText(/\/menu/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Menú disponible:\n1. Shawarma Clásico\n2. Menú Shawarma\n3. Hummus");
});

// Otros comandos 

bot.start(startHandler);
bot.command('menu', menuHandler);
bot.command('pedir', orderHandler);
bot.command('micuenta', accountHandler);
bot.command('ayuda', (ctx) => {
  ctx.reply('¿Necesitas ayuda? Contáctanos directamente en el restaurante.');
});


// Manejar errores
bot.catch((err, ctx) => {
    console.error(`Error para ${ctx.updateType}`, err);
    ctx.reply('Ocurrió un error procesando tu solicitud.');
  });


// Iniciar bot
bot.launch()
.then(() => console.log('Bot iniciado correctamente'))
.catch(err => console.error('Error al iniciar bot:', err));

// Manejar cierre elegante
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));