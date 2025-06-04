require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const orderRoutes = require('./src/api/routes/orders');
const dishRoutes = require('./src/api/routes/dishes');
const errorHandler = require('./src/api/middlewares/errorHandler');
const Dish = require('./src/models/Dish');

const app = express();

// Middleware base
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Rutas
app.use('/api/orders', orderRoutes);
app.use('/api/dishes', dishRoutes);

// Platos predefinidos
const defaultDishes = [
  {
    name: 'Shawarma de Pollo',
    description: 'Delicioso shawarma de pollo con vegetales frescos y salsas caseras',
    price: 8.99,
    category: 'Shawarma'
  },
  {
    name: 'Shawarma de Ternera',
    description: 'Shawarma de ternera marinada con especias orientales',
    price: 9.99,
    category: 'Shawarma'
  },
  {
    name: 'Falafel Wrap',
    description: 'Wrap de falafel casero con hummus y tahini',
    price: 7.99,
    category: 'Falafel'
  },
  {
    name: 'Kebab Mixto',
    description: 'Kebab con mezcla de pollo y ternera, vegetales y salsas',
    price: 10.99,
    category: 'Kebab'
  },
  {
    name: 'Hummus',
    description: 'Hummus casero con aceite de oliva y pimentón',
    price: 4.99,
    category: 'Complementos'
  },
  {
    name: 'Coca-Cola',
    description: 'Lata de Coca-Cola 33cl',
    price: 1.99,
    category: 'Bebidas'
  }
];

// Conexión a la base de datos e inicialización de platos
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB conectado');
    
    // Verificar si ya existen platos
    const existingDishes = await Dish.find();
    if (existingDishes.length === 0) {
      // Si no hay platos, crear los predefinidos
      await Dish.insertMany(defaultDishes);
      console.log('✨ Platos predefinidos creados');
    }
  })
  .catch(err => console.error('❌ Error al conectar con MongoDB:', err));

// Middleware de errores
app.use(errorHandler);

// Arrancar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
