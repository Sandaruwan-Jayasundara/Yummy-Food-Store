const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        trim: true
    },
    description: {
        required: true,
        type: String,
        trim: true
    },
    image: {
        required: true,
        type: String,
        trim: true
    },
    prices: {
        large: {
            required: false,
            type: Number,
            trim: true
        },
        medium: {
            required: false,
            type: Number,
            trim: true
        },
        small: {
            required: false,
            type: Number,
            trim: true
        },
        regular: {
            required: true,
            type: Number,
            trim: true
        }
    },
    status: {
        required: true,
        type: String,
        trim: true
    }

});

module.exports = mongoose.model('products', productSchema);
