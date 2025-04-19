const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: String, enum: ['entrante', 'shawarma', 'menu', 'bebida'], required: true }
});

module.exports = mongoose.model('Menu', menuSchema);
