const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  items: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
  }],
  total: { type: Number, required: true },
  address: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'preparing', 'out_for_delivery', 'completed'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);