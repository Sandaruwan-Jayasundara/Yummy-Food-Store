const express = require('express');
const router = express.Router();
const controller = require('../controllers/list.controller');

// Add new list
router.post('/add', controller.addList);


// get  all lists
router.get('/', controller.getList);

// Edit the list name
router.patch('/edit/:id', controller.editListName);


// Remove a topping from list
router.put('/remove/:id', controller.removeAToppingFromList);


module.exports = router;
