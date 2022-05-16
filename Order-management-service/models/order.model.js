const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    order_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        trim: true,
        required: true
    },
    user:{
        type: String,
        trim: true,
        required: true
    },
    delivery_code:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'delivery',
        required: true,
    },
    branch:{
        type: String,
        trim: true,
        required: false
    },
    assign_to: {
        type: String,
        trim: true,
        required: false
    },
})

module.exports = mongoose.model('orders', orderSchema);
