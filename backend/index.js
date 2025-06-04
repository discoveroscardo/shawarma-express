require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const orderRoutes = require('./src/api/routes/orders');
const errorHandler = require('./src/api/middlewares/errorHandler');

const app = express();

// Middleware base
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Rutas
app.use('/api/orders', orderRoutes);

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error al conectar con MongoDB:', err));

// Middleware de errores
app.use(errorHandler);

// Arrancar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
