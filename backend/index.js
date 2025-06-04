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
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// Rutas de health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Shawarma Express API' });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Rutas de la API
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

// Función para inicializar platos
const initializeDishes = async () => {
  try {
    const existingDishes = await Dish.find();
    if (existingDishes.length === 0) {
      await Dish.insertMany(defaultDishes);
      console.log('✨ Platos predefinidos creados');
    }
  } catch (error) {
    console.error('Error al inicializar platos:', error);
  }
};

// Conexión a MongoDB con reintentos
const connectWithRetry = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB conectado');
      await initializeDishes();
      return true;
    } catch (err) {
      retries++;
      console.error(`❌ Intento ${retries}/${maxRetries} - Error al conectar con MongoDB:`, err.message);
      if (retries === maxRetries) {
        console.error('❌ No se pudo conectar a MongoDB después de múltiples intentos');
        return false;
      }
      // Esperar 5 segundos antes de reintentar
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

// Middleware de errores
app.use(errorHandler);

// Arrancar servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor solo después de intentar conectar a MongoDB
const startServer = async () => {
  await connectWithRetry();
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
  }).on('error', (err) => {
    console.error('Error al iniciar el servidor:', err);
    process.exit(1);
  });
};

startServer();
