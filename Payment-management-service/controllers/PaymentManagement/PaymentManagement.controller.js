const  express=require("express");
var router = express.Router();
const Transactions=require("../../models/Transaction.model");




const DisplayTransactions = async (req, res) => {

    await Transactions.find().then((transaction) => {
        if (transaction) {
            console.log(transaction);
            res.json(transaction); 
        } else {
            res.json({transaction:null}); 
       }
    }).catch((err)=>{
        console.log(err);
    });
};


const getOnTransaction = async (req, res) => {
    
    const _id =  req.params.id;


    console.log("pass",_id);

   await Transactions.findById(_id,(err, transactions)=>{
        return res.status(200).json({
            success:true,
            transactions
        });
     
    }).catch((err)=>{
        console.log(err);
    });
};



const refund = async  (req, res) => {
    
    const _id = req.params.id;
    var status =req.body.status;
    var refund =req.body.refund;
    var refundDate =req.body.RefundDate;
    var RefundTransaction =req.body.RefundTransaction;

    console.log(_id,status,refund,refundDate,RefundTransaction)

    const update  = await Transactions.findByIdAndUpdate(_id,{
        status: status,
        refund:refund,
        refundDate:refundDate,
        RefundTransaction:RefundTransaction
    }).then(() => {
    res.status(200).send({status:"updated", user:update});
   }).catch((err)=>{
        res.status(200).send({status:"Updated but not all fields"});
   });
};



const filter = async (req, res) => {
    
    const _id =  req.params.id;

   await Transactions.find({
    status: _id
   },(err, transactions)=>{
    res.json(transactions); 
     
    }).catch((err)=>{
        console.log(err);
    });
};









module.exports = {
    DisplayTransactions,
    getOnTransaction,
    refund,
    filter
}
