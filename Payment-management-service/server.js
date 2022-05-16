const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB =require('./connection');
const app=express();
const cookieParser = require("cookie-parser");
dotenv.config()
var multer = require('multer');

const PORT = process.env.PORT || 8072;
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors(
    { 
       origin:["http://localhost:3000"],
       credentials: true,
    }
));

app.use(bodyParser.json());

//Place Order
const payment=require('./api/PaymentManagement/Payment.api.js');
app.use('/payment',payment);

app.listen(PORT,() =>{
    console.log('Payment Management Service is running');
});
