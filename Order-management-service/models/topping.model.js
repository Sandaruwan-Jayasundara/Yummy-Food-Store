const mongoose = require('mongoose');

const toppingSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('toppings', toppingSchema);
