const MenuItem = require('../models/MenuItem');

class MenuService {
  static async getAllMenus() {
    return await MenuItem.find().lean();
  }


// class MenuService {
//   static async getMenu() {
//     return await MenuItem.find();
//   }

  static async createItem(data) {
    const item = new MenuItem(data);
    return await item.save();
  }

  static async getItemById(id) {
    return await MenuItem.findById(id).lean();
  }

  static async updateItem(id, data) {
    return await MenuItem.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteItem(id) {
    return await MenuItem.findByIdAndDelete(id);
  }
}

module.exports = MenuService;
