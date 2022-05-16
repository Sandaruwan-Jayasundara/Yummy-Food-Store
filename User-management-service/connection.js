const mongoose=require("mongoose");

const MONGODB_URL='mongodb+srv://ctse:ctse@ctseweb.chv27.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectDB =async () =>{
    await mongoose.connect(MONGODB_URL,{
        useCreateIndex:true,
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useFindAndModify:false
    });
    console.log('User Management Data Connection is running');
}
module.exports=connectDB;

