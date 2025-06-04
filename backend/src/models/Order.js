const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true }
  }],
  status: {
    type: String,
    enum: ['pending', 'preparing', 'out_for_delivery', 'completed'],
    default: 'pending'
  },
  total: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

orderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Order', orderSchema);