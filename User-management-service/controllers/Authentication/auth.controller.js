const express = require("express");
var router = express.Router();
const AuthenticationModel = require("../../models/AuthenticationModel");
const UserManagement = require("../../models/UserManagementModel");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

const Register = async(req, res) => {


// Authentication Controller File
  try {
    const {  FirstName,LastName,Email,Contact,Password,CPassword} = req.body;
    const Role="User"
    const Branch=" "


    if (!FirstName ||!LastName ||!Email || !Contact || !Password || !CPassword ||!Role)
      return res
        .status(200)
        .json({ errorMessage: "Please enter all required fields" });

    if (Password.length < 6)
      return res
        .status(200)
        .json({
          errorMessage: "Please enter strong password",
        });

    if (Password !== CPassword)
      return res
        .status(200)
        .json({ errorMessage: "Password must be same" });

    const existingUser = await AuthenticationModel.findOne({ Email });

    if (existingUser)
      return res
        .status(200)
        .json({ errorMessage: "already exists an account with this email" });
     
    const salt = await bcrypt.genSalt();
    const PasswordHash = await bcrypt.hash(Password, salt);

    const newUser = new AuthenticationModel({
      FirstName,
      LastName,
      Email,
      Contact,
      Role,
      Branch,
      PasswordHash
    });
    const saveUser = await newUser.save();
    res.status(200).json({ Success: "Registered" });;
  } catch (err) {
    res.status(500).send();
  }
};

const Login = async(req, res) => {

  try {
    const { Email, Password,Dates, time } = req.body;
  
    if (!Email || !Password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });
    }
    const existingUser = await AuthenticationModel.findOne({ Email });

    if (!existingUser) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }
    const passwordCorrect = await bcrypt.compare(
      Password,
      existingUser.PasswordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }
    
    UserManagement.updateOne({
      LastLoginDate:Dates,
      LastLoginTime:time

          }).then(() => {

              const token = jwt.sign({
                user: existingUser._id
              }, process.env.JWT_SECRET);

              res.cookie("token", token, {
                httpOnly: true,
              }).send({
                users: existingUser,
                });
 
          }).catch((err)=>{
              console.log(err);
     })

  } catch (err) {
    console.log(err);
  }
};

const Logout = async(req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send(true);
};


module.exports = {
  Register,
  Login,
  Logout,
}
