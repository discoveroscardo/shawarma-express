// // backend/src/app.js (Actualizado)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const orderRoutes = require('./api/routes/orders');
const errorHandler = require('./api/middlewares/errorHandler');

const app = express();

// CORS Config
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT']
}));

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Error Handling
app.use(errorHandler);

module.exports = app;