// backend/src/services/userService.js
const User = require('../models/user');

class UserService {
  static async getOrCreateUser({ id, username, first_name, last_name }) {
    let user = await User.findOne({ id });
    if (!user) {
      user = await User.create({ id, username, first_name, last_name });
    }
    return user;
  }
}

module.exports = UserService;
