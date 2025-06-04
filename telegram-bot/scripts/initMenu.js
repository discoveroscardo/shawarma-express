require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');

const menuItems = [
  {
    name: "Shawarma de Pollo",
    description: "Delicioso shawarma de pollo con verduras y salsas",
    price: 6.50,
    category: "shawarma"
  },
  {
    name: "Shawarma de Ternera",
    description: "Shawarma tradicional de ternera con verduras y salsas",
    price: 7.50,
    category: "shawarma"
  },
  {
    name: "Menú Shawarma Pollo",
    description: "Shawarma de pollo con bebida y patatas",
    price: 8.50,
    category: "menu"
  },
  {
    name: "Menú Shawarma Ternera",
    description: "Shawarma de ternera con bebida y patatas",
    price: 9.50,
    category: "menu"
  },
  {
    name: "Falafel",
    description: "5 piezas de falafel con salsa de tahini",
    price: 5.50,
    category: "entrante"
  },
  {
    name: "Hummus",
    description: "Hummus casero con pan de pita",
    price: 4.50,
    category: "entrante"
  },
  {
    name: "Coca-Cola",
    description: "Lata 33cl",
    price: 1.50,
    category: "bebida"
  },
  {
    name: "Agua Mineral",
    description: "Botella 50cl",
    price: 1.00,
    category: "bebida"
  }
];

async function initializeMenu() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Borrar menú existente
    await MenuItem.deleteMany({});
    console.log('🗑️ Menú anterior eliminado');

    // Insertar nuevos platos
    await MenuItem.insertMany(menuItems);
    console.log('✨ Nuevos platos insertados');

    console.log('✅ Inicialización completada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

initializeMenu(); 