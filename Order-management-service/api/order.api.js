const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');

// Add  new order
router.post('/add', controller.addOrder);

// update the order 
router.patch('/edit/:id', controller.editOrder)


// get all orders
router.get('/', controller.getAllOrders);

// filter by status
router.get('/:status', controller.filterOrderByStatus);

//get currrent orders
router.get('/getcurrent/:user',controller.getCurrentOrders);

//get order history
router.get('/gethistory/:user',controller.getOrderHistory);

//get orderd item count product vice
router.get('/product/count',controller.getOrderedItemCount)


//get orders that related to the delivery manager
router.get('/delivery/orders',controller.getDeliveryManagerOrders);

//get orders that related to the delivery manager
router.get('/filter/delivery/:status',controller.filterDeliveryOrderByStatus);


module.exports = router;
