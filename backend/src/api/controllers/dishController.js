const Dish = require('../models/Dish');

// Obtener todos los platos
exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find({ available: true });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los platos', error: error.message });
  }
};

// Obtener un plato por ID
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el plato', error: error.message });
  }
};

// Crear un nuevo plato
exports.createDish = async (req, res) => {
  try {
    const dish = new Dish(req.body);
    await dish.save();
    res.status(201).json(dish);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el plato', error: error.message });
  }
};

// Actualizar un plato
exports.updateDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!dish) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }
    res.json(dish);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el plato', error: error.message });
  }
};

// Eliminar un plato (marcarlo como no disponible)
exports.deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      { available: false },
      { new: true }
    );
    if (!dish) {
      return res.status(404).json({ message: 'Plato no encontrado' });
    }
    res.json({ message: 'Plato eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el plato', error: error.message });
  }
}; 