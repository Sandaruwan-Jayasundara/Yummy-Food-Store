const mongoose = require("mongoose");
const schema = mongoose.schema;

const Payment = new mongoose.Schema({
Name: {
    type: String,
    required: true,
  },
MobileNumber: {
    type: String,
    required: true,
  },

  OrderName: {
    type: String,
    required: true,
  },
  
Amount: {
    type: String,
    required: true,
  },
},{ timestamps: true });

const Payments = mongoose.model("Payment", Payment);
module.exports = Payments;
