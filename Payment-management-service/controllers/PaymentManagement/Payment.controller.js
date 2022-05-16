const Transaction = require('../../models/Transaction.model');
const Cart = require('../../models/cart.model');

const placeOrder = async (req, res) => {


    const { Name,
        CardNumber,
        Date,
        Cvv,
        Title,
        Image,
        Qty,
        Total,
        transaction,
        time,
        fullDate,
        Email,
        UserName,
        ProductID} = req.body;
   
        const status ="Completed"


    if (!Name ||!CardNumber ||!Date || !Cvv )
      return res
        .status(200)
        .json({ Message: "Error" });


  
        const newOrder= new  Transaction({
            transaction,
            Title,
            Image,
            Qty,
            Total,
            time,
            fullDate,
            Email,
            UserName,
            status

        });
    
        await newOrder.save().then(()=>{

                const _id = ProductID;
                 Cart.findByIdAndDelete(_id).then((products) => {
                        res.json({
                            Message:"Success"
                        })
                }).catch((err)=>{
                    console.log(err);
                });
            
      
        

        }).catch((err) =>{
            console.log("User adding error");
            console.log(err);
        }); 
}
module.exports = {
    placeOrder
}
