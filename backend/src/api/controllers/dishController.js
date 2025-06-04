const Dish = require('../../models/Dish');

const dishController = {
  getAllDishes: async (req, res) => {
    try {
      const dishes = await Dish.find();
      res.json(dishes);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener platos', error: error.message });
    }
  },

  getDishById: async (req, res) => {
    try {
      const dish = await Dish.findById(req.params.id);
      if (!dish) {
        return res.status(404).json({ message: 'Plato no encontrado' });
      }
      res.json(dish);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el plato', error: error.message });
    }
  },

  createDish: async (req, res) => {
    try {
      const dish = new Dish(req.body);
      await dish.save();
      res.status(201).json(dish);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el plato', error: error.message });
    }
  },

  updateDish: async (req, res) => {
    try {
      const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!dish) {
        return res.status(404).json({ message: 'Plato no encontrado' });
      }
      res.json(dish);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar el plato', error: error.message });
    }
  },

  deleteDish: async (req, res) => {
    try {
      const dish = await Dish.findByIdAndDelete(req.params.id);
      if (!dish) {
        return res.status(404).json({ message: 'Plato no encontrado' });
      }
      res.json({ message: 'Plato eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el plato', error: error.message });
    }
  }
};

module.exports = dishController; 