const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: [{
    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    quantity: { type: Number, required: true, min: 1 }
  }],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'out_for_delivery', 'completed'],
    default: 'pending'
  },
  notes: { type: String }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;