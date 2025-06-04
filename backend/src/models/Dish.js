const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Shawarma', 'Falafel', 'Kebab', 'Complementos', 'Bebidas'],
    default: 'Shawarma'
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish; 