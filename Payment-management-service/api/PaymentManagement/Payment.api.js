const express = require('express');
const PlaceOrder = require('../../controllers/PaymentManagement/Payment.controller');
const PaymentManagement = require('../../controllers/PaymentManagement/PaymentManagement.controller');
var router = express.Router();

router.post('/add', PlaceOrder.placeOrder);
router.get('/payment-management/display', PaymentManagement.DisplayTransactions);
router.get('/payment-management/transaction/:id', PaymentManagement.getOnTransaction);
router.put('/payment-management/refund/:id', PaymentManagement.refund);
router.get('/payment-management/filter/:id', PaymentManagement.filter);
module.exports = router;