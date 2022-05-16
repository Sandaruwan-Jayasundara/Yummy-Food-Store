const Order = require('../models/order.model');
const Product = require('../models/product.model');


// Add  new order

const addOrder = async (req, res) => {
    if (req.body) {
        const order = new Order(req.body);

        try {
            const newOrder = await order.save();
            res.status(200).json(newOrder);

        } catch (err) {
            res.status(400).json({message: err.message})
        }

    }
}




// update the order status

const editOrder= async (req, res) => {
    if (req.params.id!=null) {
    
        try {
            const order =await Order.findById(req.params.id);
            if (req.body.status!=null) {
                order.status = req.body.status;
            }
            if (req.body.assign_to!=null) {
                order. assign_to = req.body.assign_to;
            }
            const updatedOrder = await order.save();
            res.status(200).json(updatedOrder);
        } catch (err) {
            res.status(400).json({message: err.message})
        }

    }
}


// get all orders

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('delivery_code');
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}


// filter by status

const filterOrderByStatus = async (req, res) => {
    if (req.params.status) {
       if(req.params.status!='all'){
        try {
            const order = await Order.find({status: req.params.status});
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json({message: err.message})
        }
       }
       else{
        try {
            const orders = await Order.find({});
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json({message: err.message});
        }
       }
    }
}

const filterByUserID=async(req,res)=>{
    if(req.params.user!=null){
    try{
        const orders= await Order.find({user: req.params.user});
        res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }

    }
}


const getCurrentOrders=async(req,res)=>{
if(req.params.user!=null){
    try{
        const orders = await Order.find({user: req.params.user});
        if(orders.length>0){
            let data=[];
       orders.map(order=>{
           if(order.status!='delivered'){
            data.push(order);
           }
       });
       res.status(200).json(data);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
}

const getOrderHistory=async(req,res)=>{
    if(req.params.user!=null){
        try{
            const orders = await Order.find({user: req.params.user});
            if(orders.length>0){
                let data=[];
           orders.map(order=>{
               if(order.status=='delivered'){
                data.push(order);
               }
           });
           res.status(200).json(data);
            }
        }catch(err){
            res.status(500).json({message: err.message});
        }
    }
    }

    //get ordered item count product vise

    const getOrderedItemCount=async(req,res)=>{
try{
    const products=await Product.find({});
    const orders=await Order.find({});
    if(products.length>0){
    let data=[];
    products.map(product=>{
        let total=0;
        orders.map(order=>{
        order.products.map(item=>{
            total+=item.qty;
        })
        })
        let item={
            title:product.title,
            amount:total
        }
        data.push(item);
    })
    res.status(200).json(data);
    }

}catch(err){
    res.status(500).json({message: err.message});  
}
    }
 

    //get order list that related to the delivery manager
    const getDeliveryManagerOrders = async (req, res) => {
        try {
            const orders = await Order.find({}).populate('delivery_code');
            let data=[];
            if(orders.length>0){
                orders.map(order=>{
                    console.log(order.status);
                    if(order.status!='new'&& order.status!='processing'){
                        data.push(order);
                    }
                });
            }
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    //get filtered order results for the delivery manager
    const filterDeliveryOrderByStatus = async (req, res) => {
        if (req.params.status) {
            if(req.params.status!='all'){
             try {
                 const order = await Order.find({status: req.params.status});
                 res.status(200).json(order);
             } catch (err) {
                 res.status(500).json({message: err.message})
             }
            }
            else{
                try {
                    const orders = await Order.find({}).populate('delivery_code');
                    let data=[];
                    if(orders.length>0){
                        orders.map(order=>{
                            console.log(order.status);
                            if(order.status!='new'&& order.status!='processing'){
                                data.push(order);
                            }
                        });
                    }
                    res.status(200).json(data);
                } catch (err) {
                    res.status(500).json({message: err.message})
                }
            }
         }   
    }

module.exports={
    addOrder,
    getAllOrders,
    filterOrderByStatus,
    getCurrentOrders,
    getOrderHistory,
    getOrderedItemCount,
    editOrder,
    getDeliveryManagerOrders,
    filterDeliveryOrderByStatus
}
