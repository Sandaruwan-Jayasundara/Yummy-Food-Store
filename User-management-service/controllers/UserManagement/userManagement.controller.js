const  express=require("express");
var router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserManagement=require("../../models/UserManagementModel");
const AuthenticationModel = require("../../models/AuthenticationModel");




const AddUser = async (req, res) => {

   var FirstName =req.body.FirstName;
   var LastName =req.body.LastName;
   var Email =req.body.Email;
   var Contact = req.body.Contact;
   var Role =req.body.Role;
   var Branch =req.body.Branch;
   var Password =req.body.Password;
   var Profile = req.file.filename;
   var Address= ' ';
   
   console.log(
    FirstName,
    LastName,
    Email,
    Contact,
    Password,
    Role,
    Branch,
    Profile
  );

   if(!FirstName || !LastName ||!Email || !Contact ||!Password ||!Profile || !Role || !Branch)
    return res
    .status(200)
    .json({Message: "Please enter all required fields"});

    const salt = await bcrypt.genSalt();
    const PasswordHash= await bcrypt.hash(Password, salt);


    const UserManage= new  UserManagement({
        FirstName,
        LastName,
        Email,
        Contact,
        Role,
        Branch,
        PasswordHash,
        Profile
    });


    const existingUser = await AuthenticationModel.findOne({ Email });

    if (existingUser)
      return res
        .status(200)
        .json({ Message: "already exists an account with given email" });


    await UserManage.save().then(()=>{
        const newUser = new AuthenticationModel({
            FirstName,LastName, Email,Contact, Address,Role,Branch, PasswordHash
        });
            const saveUser = newUser.save();
                const token=jwt.sign({
                    user:saveUser._id
                }, process.env.JWT_SECRET);
                
        res.cookie("token", token, {
            httpOnly: true
        });

          res.json({Message:"Success"});
          
    }).catch((err) =>{
        console.log("User adding error");
        console.log(err);
    });
}



const DisplayUser = async (req, res) => {
    await UserManagement.find().then((UserManagement) => {
        console.log("WORK HERE")

        res.status(200).json(UserManagement);
       
    }).catch((err)=>{
        console.log("ERROR HERE")
        console.log(err);
    });
};




const getOneUser = async (req, res) => {
    
    const _id =  req.params.id;

   await UserManagement.findById(_id,(err, UserManagement)=>{
        console.log(UserManagement);
        return res.status(200).json({
            success:true,
            UserManagement
        });
     
    }).catch((err)=>{
        console.log(err);
    });
};




const UpdateUser = async  (req, res) => {
    
    const _id = req.params.id;
    var FirstName =req.body.FirstName;
    var LastName =req.body.LastName;
    var Email =req.body.Email;
    var Contact = req.body.Contact;
    var Role =req.body.Role;
    var Branch =req.body.Branch;
    
    const data = {
        FirstName,
        LastName,
        Email,
        Contact,
        Role,
        Branch,
 
    }

console.log(
    FirstName,
    LastName,
    Email,
    Contact,
    Role,
    Branch,

    
    )


    const update  = await UserManagement.findByIdAndUpdate(_id,{
        FirstName:FirstName,
        LastName:LastName,
        Email:Email,
        Contact:Contact,
        Role:Role,
        Branch:Branch
    })
        .then(() => {


            AuthenticationModel.updateOne({
                Email:Email,
                Role:Role
                    }).then((user) => {

                        console.log("Updated", update);
                        res.status(200).send({status:"updated", user:update});
                    
                    }).catch((err)=>{
                        console.log(err);
            })

   }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Update Error"});
   });
};




const DeleteUser =  async (req, res) => {
    const _id = req.params.id;
    var Email =req.body.Email;

    await UserManagement.findByIdAndDelete(_id).then((users) => {

        AuthenticationModel.remove({
            Email:Email
        }).then((user) => {
            res.json({
                status:"Success"
            })
        }).catch((err)=>{
            console.log(err);
        })

    }).catch((err)=>{
        console.log(err);
    });

};





const ContactUser = async (req, res) => {    
    const _id =  req.params.id;
    await UserManagement.findById(_id, (err, UserManagement) => {
        return res.status(200).json({
            success:true,
            UserManagement
        });
    }).catch((err)=>{
        console.log(err);
    });
};



module.exports = {
    AddUser,
    DisplayUser,
    getOneUser,
    UpdateUser,
    DeleteUser,
    ContactUser
}
