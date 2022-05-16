const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB =require('./connection');
const app=express();
const cookieParser = require("cookie-parser");
dotenv.config()
var multer = require('multer');

const PORT = process.env.PORT || 8073;
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


const cartAPI = require('./api/cart.api');
app.use('/carts', cartAPI);
const toppingAPI = require('./api/topping.api');
app.use('/toppings', toppingAPI);
const listAPI = require('./api/list.api');
app.use('/lists', listAPI);
const orderAPI = require('./api/order.api');
app.use('/orders', orderAPI);

app.listen(PORT,() =>{
    console.log('Order Management Service is running');
});
