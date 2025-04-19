require('dotenv').config();
const mongoose = require('mongoose');
const Menu = require('../models/Menu');

const menuItems = [
  { name: 'Hummus con pan pita', description: '', price: 5, category: 'entrante' },
  { name: 'Falafel (6 unidades)', description: '', price: 6, category: 'entrante' },
  { name: 'Shawarma de pollo', description: '', price: 10, category: 'shawarma' },
  { name: 'Shawarma de carne', description: '', price: 12, category: 'shawarma' },
  { name: 'Menú Shawarma + bebida', description: '', price: 14, category: 'menu' },
  { name: 'Menú Falafel + bebida', description: '', price: 12, category: 'menu' },
  { name: 'Bebida refresco', description: '', price: 2, category: 'bebida' }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Menu.deleteMany();
    await Menu.insertMany(menuItems);
    console.log('✅ Menú insertado correctamente');
    mongoose.disconnect();
  })
  .catch(err => console.error('❌ Error al poblar menú', err));

  