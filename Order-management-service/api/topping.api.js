const express = require('express');
const router = express.Router();
const controller = require('../controllers/topping.controller');


// Add topping
router.post('/create', controller.addTopping);

// Remove topping
router.delete('/remove/:id', controller.removeTopping);

// Updqate topping
router.patch('/edit/:id', controller.updateTopping);


// Get all the toppings
router.get('/', controller.getAllToppings);

module.exports = router;
