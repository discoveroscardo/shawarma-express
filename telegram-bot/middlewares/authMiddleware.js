const UserService = require('../services/userService');

module.exports = async (ctx, next) => {
  try {
    // Verificar si usuario existe en DB
    const user = await UserService.getOrCreateUser({
      id: ctx.from.id,
      username: ctx.from.username,
      first_name: ctx.from.first_name,
      last_name: ctx.from.last_name
    });
    
    // Adjuntar user al contexto
    ctx.user = user;
    return next();
  } catch (err) {
    console.error('Auth error:', err);
    return ctx.reply('🔒 Error de autenticación');
  }
};