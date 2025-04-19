const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  items: { type: [String], required: true },
  status: { 
    type: String, 
    enum: ['pending', 'preparing', 'ready', 'delivered'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);