module.exports = (ctx) => {
    const menuMessage = `*🥙 MENÚ SHAWARMA EXPRESS* 🥙\n\n` +
      `*ENTRANTES*:\n` +
      `• Hummus con pan pita - $5\n` +
      `• Falafel (6 unidades) - $6\n\n` +
      `*SHAWARMAS*:\n` +
      `• Shawarma de pollo - $10\n` +
      `• Shawarma de carne - $12\n\n` +
      `*MENÚS COMPLETOS*:\n` +
      `• Menú Shawarma + bebida - $14\n` +
      `• Menú Falafel + bebida - $12\n\n` +
      `Usa /pedir para hacer tu pedido o selecciona "🛒 Hacer Pedido"`;
  
    ctx.replyWithMarkdown(menuMessage);
  };