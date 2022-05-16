const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    
    user:{
        type: String,
        required: true,
        trim: true
    },
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'products',
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    image: {
        required: true,
        type: String,
        trim: true
    },
});


module.exports = mongoose.model('cart', cartSchema);
