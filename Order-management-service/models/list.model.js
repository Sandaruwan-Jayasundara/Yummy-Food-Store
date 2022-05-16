const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    toppings: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'toppings',
        required:false
    }]
})
