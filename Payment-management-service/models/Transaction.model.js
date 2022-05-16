const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    transaction:{
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Qty: {
        type: Number,
        required: true
    },
    Total: {
        type: Number,
        required: true
    },

    time: {
        type: String,
        required: true
    },
    fullDate: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    refund:{
        type: String,
        required: false
    },
    refundDate:{
        type: String,
        required: false
    },
    RefundTransaction:{
        type: String,
        required: false  
    }
})

module.exports = mongoose.model('Transaction', TransactionSchema);
