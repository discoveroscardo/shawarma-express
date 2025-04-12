// bot.js - Bot básico de Telegram

const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

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

// Otros comandos pueden ir aquí, como /pedido, /confirmar, etc.
