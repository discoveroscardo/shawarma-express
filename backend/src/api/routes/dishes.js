const express = require('express');
const router = express.Router();
const dishController = require('../../controllers/dishController');

// Rutas públicas
router.get('/', dishController.getAllDishes);
router.get('/:id', dishController.getDishById);

// Rutas protegidas (aquí podrías agregar middleware de autenticación más adelante)
router.post('/', dishController.createDish);
router.put('/:id', dishController.updateDish);
router.delete('/:id', dishController.deleteDish);

module.exports = router; 