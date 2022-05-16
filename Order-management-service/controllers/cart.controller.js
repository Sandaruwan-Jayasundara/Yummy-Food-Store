const Cart = require('../models/cart.model');

// Add product to the cart
const addToCart = async (req, res) => {
    if (req.body) {
        const cart = new Cart({
            user:req.body.user,
            product_id:req.body.product_id,
            title:req.body.title,
            qty:req.body.qty,
            size:req.body.size,
            price:req.body.price,
            image:req.body.image,
           
        });
        try {
            const newCartItem = await cart.save();
            console.log(newCartItem)
            res.status(200).json(newCartItem);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
}

// Update cart quantity
const updateProductQty = async (req, res) => {
    if (req.params.id && req.body.qty) {

        const cartItem =await Cart.findById(req.params.id);
        cartItem.qty = req.body.qty;
        try {

            const updatedCartItem = await cartItem.save();
            res.status(200).json(updatedCartItem);

        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
}


// Remove from from cart

const removeFromCart = async (req, res) => {
    if (req.params.id) {
        const cartItem = Cart.findById(req.params.id);
        try {
            const removedCartItem = await cartItem.remove();
            res.status(200).json(removedCartItem);
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
}

// Get all cart products

const getAllFromCart = async (req, res) => {
  if(req.params.user!=null){
    try {
        const cartItems = await Cart.find({user:req.params.user});

        res.status(200).json(cartItems);

    } catch (err) {
        res.status(500).json({message: err.message});
    }
  }
}
//delete all from cart products
const deleteAllFromCarts=async(req,res)=>{
if(req.params.user!=null){
try{
    const products=await Cart.find({user:req.params.user});
    const deletedProducts=await Cart.remove({});
    res.status(200).json(deletedProducts);

    }catch(err){
        res.status(500).json({message: err.message});
    }
}
}


const getCartItemByID=async(req,res)=>{
    if(req.params.id!=null  && req.params.size!=null && req.params.user){
        try{
       const cartItem=await Cart.find({product_id:req.params.id,size:req.params.size,user:req.params.user});
        res.status(200).json(cartItem);
        }catch (err){
            res.status(500).json({message: err.message});
        }
    }
}

//get total price of the items in the cart
const getTotalPrice = async (req, res) => {
    if(req.params.user!=null){
        try {
            const cartItems = await Cart.find({user:req.params.user});
            let total=0;
           if(cartItems.length>0){
            cartItems.map((product)=>{
             total+=product.price*product.qty;
            }) ;
          
           }
           console.log(total)
           res.status(200).json({total:total});
    
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}

//Get cart item count
const getCartitemCount = async (req, res) => {
    if(req.params.user!=null){
      try {
          const cartItems = await Cart.find({user:req.params.user});
          let count=0;
          if(cartItems.length>0){
           cartItems.map(item=>{
             count+=item.qty
           });

          }
  
          res.status(200).json({count:count});
  
      } catch (err) {
          res.status(500).json({message: err.message});
      }
    }
}

module.exports = {
    addToCart,
    updateProductQty,
    removeFromCart,
    getAllFromCart,
    getCartItemByID,
    getTotalPrice,
    deleteAllFromCarts,
    getCartitemCount
}
