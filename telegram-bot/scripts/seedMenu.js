// require('dotenv').config();
// // const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://admin:Programando.01@cluster0.bjooj.mongodb.net/shawarma?retryWrites=true&w=majority')
// const Menu = require('../models/MenuItem');

// const menuItems = [
//   { name: 'Hummus con pan pita', description: '', price: 5, category: 'entrante' },
//   { name: 'Falafel (6 unidades)', description: '', price: 6, category: 'entrante' },
//   { name: 'Shawarma de pollo', description: '', price: 10, category: 'shawarma' },
//   { name: 'Shawarma de carne', description: '', price: 12, category: 'shawarma' },
//   { name: 'Menú Shawarma + bebida', description: '', price: 14, category: 'menu' },
//   { name: 'Menú Falafel + bebida', description: '', price: 12, category: 'menu' },
//   { name: 'Bebida refresco', description: '', price: 2, category: 'bebida' }
// ];

// mongoose.connect(process.env.MONGO_URI)
//   .then(async () => {
//     await MenuItem.deleteMany();
//     await MenuItem.insertMany(menuItems);
//     console.log('✅ Menú insertado correctamente');
//     mongoose.disconnect();
//   })
//   .catch(err => console.error('❌ Error al poblar menú', err));

  

// telegram-bot/scripts/seedMenu.js (Script completo)
require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');

const menuItems = [
  { 
    name: 'Shawarma de Pollo', 
    description: 'Delicioso shawarma con salsa especial', 
    price: 8.50, 
    category: 'shawarma' 
  },
  { 
    name: 'Shawarma de Carne', 
    description: 'Carne de res marinada con especias', 
    price: 9.50, 
    category: 'shawarma' 
  },
  { 
    name: 'Falafel', 
    description: 'Croquetas de garbanzo con tahini', 
    price: 6.00, 
    category: 'entrante' 
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✔ Conectado a MongoDB');
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(menuItems);
    console.log('✅ Menú insertado correctamente');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });