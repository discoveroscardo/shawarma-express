const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // ID de Telegram
  username: String,
  first_name: String,
  last_name: String,
  orders_count: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);